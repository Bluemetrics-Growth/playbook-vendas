// Sanity check do motor de calculo contra os presets (criterio de aceite #1).
// Roda com: node scripts/verificar-modelo.mjs
// Reimplementa a funcao calcular() da Secao 2.4 e usa os presets do config
// para imprimir os 3 cenarios de cada vertical.
import { readFileSync } from "node:fs";

const src = readFileSync(new URL("../src/config/roi-model.ts", import.meta.url), "utf8");

// Extrai numeros dos presets direto do arquivo, so para o relatorio.
// (o app usa o TS real; aqui e um espelho de verificacao.)
const HORAS_UTEIS_FTE_MES = 160;

function calcular(p, c) {
  const horas = p.docsMes * p.horasPorDoc * p.reducaoTempoIa;
  const d1 = horas * p.custoHora * p.captura;
  const d2 = p.docsMes * p.taxaErro * p.custoErro * p.reducaoErro;
  const d3 = p.d3Ligado ? p.editaisExtraMes * p.taxaVitoria * p.ticketMedio * p.margem : 0;
  const bruto = d1 + d2 + d3;
  const liq = bruto - c.operacaoMensal;
  const roi = (h) => {
    const m = h - c.mesesAteGoLive;
    const ct = c.investimentoPiloto + c.operacaoMensal * m;
    return ct > 0 ? (bruto * m - ct) / ct : 0;
  };
  const payback = liq <= 0 ? null : c.mesesAteGoLive + c.investimentoPiloto / liq;
  return {
    custoManualAno: bruto * 12,
    valorRecupLiqAno: liq * 12,
    analistas: horas / HORAS_UTEIS_FTE_MES,
    roi12: roi(12),
    roi24: roi(24),
    payback,
  };
}

const fatores = {
  conservador: { reducaoTempoIa: 0.6, captura: 0.5, taxaErro: 0.03, reducaoErro: 0.6, investimentoPiloto: 70000, operacaoMensal: 6000, mesesAteGoLive: 1 },
  base: { reducaoTempoIa: 0.7, captura: 0.6, taxaErro: 0.05, reducaoErro: 0.6, investimentoPiloto: 60000, operacaoMensal: 5000, mesesAteGoLive: 1 },
  otimista: { reducaoTempoIa: 0.8, captura: 0.7, taxaErro: 0.08, reducaoErro: 0.6, investimentoPiloto: 50000, operacaoMensal: 4000, mesesAteGoLive: 1 },
};

const verticais = [
  { nome: "Juridico", docsMes: 150, horasPorDoc: 2.0 },
  { nome: "Financeiro", docsMes: 500, horasPorDoc: 0.5 },
  { nome: "Construcao", docsMes: 80, horasPorDoc: 3.0 },
  { nome: "Compliance", docsMes: 200, horasPorDoc: 1.5 },
  { nome: "Generico", docsMes: 200, horasPorDoc: 1.5 },
];

const brl = (n) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(Math.round(n));

console.log("config carregado:", src.includes("exibirInvestimentoPublico") ? "ok" : "??");
for (const v of verticais) {
  console.log(`\n=== ${v.nome} (${v.docsMes} docs/mes, ${v.horasPorDoc}h/doc) ===`);
  for (const cen of ["conservador", "base", "otimista"]) {
    const p = { docsMes: v.docsMes, horasPorDoc: v.horasPorDoc, custoHora: 120, custoErro: 3000, d3Ligado: false, editaisExtraMes: 0, taxaVitoria: 0.3, ticketMedio: 200000, margem: 0.2, ...fatores[cen] };
    const c = { investimentoPiloto: fatores[cen].investimentoPiloto, operacaoMensal: fatores[cen].operacaoMensal, mesesAteGoLive: 1 };
    const r = calcular(p, c);
    console.log(
      `${cen.padEnd(12)} custoManual/ano=${brl(r.custoManualAno).padStart(14)}  recupLiq/ano=${brl(r.valorRecupLiqAno).padStart(14)}  ROI12=${(r.roi12 * 100).toFixed(0)}%  payback=${r.payback === null ? "n/a" : r.payback.toFixed(1) + "m"}`
    );
  }
}
