"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { abmSections } from "@/content/abm/sections";
import { Icon } from "@/components/ui/Icon";
import { openCommandPalette } from "@/components/shell/CommandPalette";

const groups = ["Tese", "Modelo", "Operação", "Gestão"] as const;

export function AbmHome() {
  return (
    <div className="flex flex-col gap-8">
      {/* Intro */}
      <div
        className="relative overflow-hidden rounded-2xl px-6 py-10 sm:px-10 sm:py-12"
        style={{
          background: "var(--bm-black)",
          backgroundImage: "url(/brand/bg-liquid-deep.png)",
          backgroundSize: "cover",
          backgroundPosition: "right center",
        }}
      >
        <div className="relative max-w-text">
          <span className="eyebrow" style={{ color: "var(--fg-on-dark-2)" }}>
            Módulo ABM
          </span>
          <h1 className="mt-2 font-display text-display-m font-semibold tracking-tight" style={{ color: "var(--fg-on-dark)" }}>
            O sistema operacional de crescimento por conta.
          </h1>
          <p className="mt-3 max-w-narrow text-body" style={{ color: "var(--fg-on-dark-2)" }}>
            Conta como unidade, três tiers, dois scores, esteiras de cadência e mensuração por conta e pipeline.
            Este é o playbook de operação do ABM, do relacionamento ao fechamento e à prospecção fria dos EUA.
          </p>
        </div>
      </div>

      {/* Busca */}
      <button
        type="button"
        onClick={openCommandPalette}
        className="surface-card flex items-center gap-3 p-5 text-left transition-colors hover:border-border-strong"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-m bg-primary-soft text-primary">
          <Icon name="Search" size={20} />
        </span>
        <span className="flex-1">
          <span className="block font-medium text-fg">Buscar em tudo</span>
          <span className="block text-body-sm text-fg-muted">Workflows, tasks, termos, propriedades e regras.</span>
        </span>
        <kbd className="mono rounded-s border border-border px-2 py-1 text-[12px] text-fg-muted">⌘K</kbd>
      </button>

      {/* Seções por grupo */}
      {groups.map((group) => {
        const items = abmSections.filter((s) => s.group === group);
        return (
          <div key={group}>
            <span className="eyebrow">{group}</span>
            <ol className="mt-3 flex flex-col gap-2">
              {items.map((s, i) => (
                <motion.li
                  key={s.slug}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.25, delay: Math.min(i * 0.03, 0.3) }}
                >
                  <Link
                    href={s.href}
                    className="surface-card group flex items-center gap-4 overflow-hidden p-2.5 pr-4 transition-all hover:border-border-strong hover:shadow-2"
                  >
                    {/* Capa */}
                    <span className="relative h-14 w-24 flex-none overflow-hidden rounded-m bg-bm-black">
                      <span
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url(${s.cover})` }}
                      />
                      <span className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(6,6,10,0.1), rgba(6,6,10,0.55))" }} />
                    </span>
                    <span className="flex-1">
                      <span className="flex items-center gap-2 font-medium text-fg">
                        <Icon name={s.icon} size={15} className="text-fg-muted" /> {s.title}
                      </span>
                      <span className="flex items-center gap-2 text-body-sm text-fg-muted">
                        {s.short}
                        {s.duration ? <span className="text-fg-hint">· {s.duration}</span> : null}
                      </span>
                    </span>
                    <ArrowRight size={18} className="flex-none text-fg-hint transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </motion.li>
              ))}
            </ol>
          </div>
        );
      })}
    </div>
  );
}
