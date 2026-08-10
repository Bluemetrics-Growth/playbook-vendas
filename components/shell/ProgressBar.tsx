"use client";

import { abmSections } from "@/content/abm/sections";
import { useProgress } from "@/lib/progress";

export function ProgressBar({ showLabel = true }: { showLabel?: boolean }) {
  const seen = useProgress((s) => s.seen);
  const hydrated = useProgress((s) => s.hydrated);
  const total = abmSections.length;
  const done = hydrated ? abmSections.filter((s) => seen[s.slug]).length : 0;
  const pct = Math.round((done / total) * 100);

  return (
    <div className="flex flex-col gap-1.5">
      {showLabel ? (
        <div className="flex items-center justify-between text-[12px] text-fg-muted">
          <span>Progresso da trilha</span>
          <span className="mono">{done}/{total}</span>
        </div>
      ) : null}
      <div className="h-1.5 w-full overflow-hidden rounded-pill bg-bg-stage" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <div
          className="h-full rounded-pill bg-primary transition-[width] duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
