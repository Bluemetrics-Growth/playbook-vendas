import Link from "next/link";
import { ArrowRight, GraduationCap, Search, Layers } from "lucide-react";
import { modules } from "@/content/modules";
import { ModuleCard } from "@/components/shell/ModuleCard";
import { BrandLogo } from "@/components/shell/BrandLogo";
import { SearchButton } from "@/components/shell/CommandPalette";

export default function HomePage() {
  const available = modules.filter((m) => m.status === "active").length;
  const total = modules.length;

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border bg-surface/85 backdrop-blur-md">
        <div className="container-wide flex h-14 items-center justify-between">
          <BrandLogo />
          <div className="flex items-center gap-3">
            <a href="#catalogo" className="hidden text-body-sm text-fg-muted hover:text-fg sm:inline">Playbooks</a>
            <a href="#como-funciona" className="hidden text-body-sm text-fg-muted hover:text-fg sm:inline">Como funciona</a>
            <SearchButton />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container-wide pt-10 pb-6">
        <div
          className="relative overflow-hidden rounded-2xl px-6 py-14 sm:px-12 sm:py-20"
          style={{
            background: "var(--bm-black)",
            backgroundImage: "url(/brand/bg-liquid-blue.png)",
            backgroundSize: "cover",
            backgroundPosition: "right center",
          }}
        >
          <div className="relative max-w-text">
            <span className="eyebrow" style={{ color: "var(--fg-on-dark-2)" }}>
              Treinamento e consulta comercial
            </span>
            <h1
              className="mt-3 font-display text-display-l font-semibold tracking-tight"
              style={{ color: "var(--fg-on-dark)" }}
            >
              A escola dos playbooks BlueMetrics.
            </h1>
            <p className="mt-4 max-w-narrow text-body" style={{ color: "var(--fg-on-dark-2)" }}>
              Um ambiente para os times comerciais aprenderem e consultarem os playbooks da
              BlueMetrics. Cada playbook é uma trilha interativa: estude do zero quando quiser treinar,
              ou pule direto ao ponto quando precisar consultar no meio da operação.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#catalogo" className="btn btn-primary">
                Ver playbooks <ArrowRight size={16} />
              </a>
              <SearchButton className="border-white/20 bg-white/10 text-white hover:border-white/40 hover:text-white" />
            </div>
          </div>
        </div>
      </section>

      {/* Catálogo */}
      <section id="catalogo" className="container-wide py-8">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <span className="eyebrow">Catálogo</span>
            <h2 className="mt-1 font-display text-h1 font-semibold tracking-tight">Trilhas e playbooks</h2>
          </div>
          <span className="hidden items-center gap-1.5 text-body-sm text-fg-muted sm:inline-flex">
            <Layers size={15} /> {available} de {total} disponíveis
          </span>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((m, i) => (
            <ModuleCard key={m.slug} module={m} index={i} />
          ))}
        </div>
      </section>

      {/* Como funciona */}
      <section id="como-funciona" className="container-wide py-10">
        <div className="mb-6">
          <span className="eyebrow">Como funciona</span>
          <h2 className="mt-1 font-display text-h1 font-semibold tracking-tight">Dois jeitos de usar.</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="stage-card flex flex-col gap-3 p-7">
            <span className="flex h-11 w-11 items-center justify-center rounded-m bg-primary-soft text-primary">
              <GraduationCap size={22} strokeWidth={1.5} />
            </span>
            <h3 className="font-display text-h3 font-semibold">Treinar</h3>
            <p className="text-body-sm text-fg-muted">
              Uma trilha guiada por playbook, com capas por aula, progresso salvo e um checkpoint no
              fim. Ideal para onboarding e para adotar um novo motion. Em breve, com vídeos.
            </p>
          </div>
          <div className="stage-card flex flex-col gap-3 p-7">
            <span className="flex h-11 w-11 items-center justify-center rounded-m bg-primary-soft text-primary">
              <Search size={22} strokeWidth={1.5} />
            </span>
            <h3 className="font-display text-h3 font-semibold">Consultar</h3>
            <p className="text-body-sm text-fg-muted">
              Acesso livre e rápido, com busca ⌘K de qualquer lugar. Para puxar no meio de uma call um
              roteiro, uma regra ou um conceito, sem percorrer a trilha inteira.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="container-wide flex flex-col items-start justify-between gap-3 py-8 text-body-sm text-fg-muted sm:flex-row sm:items-center">
          <BrandLogo />
          <p>Ambiente interno de conhecimento comercial da BlueMetrics.</p>
        </div>
      </footer>
    </div>
  );
}
