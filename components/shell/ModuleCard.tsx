"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Module } from "@/content/types";
import { Icon } from "@/components/ui/Icon";
import { ArrowRight, ArrowUpRight, Lock } from "lucide-react";

const hubspotBase = process.env.NEXT_PUBLIC_CRM_URL || process.env.NEXT_PUBLIC_HUBSPOT_BASE_URL || "https://app.hubspot.com";

export function ModuleCard({ module, index }: { module: Module; index: number }) {
  const isActive = module.status === "active";
  const isShortcut = module.status === "shortcut";
  const isComing = module.status === "coming-soon";

  const inner = (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.4), ease: [0.16, 1, 0.3, 1] }}
      className={[
        "group relative flex h-full flex-col gap-4 rounded-xl border p-6 transition-all duration-200",
        isActive
          ? "border-transparent bg-bm-black text-fg-on-dark shadow-2 hover:shadow-3"
          : isShortcut
            ? "surface-card hover:border-border-strong hover:shadow-2"
            : "border-border bg-bg-soft opacity-70",
      ].join(" ")}
    >
      <div className="flex items-start justify-between">
        <span
          className={[
            "flex h-11 w-11 items-center justify-center rounded-m",
            isActive ? "bg-white/10 text-white" : isShortcut ? "bg-primary-soft text-primary" : "bg-neutral-200/60 text-fg-muted",
          ].join(" ")}
          style={!isActive && !isShortcut ? { background: "var(--neutral-200)" } : undefined}
        >
          <Icon name={module.icon} size={22} strokeWidth={1.5} />
        </span>
        {isComing ? (
          <span className="chip chip-gray"><Lock size={12} /> Em breve</span>
        ) : isShortcut ? (
          <span className="chip chip-gray">Atalho</span>
        ) : (
          <span className="chip" style={{ background: "rgba(255,255,255,0.14)", color: "#fff" }}>Ativo</span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <h3
          className="font-display text-h3 font-semibold tracking-tight"
          style={{ color: isActive ? "var(--fg-on-dark)" : "var(--fg-1)" }}
        >
          {module.title}
        </h3>
        <p
          className="text-body-sm leading-relaxed"
          style={{ color: isActive ? "var(--fg-on-dark-2)" : "var(--fg-2)" }}
        >
          {module.summary}
        </p>
      </div>

      <div className="mt-auto pt-2 text-body-sm font-medium">
        {isActive ? (
          <span className="inline-flex items-center gap-1.5 text-white">
            Entrar <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </span>
        ) : isShortcut ? (
          <span className="inline-flex items-center gap-1.5 text-primary">
            Abrir no HubSpot <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        ) : (
          <span className="text-fg-hint">Módulo sugerido</span>
        )}
      </div>
    </motion.div>
  );

  if (isActive) {
    return <Link href={module.href ?? "/abm"} className="block h-full focus-visible:outline-none">{inner}</Link>;
  }
  if (isShortcut) {
    return (
      <a
        href={hubspotBase}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full focus-visible:outline-none"
      >
        {inner}
      </a>
    );
  }
  return <div className="h-full" aria-disabled="true">{inner}</div>;
}
