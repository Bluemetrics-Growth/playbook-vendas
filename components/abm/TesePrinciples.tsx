"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { tesePrinciples } from "@/content/abm/prose";

export function TesePrinciples() {
  const [open, setOpen] = useState<string | null>(tesePrinciples[0].id);

  return (
    <div className="grid grid-cols-1 gap-3">
      {tesePrinciples.map((p, i) => {
        const isOpen = open === p.id;
        return (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: Math.min(i * 0.06, 0.4) }}
            className="surface-card overflow-hidden"
          >
            <button
              onClick={() => setOpen(isOpen ? null : p.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center gap-4 p-5 text-left"
            >
              <span className="flex h-9 w-9 flex-none items-center justify-center rounded-pill bg-primary font-display font-semibold text-white">
                {i + 1}
              </span>
              <span className="flex-1">
                <span className="block font-display text-h4 font-semibold">{p.title}</span>
                <span className="block text-body-sm text-fg-muted">{p.short}</span>
              </span>
              <span className="flex-none text-fg-muted">{isOpen ? <Minus size={18} /> : <Plus size={18} />}</span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="border-t border-border px-5 py-4">
                    <span className="eyebrow text-[10px]">Exemplo BlueMetrics</span>
                    <p className="mt-1 text-body-sm text-fg">{p.example}</p>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
