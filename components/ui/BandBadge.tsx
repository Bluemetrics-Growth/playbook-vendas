import type { BandKind } from "@/content/types";
import { Icon } from "./Icon";

const kindMeta: Record<BandKind, { color: string; bg: string; icon: string }> = {
  nurture: { color: "var(--band-nurture)", bg: "rgba(110,110,115,0.12)", icon: "Sprout" },
  warm: { color: "var(--band-warm)", bg: "rgba(0,187,255,0.14)", icon: "Waves" },
  attention: { color: "var(--band-attention)", bg: "rgba(123,0,220,0.12)", icon: "Eye" },
  trigger: { color: "var(--band-trigger)", bg: "rgba(255,68,0,0.14)", icon: "Zap" },
};

interface BandBadgeProps {
  kind: BandKind;
  label: string;
  range?: string;
  size?: "sm" | "md";
}

/**
 * Banda de score. Nao depende so de cor: sempre traz rotulo e icone (a11y).
 */
export function BandBadge({ kind, label, range, size = "md" }: BandBadgeProps) {
  const meta = kindMeta[kind];
  return (
    <span
      className="chip"
      style={{ background: meta.bg, color: meta.color, fontSize: size === "sm" ? 12 : 14 }}
    >
      <Icon name={meta.icon} size={size === "sm" ? 13 : 15} />
      <span>{label}</span>
      {range ? <span className="mono opacity-80">{range}</span> : null}
    </span>
  );
}

export { kindMeta };
