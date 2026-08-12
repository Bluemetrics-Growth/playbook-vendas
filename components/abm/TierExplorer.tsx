"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Users } from "lucide-react";
import { modeloTiers, modeloSignals, modeloCommittee, tier2Decisions } from "@/content/abm/prose";
import { Icon } from "@/components/ui/Icon";

export function TierExplorer() {
  const [selected, setSelected] = useState<"Tier 2" | "Tier 1">("Tier 2");

  return (
    <div className="flex flex-col gap-8">
      {/* Os 3 sinais que movem a conta */}
      <div>
        <div className="mb-3 flex flex-col gap-1">
          <span className="eyebrow">Os 3 sinais</span>
          <p className="max-w-text text-body-sm text-fg-muted">
            A conta se move por três sinais, todos propriedades reais no HubSpot. Nada de matriz teórica: é isso
            que decide a leitura.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {modeloSignals.map((s) => (
            <div key={s.id} className="stage-card flex flex-col gap-1.5 p-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-s bg-primary-soft text-primary">
                <Icon name={s.icon} size={18} />
              </span>
              <span className="font-display text-h4 font-semibold text-fg">{s.title}</span>
              <span className="text-body-sm font-medium text-primary">{s.question}</span>
              <span className="text-[13px] text-fg-muted">{s.detail}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tiers */}
      <div className="flex flex-col gap-4">
        <span className="eyebrow">Os dois tiers</span>
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
                        <Row label="Score que se lê" value={t.score} />
                        <Row label="Bandas" value={t.bands} />
                        <Row label="Status ABM" value={t.status} />
                        <Row label="Foco" value={t.focus} />
                        <Row label="O deal" value={t.deal} />
                      </div>
                    </motion.dl>
                  ) : null}
                </AnimatePresence>
              </button>
            );
          })}
        </div>
      </div>

      {/* Foco no comitê */}
      <div className="surface-card flex items-start gap-3 p-5">
        <span className="flex h-10 w-10 flex-none items-center justify-center rounded-m bg-primary-soft text-primary">
          <Users size={20} />
        </span>
        <div>
          <h3 className="font-display text-h4 font-semibold">Trabalhamos o comitê, não um contato</h3>
          <p className="mt-1 text-body-sm text-fg-muted">{modeloCommittee}</p>
        </div>
      </div>

      {/* Tier 1 nunca rebaixado */}
      <div className="flex items-center gap-3 rounded-m border border-border bg-bg-soft px-4 py-3 text-body-sm">
        <Lock size={16} className="flex-none text-primary" />
        <span className="text-fg-muted">
          <strong className="text-fg">Tier 1 nunca é rebaixado a Tier 2.</strong> O deal aberto mantém a conta no
          Tier 1. O score move entre bandas, sem trocar o tier. A conta só sai quando o deal fecha.
        </span>
      </div>

      {/* Decisões do Tier 2 */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {tier2Decisions.map((d) => (
          <div key={d.threshold} className="surface-card flex items-start gap-4 p-5">
            <span className="font-display text-h2 font-semibold leading-none text-primary">{d.threshold}</span>
            <span>
              <span className="block font-medium text-fg">{d.title}</span>
              <span className="block text-body-sm text-fg-muted">{d.detail}</span>
            </span>
          </div>
        ))}
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
