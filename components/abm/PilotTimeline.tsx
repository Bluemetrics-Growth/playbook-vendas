"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { pilotPhases } from "@/content/abm/pilot";

const phaseColor = ["var(--band-nurture)", "var(--band-attention)", "var(--band-trigger)"];

export function PilotTimeline() {
  const [open, setOpen] = useState(pilotPhases[0].id);

  return (
    <div className="flex flex-col gap-4">
      {/* Barra de 12 semanas */}
      <div className="flex gap-1">
        {pilotPhases.map((p, i) => {
          const span = i === 0 ? 2 : i === 1 ? 6 : 4; // semanas por fase
          const active = open === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setOpen(p.id)}
              style={{ flexGrow: span, background: active ? phaseColor[i] : "var(--neutral-200)" }}
              className="group relative h-10 rounded-m transition-all"
              aria-pressed={active}
              title={`${p.name} · ${p.weeks}`}
            >
              <span className={`text-[12px] font-medium ${active ? "text-white" : "text-fg-muted"}`}>
                {p.phase}
              </span>
            </button>
          );
        })}
      </div>
      <div className="flex justify-between text-[11px] text-fg-hint">
        <span>Semana 1</span>
        <span>Semana 12</span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {pilotPhases.map((p, i) => {
          const active = open === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setOpen(p.id)}
              className={[
                "flex flex-col gap-1 rounded-l border p-4 text-left transition-all",
                active ? "border-primary bg-primary-soft shadow-1" : "surface-card hover:border-border-strong",
              ].join(" ")}
            >
              <span className="eyebrow text-[10px]" style={{ color: phaseColor[i] }}>{p.weeks}</span>
              <span className="font-display text-h4 font-semibold">{p.name}</span>
              <span className="text-body-sm text-fg-muted">{p.phase}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {pilotPhases
          .filter((p) => p.id === open)
          .map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="surface-card p-5"
            >
              <h3 className="mb-3 font-display text-h4 font-semibold">{p.name} · {p.weeks}</h3>
              <ul className="flex flex-col gap-2">
                {p.activities.map((a) => (
                  <li key={a} className="flex items-start gap-2.5 text-body-sm text-fg">
                    <Check size={16} className="mt-0.5 flex-none text-primary" />
                    {a}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
}
