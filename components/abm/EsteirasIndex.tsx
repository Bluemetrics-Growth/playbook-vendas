"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import { workflows } from "@/content/abm/workflows";
import type { WorkflowGroup } from "@/content/types";
import { BandBadge } from "@/components/ui/BandBadge";

const tiers: (WorkflowGroup | "Todos")[] = ["Todos", "Tier 2", "Movimento", "Tier 1"];

export function EsteirasIndex() {
  const [tier, setTier] = useState<WorkflowGroup | "Todos">("Todos");
  const [onlyGates, setOnlyGates] = useState(false);

  const filtered = workflows.filter(
    (w) => (tier === "Todos" || w.tier === tier) && (!onlyGates || w.isGate)
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-2">
        <div role="tablist" className="inline-flex items-center gap-1 rounded-pill bg-bg-stage p-1">
          {tiers.map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tier === t}
              onClick={() => setTier(t)}
              className={[
                "rounded-pill px-3 py-1.5 text-body-sm font-medium transition-all",
                tier === t ? "bg-surface text-fg shadow-1" : "text-fg-muted hover:text-fg",
              ].join(" ")}
            >
              {t}
            </button>
          ))}
        </div>
        <button
          onClick={() => setOnlyGates((v) => !v)}
          aria-pressed={onlyGates}
          className={[
            "chip transition-colors",
            onlyGates ? "bg-[rgba(255,68,0,0.14)] text-[color:var(--band-trigger)]" : "chip-gray",
          ].join(" ")}
        >
          <Zap size={13} /> Só gatilhos
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {filtered.map((w) => (
          <Link
            key={w.id}
            href={`/abm/esteiras/${w.id}`}
            className="surface-card group flex flex-col gap-3 p-5 transition-all hover:border-border-strong hover:shadow-2"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="chip chip-blue text-[11px]">{w.tier}</span>
              {w.isGate ? (
                <span className="chip text-[11px]" style={{ background: "var(--band-trigger)", color: "#fff" }}>
                  <Zap size={12} /> GATILHO
                </span>
              ) : null}
            </div>
            <div>
              <span className="mono block text-[13px] text-fg-muted">{w.id}</span>
              <h3 className="font-display text-h4 font-semibold leading-snug">
                {w.name.replace(/^\[ABM\]\[[^\]]+\]\s*/, "").replace(/\s*·\s*Score.*$/, "")}
              </h3>
            </div>
            <p className="text-body-sm text-fg-muted">{w.summary}</p>
            <div className="flex flex-wrap items-center gap-2">
              {w.band && w.bandKind ? <BandBadge kind={w.bandKind} label={w.band} size="sm" /> : null}
              <span className="chip chip-gray text-[11px]">{w.owner}</span>
              {w.sla ? (
                <span className="chip text-[11px]" style={{ background: "rgba(255,68,0,0.1)", color: "var(--danger)" }}>SLA {w.sla}</span>
              ) : null}
            </div>
            <span className="mt-auto inline-flex items-center gap-1.5 text-body-sm font-medium text-primary">
              Ver esteira <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
