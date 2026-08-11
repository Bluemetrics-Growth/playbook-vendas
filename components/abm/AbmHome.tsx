"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calculator, Check, Route, Sparkles } from "lucide-react";
import { abmSections } from "@/content/abm/sections";
import { useProgress } from "@/lib/progress";
import { Icon } from "@/components/ui/Icon";
import { openCommandPalette } from "@/components/shell/CommandPalette";
import { ProgressBar } from "@/components/shell/ProgressBar";

export function AbmHome() {
  const mode = useProgress((s) => s.mode);
  const seen = useProgress((s) => s.seen);
  const hydrated = useProgress((s) => s.hydrated);
  const consultar = hydrated && mode === "consultar";

  const firstUnseen = abmSections.find((s) => !seen[s.slug]) ?? abmSections[0];

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
            Conta como unidade, dois tiers, dois scores, esteiras de cadência e medição por conta e
            pipeline. Escolha o modo no menu: treinar do zero ou consultar no fluxo.
          </p>
        </div>
      </div>

      {consultar ? (
        <ConsultarView />
      ) : (
        <TreinarView firstUnseen={firstUnseen.href} firstTitle={firstUnseen.title} seen={seen} />
      )}
    </div>
  );
}

function TreinarView({
  firstUnseen,
  firstTitle,
  seen,
}: {
  firstUnseen: string;
  firstTitle: string;
  seen: Record<string, boolean>;
}) {
  return (
    <>
      <div className="surface-card flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <h2 className="font-display text-h3 font-semibold">Trilha guiada</h2>
          <p className="mt-1 text-body-sm text-fg-muted">
            Dez seções na ordem certa, com progresso salvo. Feche com o checkpoint.
          </p>
          <div className="mt-4 max-w-sm">
            <ProgressBar />
          </div>
        </div>
        <Link href={firstUnseen} className="btn btn-primary self-start">
          Continuar: {firstTitle} <ArrowRight size={16} />
        </Link>
      </div>

      <ol className="flex flex-col gap-2">
        {abmSections.map((s, i) => {
          const isSeen = !!seen[s.slug];
          return (
            <motion.li
              key={s.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: Math.min(i * 0.03, 0.3) }}
            >
              <Link
                href={s.href}
                className="surface-card group flex items-center gap-4 overflow-hidden p-2.5 pr-4 transition-all hover:border-border-strong hover:shadow-2"
              >
                {/* Capa da aula */}
                <span className="relative h-14 w-24 flex-none overflow-hidden rounded-m bg-bm-black">
                  <span
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${s.cover})` }}
                  />
                  <span className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(6,6,10,0.1), rgba(6,6,10,0.55))" }} />
                  <span
                    className={[
                      "absolute left-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-pill font-display text-[12px] font-semibold",
                      isSeen ? "text-white" : "bg-white/85 text-primary",
                    ].join(" ")}
                    style={isSeen ? { background: "var(--bm-green)" } : undefined}
                  >
                    {isSeen ? <Check size={14} /> : i + 1}
                  </span>
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
          );
        })}
      </ol>
    </>
  );
}

function ConsultarView() {
  const highlights = [
    { href: "/abm/simulador", title: "Simulador de Score", desc: "Calcule Abordagem e Prioridade ao vivo.", icon: Calculator },
    { href: "/abm/esteiras", title: "Esteiras", desc: "Workflows e roteiros copiáveis.", icon: Route },
    { href: "/abm/jornada", title: "Jornada", desc: "O ciclo completo da conta.", icon: Sparkles },
  ];
  return (
    <>
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

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {highlights.map((h) => {
          const HIcon = h.icon;
          return (
            <Link key={h.href} href={h.href} className="surface-card group flex flex-col gap-2 p-5 transition-all hover:border-border-strong hover:shadow-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-m bg-bg-stage text-primary">
                <HIcon size={20} strokeWidth={1.5} />
              </span>
              <span className="font-medium text-fg">{h.title}</span>
              <span className="text-body-sm text-fg-muted">{h.desc}</span>
            </Link>
          );
        })}
      </div>

      <div>
        <span className="eyebrow">Índice completo</span>
        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {abmSections.map((s) => (
            <Link
              key={s.slug}
              href={s.href}
              className="flex items-center gap-3 rounded-m border border-border bg-surface px-4 py-3 text-body-sm transition-colors hover:border-border-strong hover:bg-bg-soft"
            >
              <Icon name={s.icon} size={16} className="text-fg-muted" />
              <span className="flex-1 font-medium text-fg">{s.title}</span>
              <span className="text-fg-hint">{s.group}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
