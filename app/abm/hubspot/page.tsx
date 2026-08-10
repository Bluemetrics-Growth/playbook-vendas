import { PageHeader } from "@/components/ui/PageHeader";
import { SectionShell } from "@/components/abm/SectionShell";
import { PropertyTable } from "@/components/abm/PropertyTable";
import { Checklist } from "@/components/abm/Checklist";
import { alwaysOn, buildConventions } from "@/content/abm/properties";
import { Radio, ArrowUpRight } from "lucide-react";

export const metadata = { title: "Fundação no HubSpot" };

const hubspotBase = process.env.NEXT_PUBLIC_HUBSPOT_BASE_URL || "https://app.hubspot.com";

export default function HubspotPage() {
  return (
    <SectionShell slug="hubspot">
      <PageHeader
        eyebrow="ABM · HubSpot"
        title="Fundação no HubSpot"
        intro="O ABM é 100% gerido no HubSpot. O Playbook é espelho do CRM. Nomes de propriedades, bandas e workflows batem exatamente com o que existe lá."
      >
        <a href={hubspotBase} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-secondary mt-2 w-fit">
          Abrir o HubSpot <ArrowUpRight size={15} />
        </a>
      </PageHeader>

      <section className="mb-10">
        <h2 className="mb-4 font-display text-h3 font-semibold">Propriedades</h2>
        <PropertyTable />
      </section>

      <section className="mb-10">
        <div className="surface-card flex items-start gap-3 p-5">
          <span className="flex h-10 w-10 flex-none items-center justify-center rounded-m" style={{ background: "rgba(123,0,220,0.1)", color: "var(--bm-purple)" }}>
            <Radio size={20} />
          </span>
          <div>
            <h3 className="font-display text-h4 font-semibold">{alwaysOn.title}</h3>
            <p className="mt-1 text-body-sm text-fg-muted">{alwaysOn.body}</p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 font-display text-h3 font-semibold">Convenções de build</h2>
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {buildConventions.map((c) => (
            <li key={c} className="flex items-start gap-2 rounded-m border border-border bg-surface px-4 py-3 text-body-sm text-fg-muted">
              <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-primary" />
              {c}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-4 font-display text-h3 font-semibold">Checklist de build</h2>
        <Checklist />
      </section>
    </SectionShell>
  );
}
