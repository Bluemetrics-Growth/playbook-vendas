import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Lock, BookOpen, Bell } from "lucide-react";
import { BrandLogo } from "@/components/shell/BrandLogo";

export const metadata = { title: "CRM no HubSpot" };

const hubspotBase =
  process.env.NEXT_PUBLIC_HUBSPOT_BASE_URL || "https://app.hubspot.com";

// Currículo planejado do playbook de HubSpot (conteúdo em breve).
const plannedLessons = [
  { title: "Visão geral do CRM", desc: "Objetos, pipelines e o modelo de dados do HubSpot." },
  { title: "Propriedades e objetos", desc: "Empresa, Contato, Negócio e as propriedades que importam." },
  { title: "Listas e segmentação", desc: "Listas ativas x estáticas e como usá-las." },
  { title: "Workflows", desc: "Automação, gatilhos e boas práticas de build." },
  { title: "Relatórios e dashboards", desc: "Montar visões de pipeline e performance." },
  { title: "Registro e higiene", desc: "Como registrar atividade e manter o CRM confiável." },
];

export default function CrmPage() {
  return (
    <div className="min-h-screen bg-bg">
      <header className="sticky top-0 z-30 border-b border-border bg-surface/85 backdrop-blur-md">
        <div className="container-wide flex h-14 items-center justify-between">
          <BrandLogo />
          <Link href="/" className="btn btn-sm btn-tertiary">
            <ArrowLeft size={15} /> Catálogo
          </Link>
        </div>
      </header>

      {/* Hero da trilha */}
      <section className="container-wide pt-10 pb-6">
        <div
          className="relative overflow-hidden rounded-2xl px-6 py-14 sm:px-12 sm:py-16"
          style={{
            background: "var(--bm-black)",
            backgroundImage: "url(/brand/bg-network.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="relative max-w-text">
            <div className="flex items-center gap-2">
              <span className="chip text-[11px]" style={{ background: "rgba(255,255,255,0.16)", color: "#fff" }}>Playbook</span>
              <span className="chip text-[11px]" style={{ background: "rgba(6,6,10,0.5)", color: "#fff" }}><Lock size={11} /> Em breve</span>
            </div>
            <h1 className="mt-3 font-display text-display-m font-semibold tracking-tight" style={{ color: "var(--fg-on-dark)" }}>
              CRM no HubSpot
            </h1>
            <p className="mt-3 max-w-narrow text-body" style={{ color: "var(--fg-on-dark-2)" }}>
              Playbook e treinamento de HubSpot: como operar o CRM no dia a dia, das propriedades e
              listas aos workflows e relatórios. A trilha está em construção. Enquanto isso, você pode
              abrir o HubSpot direto.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={hubspotBase} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Abrir o HubSpot <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Currículo planejado */}
      <section className="container-wide py-6">
        <div className="mb-5 flex items-center gap-2">
          <BookOpen size={18} className="text-primary" />
          <h2 className="font-display text-h3 font-semibold">O que vem nesta trilha</h2>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {plannedLessons.map((l, i) => (
            <div key={l.title} className="surface-card flex items-start gap-3 p-4 opacity-90">
              <span className="flex h-8 w-8 flex-none items-center justify-center rounded-pill bg-bg-stage font-display text-body-sm font-semibold text-fg-muted">
                {i + 1}
              </span>
              <div>
                <span className="block font-medium text-fg">{l.title}</span>
                <span className="block text-body-sm text-fg-muted">{l.desc}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-3 rounded-m border border-border bg-bg-soft px-4 py-3 text-body-sm text-fg-muted">
          <Bell size={16} className="flex-none text-primary" />
          Conteúdo em produção. Quando as aulas forem publicadas, elas aparecem aqui como uma trilha
          interativa, no mesmo formato do módulo ABM.
        </div>
      </section>
    </div>
  );
}
