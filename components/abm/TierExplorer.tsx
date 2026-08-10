"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Lock } from "lucide-react";
import { modeloTiers, abcAxis, tier2Decisions } from "@/content/abm/prose";

export function TierExplorer() {
  const [selected, setSelected] = useState<"Tier 2" | "Tier 1">("Tier 2");

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {modeloTiers.map((t) => {
          const active = selected === t.tier;
          return (
            <button
              key={t.tier}
              onClick={() => setSelected(t.tier as "Tier 2" | "Tier 1")}
              aria-pressed={active}
              className={[
                "flex flex-col gap-3 rounded-xl border p-5 text-left transition-all",
                active ? "border-primary bg-primary-soft shadow-2" : "surface-card hover:border-border-strong",
              ].join(" ")}
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-h3 font-semibold">{t.tier}</span>
                <span className="chip chip-gray">{t.kicker}</span>
              </div>
              <p className="text-body-sm text-fg-muted">{t.who}</p>

              <AnimatePresence initial={false}>
                {active ? (
                  <motion.dl
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col gap-3 pt-2">
                      <Row label="Score" value={t.score} />
                      <Row label="Bandas" value={t.bands} />
                      <Row label="O deal" value={t.deal} />
                    </div>
                  </motion.dl>
                ) : null}
              </AnimatePresence>
            </button>
          );
        })}
      </div>

      {/* Tier 1 nunca rebaixado */}
      <div className="flex items-center gap-3 rounded-m border border-border bg-bg-soft px-4 py-3 text-body-sm">
        <Lock size={16} className="flex-none text-primary" />
        <span className="text-fg-muted">
          <strong className="text-fg">Tier 1 nunca é rebaixado a Tier 2.</strong> O deal aberto mantém a conta no
          Tier 1. A penalidade move entre bandas, sem trocar o tier. A conta só sai quando o deal fecha.
        </span>
      </div>

      {/* Decisões do Tier 2 */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {tier2Decisions.map((d) => (
          <div key={d.threshold} className="surface-card flex items-start gap-4 p-5">
            <span className="font-display text-display-m font-semibold leading-none text-primary">{d.threshold}</span>
            <span>
              <span className="block font-medium text-fg">{d.title}</span>
              <span className="block text-body-sm text-fg-muted">{d.detail}</span>
            </span>
          </div>
        ))}
      </div>

      {/* Eixo A/B/C sobreposto */}
      <div className="surface-card p-5">
        <div className="mb-3 flex items-center gap-2">
          <span className="eyebrow">Eixo A/B/C · esforço</span>
          <span className="text-body-sm text-fg-muted">Cruza com Tier 1/Tier 2 (roteamento). Uma conta Tier 1 pode ser A, B ou C.</span>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {abcAxis.map((a) => (
            <div key={a.letter} className="stage-card flex flex-col gap-1 p-4">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-s bg-primary font-display font-semibold text-white">{a.letter}</span>
                <span className="font-medium text-fg">{a.name}</span>
              </div>
              <span className="flex items-center gap-1.5 text-body-sm text-primary"><ArrowRight size={14} /> {a.goal}</span>
              <span className="text-[12px] text-fg-hint">{a.detail}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="eyebrow text-[11px]">{label}</dt>
      <dd className="text-body-sm text-fg">{value}</dd>
    </div>
  );
}
