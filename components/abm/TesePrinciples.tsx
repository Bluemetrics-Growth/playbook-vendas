"use client";

import { motion } from "framer-motion";
import { tesePrinciples } from "@/content/abm/prose";

export function TesePrinciples() {
  return (
    <div className="grid grid-cols-1 gap-3">
      {tesePrinciples.map((p, i) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: Math.min(i * 0.06, 0.4) }}
          className="surface-card flex items-start gap-4 p-5"
        >
          <span className="flex h-9 w-9 flex-none items-center justify-center rounded-pill bg-primary font-display font-semibold text-white">
            {i + 1}
          </span>
          <span className="flex-1">
            <span className="block font-display text-h4 font-semibold">{p.title}</span>
            <span className="mt-0.5 block text-body-sm text-fg-muted">{p.short}</span>
          </span>
        </motion.div>
      ))}
    </div>
  );
}
