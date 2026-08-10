"use client";

import { GraduationCap, Search } from "lucide-react";
import { useProgress, type Mode } from "@/lib/progress";

const options: { value: Mode; label: string; icon: typeof Search }[] = [
  { value: "treinar", label: "Treinar", icon: GraduationCap },
  { value: "consultar", label: "Consultar", icon: Search },
];

export function ModeToggle({ compact = false }: { compact?: boolean }) {
  const mode = useProgress((s) => s.mode);
  const setMode = useProgress((s) => s.setMode);

  return (
    <div
      role="radiogroup"
      aria-label="Modo de navegação"
      className="inline-flex items-center gap-1 rounded-pill bg-bg-stage p-1"
    >
      {options.map((opt) => {
        const active = mode === opt.value;
        const OptIcon = opt.icon;
        return (
          <button
            key={opt.value}
            role="radio"
            aria-checked={active}
            onClick={() => setMode(opt.value)}
            className={[
              "inline-flex items-center gap-1.5 rounded-pill px-3 py-1.5 text-body-sm font-medium transition-all duration-200",
              active ? "bg-surface text-fg shadow-1" : "text-fg-muted hover:text-fg",
            ].join(" ")}
          >
            <OptIcon size={15} />
            {!compact && <span>{opt.label}</span>}
          </button>
        );
      })}
    </div>
  );
}
