// Narrativa das telas (prosa separada da UI). Fonte: PRD Seções 9.1, 9.2 e Apêndice A.1.

export interface Principle {
  id: string;
  title: string;
  short: string;
  example: string;
}

export const tesePrinciples: Principle[] = [
  {
    id: "p1",
    title: "Conta como unidade",
    short: "A unidade de trabalho é a conta, não o lead solto.",
    example:
      "Na BlueMetrics, medimos penetração de comitê e pipeline por conta-alvo, não volume de leads avulsos.",
  },
  {
    id: "p2",
    title: "Esforço proporcional, sinal governa a hora",
    short: "O quanto de esforço segue o A/B/C. O quando segue o sinal.",
    example:
      "Uma conta Tier 2 só recebe o toque humano do executivo quando o Score de Abordagem indica prontidão. Abaixo disso, só o always-on trabalha.",
  },
  {
    id: "p3",
    title: "Sales e marketing co-donos",
    short: "Um único motion, dois donos, mesma régua e ritual.",
    example:
      "O KPI Contract é co-assinado. A revisão semanal de contas junta sales e marketing na mesma mesa.",
  },
  {
    id: "p4",
    title: "Orquestração em sequência",
    short: "Paid aquece, toque humano dá lift, email amplifica, evento captura intenção.",
    example:
      "Os ads always-on preparam o comitê antes de o executivo entrar. O canal certo na hora certa.",
  },
  {
    id: "p5",
    title: "Medir por conta e pipeline",
    short: "Aposentar o MQL. Medir engajamento de conta e pipeline criado, influenciado e acelerado.",
    example:
      "A meta do piloto é 5 a 8 reuniões com contas-alvo e aceleração de deals, não custo por lead.",
  },
];

export const teseEconomics =
  "A economia que puxa ABM: ticket alto, ciclo longo e comitê amplo. Quando poucos negócios movem a agulha e a decisão passa por várias pessoas, faz sentido concentrar esforço nas contas certas em vez de espalhar disparos.";

export const teseContrast = {
  net: {
    title: "Pescar com rede",
    subtitle: "Demand gen tradicional",
    points: [
      "Volume: muitos leads, pouca qualificação.",
      "Métrica: número de MQLs e custo por lead.",
      "Mensagem genérica para um público amplo.",
      "Marketing entrega leads, vendas reclama da qualidade.",
    ],
  },
  spear: {
    title: "Pescar com lança",
    subtitle: "ABM",
    points: [
      "Foco: contas-alvo com fit garantido.",
      "Métrica: penetração de conta e pipeline.",
      "Mensagem por conta, ancorada na dor e no sinal.",
      "Sales e marketing co-donos do mesmo resultado.",
    ],
  },
};

export const modeloTiers = [
  {
    tier: "Tier 2",
    kicker: "relacionamento",
    who:
      "Rede dos executivos. Empresas com fit (ICP) e cargo relevante, que o executivo já conhece, mas que ainda não conhecem a BlueMetrics. Fit garantido na entrada (não é público frio).",
    score: "Score de Abordagem (prontidão)",
    bands: "0-39 nutrição · 40-59 reconexão leve · 60-74 observação · 75+ gatilho de reunião",
    deal: "Sem deal ainda. Vira Tier 1 quando a reunião tem aderência.",
  },
  {
    tier: "Tier 1",
    kicker: "oportunidade",
    who: "Conta com deal aberto no Pipeline Pibernat e orçamento emitido. Vendas é dono do deal.",
    score: "Score de Prioridade (prioridade e saúde do deal)",
    bands: "0-59 reengajamento · 60-79 campo de nutrição · 80+ fechamento",
    deal: "Deal aberto garante a permanência. Nunca é rebaixado. Só sai quando o deal fecha.",
  },
];

export const abcAxis = [
  { letter: "A", name: "Strategic 1:1", goal: "Fechar", detail: "Esforço máximo, uma conta por vez." },
  { letter: "B", name: "Lite 1:poucos", goal: "Avançar", detail: "Esforço médio, um punhado de contas parecidas." },
  { letter: "C", name: "Programmatic 1:muitos", goal: "Nutrir", detail: "Esforço leve e escalável, muitas contas." },
];

export const tier2Decisions = [
  {
    threshold: "50",
    title: "Entrada leve do executivo",
    detail: "Toque humano suave, sem pitch. Abaixo de 50, só a camada always-on trabalha.",
  },
  {
    threshold: "75",
    title: "Pedido de reunião",
    detail: "Gatilho oficial, SLA 24h. Aqui a conta vira SQL e entra na sequência de reunião.",
  },
];

export const goldenRule = "Abordar sob sinal, nunca a frio.";
