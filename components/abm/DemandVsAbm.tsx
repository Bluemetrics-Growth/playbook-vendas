"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Fish } from "lucide-react";
import { teseContrast } from "@/content/abm/prose";

export function DemandVsAbm() {
  const [side, setSide] = useState<"net" | "spear">("spear");
  const data = teseContrast[side];

  return (
    <div className="surface-card p-5">
      <div className="mb-4 inline-flex items-center gap-1 rounded-pill bg-bg-stage p-1">
        <button
          onClick={() => setSide("net")}
          aria-pressed={side === "net"}
          className={`rounded-pill px-4 py-2 text-body-sm font-medium transition-all ${side === "net" ? "bg-surface text-fg shadow-1" : "text-fg-muted"}`}
        >
          Pescar com rede
        </button>
        <button
          onClick={() => setSide("spear")}
          aria-pressed={side === "spear"}
          className={`rounded-pill px-4 py-2 text-body-sm font-medium transition-all ${side === "spear" ? "bg-surface text-fg shadow-1" : "text-fg-muted"}`}
        >
          Pescar com lança
        </button>
      </div>

      <motion.div
        key={side}
        initial={{ opacity: 0, x: side === "spear" ? 16 : -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.25 }}
      >
        <div className="mb-3 flex items-center gap-3">
          <span
            className="flex h-11 w-11 items-center justify-center rounded-m"
            style={{ background: side === "spear" ? "var(--primary-soft)" : "var(--neutral-100)", color: side === "spear" ? "var(--bm-blue)" : "var(--fg-2)" }}
          >
            <Fish size={22} />
          </span>
          <div>
            <span className="eyebrow text-[10px]">{data.subtitle}</span>
            <h3 className="font-display text-h3 font-semibold">{data.title}</h3>
          </div>
        </div>
        <ul className="flex flex-col gap-2">
          {data.points.map((pt) => (
            <li key={pt} className="flex items-start gap-2.5 text-body-sm text-fg">
              <Check size={16} className="mt-0.5 flex-none" style={{ color: side === "spear" ? "var(--bm-blue)" : "var(--fg-3)" }} />
              {pt}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
