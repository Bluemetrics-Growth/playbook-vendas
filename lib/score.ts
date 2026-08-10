import type { Score, ScoreBand } from "@/content/types";

export type Selection = Record<string, boolean | number>;

export interface CategoryResult {
  id: string;
  name: string;
  cap: number;
  raw: number; // antes do cap
  value: number; // depois do cap
}

export interface ScoreResult {
  categories: CategoryResult[];
  positive: number; // soma das categorias (0..100)
  penalty: number; // <= 0
  total: number; // clamp 0..100
  band: ScoreBand;
}

export function bandFor(score: Score, value: number): ScoreBand {
  const found = score.bands.find((b) => value >= b.min && value <= b.max);
  return found ?? score.bands[score.bands.length - 1];
}

/** Penalidade por inatividade (Tier 1), dado dias parados. */
export function penaltyFor(score: Score, days: number): number {
  if (!score.penalty) return 0;
  const tier = score.penalty.find(
    (p) => days >= p.minDays && (p.maxDays === null || days <= p.maxDays)
  );
  return tier ? tier.adjust : 0;
}

/**
 * Calcula o score a partir das selecoes, respeitando o teto por categoria,
 * exclusividade (uma etapa de pipeline) e incrementos repetiveis (+5/pessoa).
 */
export function computeScore(
  score: Score,
  selection: Selection,
  inactivityDays = 0
): ScoreResult {
  const categories: CategoryResult[] = score.categories.map((cat) => {
    let raw = 0;

    if (cat.exclusive) {
      // pega apenas o maior incremento selecionado
      let best = 0;
      for (const inc of cat.increments) {
        if (selection[inc.id]) best = Math.max(best, inc.points);
      }
      raw = best;
    } else {
      for (const inc of cat.increments) {
        const sel = selection[inc.id];
        if (inc.repeatable) {
          const count = typeof sel === "number" ? sel : 0;
          raw += inc.points * count;
        } else if (sel) {
          raw += inc.points;
        }
      }
    }

    const value = Math.min(raw, cat.cap);
    return { id: cat.id, name: cat.name, cap: cat.cap, raw, value };
  });

  const positive = Math.min(
    100,
    categories.reduce((sum, c) => sum + c.value, 0)
  );
  const penalty = penaltyFor(score, inactivityDays);
  const total = Math.max(0, Math.min(100, positive + penalty));
  const band = bandFor(score, total);

  return { categories, positive, penalty, total, band };
}

export const bandColorVar: Record<string, string> = {
  nurture: "var(--band-nurture)",
  warm: "var(--band-warm)",
  attention: "var(--band-attention)",
  trigger: "var(--band-trigger)",
};

export const bandTextClass: Record<string, string> = {
  nurture: "text-[color:var(--band-nurture)]",
  warm: "text-[color:var(--band-warm)]",
  attention: "text-[color:var(--band-attention)]",
  trigger: "text-[color:var(--band-trigger)]",
};
