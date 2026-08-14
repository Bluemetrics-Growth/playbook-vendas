"use client";

import { useState } from "react";
import { Zap } from "lucide-react";
import { ifThenRules } from "@/content/abm/orchestration";

const filters = ["Todos", "Marketing", "Tier 2", "Movimento", "Tier 1", "Tier 3", "SLA 24h"] as const;
type Filter = (typeof filters)[number];

export function IfThenMap() {
  const [filter, setFilter] = useState<Filter>("Todos");

  const rules = ifThenRules.filter((r) => {
    if (filter === "Todos") return true;
    if (filter === "SLA 24h") return r.sla === "24h";
    return r.tier === filter;
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={[
              "chip transition-colors",
              filter === f ? "bg-primary text-white" : "chip-gray hover:bg-neutral-200",
            ].join(" ")}
          >
            {f}
          </button>
        ))}
      </div>

      <ul className="flex flex-col gap-2">
        {rules.map((r) => (
          <li key={r.id} className="surface-card flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:gap-4">
            <div className="flex items-center gap-2 sm:w-40 sm:flex-none">
              <span className="chip chip-gray text-[11px]">{r.tier}</span>
              {r.isGate ? <span className="chip text-[11px]" style={{ background: "var(--band-trigger)", color: "#fff" }}><Zap size={11} /> gatilho</span> : null}
            </div>
            <div className="flex-1">
              <span className="text-body-sm">
                <strong className="text-primary">SE</strong> {r.condition}{" "}
                <strong className="text-fg">ENTÃO</strong> <span className="text-fg-muted">{r.action}</span>
              </span>
            </div>
            {r.sla ? (
              <span className="chip text-[11px] sm:flex-none" style={{ background: "rgba(255,68,0,0.1)", color: "var(--danger)" }}>
                SLA {r.sla}
              </span>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
