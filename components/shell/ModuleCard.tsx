"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Module } from "@/content/types";
import { Icon } from "@/components/ui/Icon";
import { useProgress } from "@/lib/progress";
import { abmSections } from "@/content/abm/sections";
import { ArrowRight, Lock, Play, BookOpen, Clock } from "lucide-react";

export function ModuleCard({ module, index }: { module: Module; index: number }) {
  const seen = useProgress((s) => s.seen);
  const hydrated = useProgress((s) => s.hydrated);

  const isActive = module.status === "active";
  const clickable = !!module.href; // active ou coming-soon com landing (ex.: CRM)
  const locked = module.status === "coming-soon";

  // Progresso só faz sentido para o ABM (único com trilha real hoje).
  const abmDone = hydrated && module.slug === "abm" ? abmSections.filter((s) => seen[s.slug]).length : 0;
  const abmTotal = abmSections.length;
  const started = abmDone > 0;

  const inner = (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.4), ease: [0.16, 1, 0.3, 1] }}
      className={[
        "group flex h-full flex-col overflow-hidden rounded-xl border bg-surface transition-all duration-200",
        clickable ? "border-border hover:-translate-y-0.5 hover:border-border-strong hover:shadow-3" : "border-border",
        locked && !clickable ? "opacity-75" : "",
      ].join(" ")}
    >
      {/* Capa */}
      <div className="relative aspect-[16/9] overflow-hidden bg-bm-black">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.04]"
          style={{ backgroundImage: `url(${module.cover})`, filter: locked ? "grayscale(0.5)" : "none" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(6,6,10,0.15), rgba(6,6,10,0.72))" }} />

        {/* Badge de status */}
        <div className="absolute right-3 top-3">
          {isActive ? (
            <span className="chip text-[11px]" style={{ background: "rgba(255,255,255,0.18)", color: "#fff" }}>Disponível</span>
          ) : (
            <span className="chip text-[11px]" style={{ background: "rgba(6,6,10,0.55)", color: "#fff" }}>
              <Lock size={11} /> Em breve
            </span>
          )}
        </div>

        {/* Ícone + kicker no rodapé da capa */}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-m bg-white/15 text-white backdrop-blur-sm">
              <Icon name={module.icon} size={18} strokeWidth={1.75} />
            </span>
            <h3 className="font-display text-h4 font-semibold text-white drop-shadow">{module.title}</h3>
          </div>
          {isActive ? (
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-primary shadow-2 transition-transform group-hover:scale-110">
              <Play size={15} className="ml-0.5" fill="currentColor" />
            </span>
          ) : null}
        </div>
      </div>

      {/* Corpo */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-2 text-[11px]">
          {module.kicker ? <span className="chip chip-blue text-[11px]">{module.kicker}</span> : null}
          {module.lessons ? (
            <span className="inline-flex items-center gap-1 text-fg-muted"><BookOpen size={12} /> {module.lessons} aulas</span>
          ) : null}
          {module.duration ? (
            <span className="inline-flex items-center gap-1 text-fg-muted"><Clock size={12} /> {module.duration}</span>
          ) : null}
        </div>

        <p className="text-body-sm leading-relaxed text-fg-muted">{module.summary}</p>

        {/* Progresso (ABM) */}
        {isActive && module.slug === "abm" ? (
          <div className="mt-1 flex flex-col gap-1">
            <div className="flex items-center justify-between text-[11px] text-fg-muted">
              <span>{started ? "Continuar" : "Começar trilha"}</span>
              <span className="mono">{abmDone}/{abmTotal}</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-pill bg-bg-stage">
              <div className="h-full rounded-pill bg-primary transition-[width] duration-500" style={{ width: `${(abmDone / abmTotal) * 100}%` }} />
            </div>
          </div>
        ) : null}

        <div className="mt-auto pt-1 text-body-sm font-medium">
          {isActive ? (
            <span className="inline-flex items-center gap-1.5 text-primary">
              {started ? "Retomar" : "Entrar"} <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </span>
          ) : clickable ? (
            <span className="inline-flex items-center gap-1.5 text-fg-muted group-hover:text-primary">
              Saber mais <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </span>
          ) : (
            <span className="text-fg-hint">Em breve</span>
          )}
        </div>
      </div>
    </motion.div>
  );

  if (clickable) {
    return (
      <Link href={module.href!} className="block h-full focus-visible:outline-none">
        {inner}
      </Link>
    );
  }
  return <div className="h-full" aria-disabled="true">{inner}</div>;
}
