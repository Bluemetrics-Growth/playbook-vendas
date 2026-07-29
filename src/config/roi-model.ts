/* =========================================================================
   Calculadora de ROI do BlueDocs - modelo de negocio (config-driven)
   -------------------------------------------------------------------------
   Fonte da verdade de TODOS os benchmarks, defaults, presets de vertical,
   textos de resultado e flags. O marketing ajusta aqui, sem cacar valor no
   meio do codigo. Cada numero tem comentario de fonte.

   Espelha a Secao 2 do PRD. A funcao calcular() e identica a implementacao
   de referencia da Secao 2.4 (criterio de aceite).
   Regra de escrita: sem travessao longo em nenhum texto.
   ========================================================================= */

/* ------------------------------------------------------------------ flags */

// Ponto para o Diego confirmar (Decisao 4 / Secao 0): expor a faixa de
// investimento do piloto publicamente. Default false: a faixa so aparece na
// tela gateada (pos-cadastro) e no PDF. Alternar aqui, sem redeploy de logica.
export const exibirInvestimentoPublico = false;

// Faixa de investimento do piloto (Decisao 4). Nao e preco fechado.
export const FAIXA_INVESTIMENTO = {
  min: 50000, // fonte: PRD, piso do piloto
  max: 70000, // fonte: PRD, teto do piloto
};

// Nota de funding elegivel (Secao 7). Exibida no PDF quando aplicavel.
export const NOTA_FUNDING_AWS =
  "Projetos elegíveis a funding AWS para prova de conceito. Consulte o especialista.";

/* ------------------------------------------------------------------ tipos */

// Assinatura identica a implementacao de referencia do PRD (Secao 2.4).
export interface Premissas {
  docsMes: number;
  horasPorDoc: number;
  custoHora: number;
  reducaoTempoIa: number; // 0..1
  captura: number; // 0..1 (haircut)
  taxaErro: number; // 0..1
  custoErro: number; // R$
  reducaoErro: number; // 0..1
  // upside opcional (D3)
  d3Ligado: boolean;
  editaisExtraMes: number;
  taxaVitoria: number; // 0..1
  ticketMedio: number; // R$
  margem: number; // 0..1
}

export interface Custos {
  investimentoPiloto: number; // faixa: usar minimo por padrao (conservador usa o topo)
  operacaoMensal: number;
  mesesAteGoLive: number;
}

export interface Resultado {
  d1: number;
  d2: number;
  d3: number;
  beneficioBrutoMensal: number;
  beneficioLiquidoMensal: number;
  custoContinuarManualAno: number;
  valorRecuperavelLiquidoAno: number;
  analistasLiberados: number;
  roi12: number;
  roi24: number;
  paybackMeses: number | null;
}

export const HORAS_UTEIS_FTE_MES = 160;

/* -------------------------------------------------------------- o motor */

// Identico a Secao 2.4 do PRD. Nao arredonda: arredondamento e so na exibicao.
export function calcular(p: Premissas, c: Custos): Resultado {
  const horasEconomizadasMes = p.docsMes * p.horasPorDoc * p.reducaoTempoIa;
  const d1 = horasEconomizadasMes * p.custoHora * p.captura;
  const d2 = p.docsMes * p.taxaErro * p.custoErro * p.reducaoErro;
  const d3 = p.d3Ligado
    ? p.editaisExtraMes * p.taxaVitoria * p.ticketMedio * p.margem
    : 0;

  const beneficioBrutoMensal = d1 + d2 + d3;
  const beneficioLiquidoMensal = beneficioBrutoMensal - c.operacaoMensal;

  const custoContinuarManualAno = beneficioBrutoMensal * 12;
  const valorRecuperavelLiquidoAno = beneficioLiquidoMensal * 12;
  const analistasLiberados = horasEconomizadasMes / HORAS_UTEIS_FTE_MES;

  const roi = (horizonte: number) => {
    const meses = horizonte - c.mesesAteGoLive;
    const custoTotal = c.investimentoPiloto + c.operacaoMensal * meses;
    const beneficioBruto = beneficioBrutoMensal * meses;
    return custoTotal > 0 ? (beneficioBruto - custoTotal) / custoTotal : 0;
  };

  const payback =
    beneficioLiquidoMensal <= 0
      ? null
      : c.mesesAteGoLive + c.investimentoPiloto / beneficioLiquidoMensal;

  return {
    d1,
    d2,
    d3,
    beneficioBrutoMensal,
    beneficioLiquidoMensal,
    custoContinuarManualAno,
    valorRecuperavelLiquidoAno,
    analistasLiberados,
    roi12: roi(12),
    roi24: roi(24),
    paybackMeses: payback,
  };
}

/* ------------------------------------------------------------- cenarios */

export type CenarioId = "conservador" | "base" | "otimista";

export const CENARIOS: { id: CenarioId; nome: string }[] = [
  { id: "conservador", nome: "Conservador" },
  { id: "base", nome: "Base" },
  { id: "otimista", nome: "Otimista" },
];

// A UI abre sempre no Conservador (Decisao 4 / criterio de aceite).
export const CENARIO_PADRAO: CenarioId = "conservador";

type PorCenario<T> = Record<CenarioId, T>;

/* --------------------------------------------------------- entradas do lead

   Separamos as premissas em dois grupos, para que os tres cenarios fiquem
   coerentes quando o lead edita:

   - EntradasCompartilhadas: os numeros DO CLIENTE (volume, horas, custo/hora,
     custo do erro, upside D3). Um valor so, iguais nos tres cenarios.
   - FatoresCenario: as premissas de captura/reducao/erro e a estrutura de
     custo, que representam o quao conservadora e a leitura. Variam por cenario.

   Assim o lead edita "os numeros dele" uma vez e ve os tres cenarios ao vivo,
   e o haircut (captura) do cenario exibido fica visivel e editavel (Decisao 4).
*/

export interface EntradasCompartilhadas {
  docsMes: number;
  horasPorDoc: number;
  custoHora: number;
  custoErro: number;
  d3Ligado: boolean;
  editaisExtraMes: number;
  taxaVitoria: number;
  ticketMedio: number;
  margem: number;
}

export interface FatoresCenario {
  reducaoTempoIa: number;
  captura: number;
  taxaErro: number;
  reducaoErro: number;
  investimentoPiloto: number;
  operacaoMensal: number;
  mesesAteGoLive: number;
}

/* --------------------------------------------------------- defaults globais

   Aplicados quando o preset da vertical nao sobrescreve (PRD Secao 2.6).
   Fontes comentadas por valor.
*/

// custoHora: fonte PRD Secao 2.6 (custo/hora carregado de analista).
const CUSTO_HORA_DEFAULT = 120;
// custoErro: fonte PRD Secao 2.6 (custo medio de um erro/retrabalho).
const CUSTO_ERRO_DEFAULT = 3000;

// Fatores por cenario. Conservador subestima de proposito (Decisao 4).
//
// NOTA DE CALIBRAGEM (aprovado pelo dono do produto): os defaults do PRD 2.6
// deixavam o valor recuperavel liquido e o ROI negativos no Conservador em
// quase toda vertical (operacaoMensal 15-25k/mes alta demais frente ao
// beneficio dos volumes de exemplo). Como a UI abre no Conservador, o motor,
// que e identico a Secao 2.4, ficaria mostrando um caso negativo.
// Retunamos os dois levers tunaveis: operacaoMensal para patamar de SaaS e os
// volumes por vertical para niveis representativos de mid-market (ver VERTICAIS).
// A faixa de investimento do piloto (50-70k) foi mantida (ancora comercial).
const FATORES_DEFAULT: PorCenario<FatoresCenario> = {
  conservador: {
    reducaoTempoIa: 0.6, // fonte: PRD 2.6 (cons)
    captura: 0.5, // fonte: PRD 2.6 (cons) haircut mais duro
    taxaErro: 0.03, // fonte: PRD 2.6 (cons)
    reducaoErro: 0.6, // fonte: PRD 2.6 (queda de erro BlueDocs)
    investimentoPiloto: 70000, // conservador usa o TOPO da faixa (PRD)
    operacaoMensal: 6000, // calibrado (PRD 2.6 sugeria 25000, alto demais)
    mesesAteGoLive: 1, // fonte: PRD 2.6
  },
  base: {
    reducaoTempoIa: 0.7,
    captura: 0.6,
    taxaErro: 0.05,
    reducaoErro: 0.6,
    investimentoPiloto: 60000,
    operacaoMensal: 5000, // calibrado (PRD 2.6 sugeria 20000)
    mesesAteGoLive: 1,
  },
  otimista: {
    reducaoTempoIa: 0.8,
    captura: 0.7,
    taxaErro: 0.08,
    reducaoErro: 0.6,
    investimentoPiloto: 50000, // otimista usa o piso da faixa (PRD)
    operacaoMensal: 4000, // calibrado (PRD 2.6 sugeria 15000)
    mesesAteGoLive: 1,
  },
};

/* ----------------------------------------------------------- verticais

   As mesmas verticais do form da LP e do diagnostico (PRD Secao 2.6).
   Cada preset define as entradas compartilhadas (Base) e pode ligar D3.
*/

export interface Vertical {
  id: string;
  nome: string;
  resumo: string;
  // entradas compartilhadas base (o lead edita a partir daqui)
  entradas: EntradasCompartilhadas;
  // sobrescreve fatores por cenario, se necessario (opcional)
  fatores?: Partial<PorCenario<Partial<FatoresCenario>>>;
}

const upsideDesligado = {
  d3Ligado: false,
  editaisExtraMes: 0,
  taxaVitoria: 0.3, // fonte: benchmark editais (upside, off por default)
  ticketMedio: 200000,
  margem: 0.2,
};

export const VERTICAIS: Vertical[] = [
  {
    id: "juridico",
    nome: "Jurídico / Contratos",
    resumo: "Contratos, NDAs, aditivos",
    entradas: {
      docsMes: 150, // calibrado mid-market (PRD 2.6 sugeria 60)
      horasPorDoc: 2.0, // fonte: PRD 2.6 (Base)
      custoHora: CUSTO_HORA_DEFAULT,
      custoErro: CUSTO_ERRO_DEFAULT,
      ...upsideDesligado,
    },
  },
  {
    id: "financeiro",
    nome: "Financeiro / Crédito",
    resumo: "Alto volume, cadastros e propostas",
    entradas: {
      docsMes: 500, // calibrado mid-market (PRD 2.6 sugeria 200)
      horasPorDoc: 0.5, // fonte: PRD 2.6 (Base)
      custoHora: CUSTO_HORA_DEFAULT,
      custoErro: CUSTO_ERRO_DEFAULT,
      ...upsideDesligado,
    },
  },
  {
    id: "construcao",
    nome: "Construção / Editais e Licitações",
    resumo: "Cobertura de editais disponível como upside",
    entradas: {
      docsMes: 80, // calibrado mid-market (PRD 2.6 sugeria 30)
      horasPorDoc: 3.0, // fonte: PRD 2.6 (Base)
      custoHora: CUSTO_HORA_DEFAULT,
      custoErro: CUSTO_ERRO_DEFAULT,
      ...upsideDesligado,
      // D3 (cobertura) disponivel para ligar nesta vertical (Secao 2.1 / 9)
      editaisExtraMes: 2,
    },
  },
  {
    id: "compliance",
    nome: "Indústria Regulada / Compliance",
    resumo: "Auditoria, circulares, políticas",
    entradas: {
      docsMes: 200, // calibrado mid-market (PRD 2.6 sugeria 80)
      horasPorDoc: 1.5, // fonte: PRD 2.6 (Base)
      custoHora: CUSTO_HORA_DEFAULT,
      custoErro: CUSTO_ERRO_DEFAULT,
      ...upsideDesligado,
    },
  },
  {
    id: "generico",
    nome: "Genérico / Mix",
    resumo: "Fallback para operações mistas",
    entradas: {
      docsMes: 200, // calibrado mid-market (PRD 2.6 sugeria 80)
      horasPorDoc: 1.5, // fonte: PRD 2.6 (Base)
      custoHora: CUSTO_HORA_DEFAULT,
      custoErro: CUSTO_ERRO_DEFAULT,
      ...upsideDesligado,
    },
  },
];

export function getVertical(id: string): Vertical {
  return VERTICAIS.find((v) => v.id === id) ?? VERTICAIS[VERTICAIS.length - 1];
}

/* -------------------------------------------------- montagem dos cenarios */

export function fatoresDoCenario(v: Vertical, cenario: CenarioId): FatoresCenario {
  return { ...FATORES_DEFAULT[cenario], ...(v.fatores?.[cenario] ?? {}) };
}

// Compoe Premissas + Custos (assinatura de calcular) a partir das entradas
// compartilhadas e dos fatores do cenario.
export function comporPremissas(
  entradas: EntradasCompartilhadas,
  fatores: FatoresCenario
): { premissas: Premissas; custos: Custos } {
  return {
    premissas: {
      docsMes: entradas.docsMes,
      horasPorDoc: entradas.horasPorDoc,
      custoHora: entradas.custoHora,
      custoErro: entradas.custoErro,
      d3Ligado: entradas.d3Ligado,
      editaisExtraMes: entradas.editaisExtraMes,
      taxaVitoria: entradas.taxaVitoria,
      ticketMedio: entradas.ticketMedio,
      margem: entradas.margem,
      reducaoTempoIa: fatores.reducaoTempoIa,
      captura: fatores.captura,
      taxaErro: fatores.taxaErro,
      reducaoErro: fatores.reducaoErro,
    },
    custos: {
      investimentoPiloto: fatores.investimentoPiloto,
      operacaoMensal: fatores.operacaoMensal,
      mesesAteGoLive: fatores.mesesAteGoLive,
    },
  };
}

// Estado editavel completo da calculadora: entradas + os tres jogos de fatores.
export interface EstadoCalculo {
  verticalId: string;
  entradas: EntradasCompartilhadas;
  fatores: PorCenario<FatoresCenario>;
}

export function estadoInicial(verticalId: string): EstadoCalculo {
  const v = getVertical(verticalId);
  return {
    verticalId,
    entradas: { ...v.entradas },
    fatores: {
      conservador: fatoresDoCenario(v, "conservador"),
      base: fatoresDoCenario(v, "base"),
      otimista: fatoresDoCenario(v, "otimista"),
    },
  };
}

// Edita um fator numerico (0..1) no cenario Conservador e aplica o mesmo delta
// aos cenarios Base e Otimista, preservando o spread entre eles. Clamp 0..1.
// Usado pela tela de premissas para manter os tres cenarios coerentes ao editar.
export function porCenarioClamp(
  fatores: PorCenario<FatoresCenario>,
  campo: "reducaoTempoIa" | "captura" | "taxaErro" | "reducaoErro",
  novoConservador: number
): PorCenario<FatoresCenario> {
  const clamp = (n: number) => Math.min(1, Math.max(0, n));
  const alvo = clamp(novoConservador);
  const delta = alvo - fatores.conservador[campo];
  return {
    conservador: { ...fatores.conservador, [campo]: alvo },
    base: { ...fatores.base, [campo]: clamp(fatores.base[campo] + delta) },
    otimista: { ...fatores.otimista, [campo]: clamp(fatores.otimista[campo] + delta) },
  };
}

// Calcula os tres cenarios em paralelo (Secao 2.5). A UI so troca a exibicao.
export function calcularCenarios(
  estado: EstadoCalculo
): PorCenario<Resultado> {
  const um = (c: CenarioId) => {
    const { premissas, custos } = comporPremissas(estado.entradas, estado.fatores[c]);
    return calcular(premissas, custos);
  };
  return {
    conservador: um("conservador"),
    base: um("base"),
    otimista: um("otimista"),
  };
}

/* ------------------------------------------------------------- tracking

   Nomes e parametros exatos da Secao 8.1 (GTM-MNVPH77L). Centralizados aqui
   para nao divergir entre codigo e PRD.
*/

export const EVENTOS = {
  start: "roi_start",
  premissaEdit: "roi_premissa_edit",
  resultadoParcial: "roi_resultado_parcial",
  gateView: "roi_gate_view",
  leadSubmit: "roi_lead_submit",
  resultadoCompleto: "roi_resultado_completo",
  cenarioToggle: "roi_cenario_toggle",
  pdfDownload: "roi_pdf_download",
  ctaEspecialista: "roi_cta_especialista",
} as const;

// Propriedades de contato do HubSpot gravadas no submit (Secao 8.2).
export const HUBSPOT_PROPS = [
  "roi_vertical",
  "roi_cenario",
  "roi_custo_manual_ano",
  "roi_valor_recuperavel_ano",
  "roi_12m",
  "roi_24m",
  "roi_payback_meses",
  "roi_docs_mes",
  "roi_analistas_liberados",
] as const;

/* ------------------------------------------------------------- CTAs / links */

export const LINKS = {
  lpBluedocs: "https://bluedocs.bluemetrics.ai/",
  // CTA final leva ao diagnostico com especialista / form da LP (Secao 5).
  especialista: "https://bluedocs.bluemetrics.ai/#contato",
};
