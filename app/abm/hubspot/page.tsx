import { PageHeader } from "@/components/ui/PageHeader";
import { SectionShell } from "@/components/abm/SectionShell";
import { PropertyTable } from "@/components/abm/PropertyTable";
import { marketingComms } from "@/content/abm/properties";
import { Megaphone, ArrowUpRight, Target, GitBranch, BarChart3 } from "lucide-react";

export const metadata = { title: "Propriedades no HubSpot" };

const hubspotBase = process.env.NEXT_PUBLIC_HUBSPOT_BASE_URL || "https://app.hubspot.com";

const shortcuts = [
  { icon: Target, label: "Contas-alvo", desc: "A lista de Target Accounts do ABM.", href: hubspotBase },
  { icon: GitBranch, label: "Workflows ABM", desc: "As esteiras [ABM] já publicadas.", href: hubspotBase },
  { icon: BarChart3, label: "Painel de mensuração", desc: "KPIs por conta e pipeline.", href: hubspotBase },
];

export default function HubspotPage() {
  return (
    <SectionShell slug="hubspot">
      <PageHeader
        eyebrow="ABM · HubSpot"
        title="Propriedades no HubSpot"
        intro="O ABM já está construído e roda 100% no HubSpot. Esta tela é referência: o que é cada propriedade e para que ela serve na operação. Os nomes batem exatamente com o CRM."
      />

      {/* Atalhos para o HubSpot */}
      <section className="mb-10">
        <h2 className="mb-4 font-display text-h3 font-semibold">Atalhos</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {shortcuts.map((s) => {
            const SIcon = s.icon;
            return (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="surface-card group flex flex-col gap-2 p-5 transition-all hover:border-border-strong hover:shadow-2"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-m bg-primary-soft text-primary">
                  <SIcon size={20} strokeWidth={1.75} />
                </span>
                <span className="flex items-center gap-1 font-medium text-fg">
                  {s.label} <ArrowUpRight size={14} className="text-fg-hint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
                <span className="text-body-sm text-fg-muted">{s.desc}</span>
              </a>
            );
          })}
        </div>
      </section>

      {/* Propriedades */}
      <section className="mb-10">
        <h2 className="mb-4 font-display text-h3 font-semibold">O que é cada propriedade</h2>
        <PropertyTable />
      </section>

      {/* Comunicação de marketing */}
      <section>
        <div className="surface-card flex items-start gap-3 p-5">
          <span className="flex h-10 w-10 flex-none items-center justify-center rounded-m" style={{ background: "rgba(123,0,220,0.1)", color: "var(--bm-purple)" }}>
            <Megaphone size={20} />
          </span>
          <div>
            <h3 className="font-display text-h4 font-semibold">{marketingComms.title}</h3>
            <p className="mt-1 text-body-sm text-fg-muted">{marketingComms.body}</p>
          </div>
        </div>
      </section>
    </SectionShell>
  );
}
