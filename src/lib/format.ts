/* Formatacao PT-BR. Arredondamento so na exibicao (Secao 2.3). */

const brl0 = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

const brl2 = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function moeda(v: number): string {
  return brl0.format(Math.round(v));
}

export function moedaCent(v: number): string {
  return brl2.format(v);
}

export function inteiro(v: number): string {
  return new Intl.NumberFormat("pt-BR").format(Math.round(v));
}

export function umaCasa(v: number): string {
  return new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 1 }).format(v);
}

export function porcento(v0a1: number): string {
  return `${Math.round(v0a1 * 100)}%`;
}

// ROI como multiplo e como porcentagem (Secao 2.3).
// Ex.: roi = 3.2 -> "320%" e "cada R$ 1 vira R$ 4,20".
export function roiPorcento(roi: number): string {
  return `${Math.round(roi * 100)}%`;
}

export function roiPorReal(roi: number): string {
  // cada R$ 1 investido vira R$ (1 + roi)
  return moedaCent(1 + roi);
}

export function payback(meses: number | null): string {
  if (meses === null) return "Não se paga no cenário";
  if (meses < 1) return "Menos de 1 mês";
  const m = Math.round(meses * 10) / 10;
  return `${umaCasa(m)} ${m <= 1 ? "mês" : "meses"}`;
}
