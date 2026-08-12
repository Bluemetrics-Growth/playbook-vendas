import { PageHeader } from "@/components/ui/PageHeader";
import { SectionShell } from "@/components/abm/SectionShell";
import { MeasurementDashboard } from "@/components/abm/MeasurementDashboard";
import { resultMetrics, progressMetrics, mqa, threeRs, alignment } from "@/content/abm/measurement";
import { ArrowUpRight } from "lucide-react";

export const metadata = { title: "Mensuração" };

const hubspotBase = process.env.NEXT_PUBLIC_HUBSPOT_BASE_URL || "https://app.hubspot.com";

export default function MedicaoPage() {
  return (
    <SectionShell slug="medicao">
      <PageHeader
        eyebrow="ABM · Mensuração"
        title="KPIs e painel no HubSpot"
        intro="Medimos por conta e pipeline. Os KPIs vivem em um painel do HubSpot que marketing e comercial acompanham juntos, semana a semana."
      >
        <a href={hubspotBase} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-secondary mt-2 w-fit">
          Abrir o painel no HubSpot <ArrowUpRight size={15} />
        </a>
      </PageHeader>

      {/* KPIs */}
      <section className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="surface-card p-5">
          <span className="eyebrow">KPIs de resultado</span>
          <ul className="mt-2 flex flex-col gap-1.5">
            {resultMetrics.map((m) => (
              <li key={m.label} className="flex items-start gap-2 text-body-sm text-fg">
                <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-primary" />
                {m.label}
              </li>
            ))}
          </ul>
        </div>
        <div className="surface-card p-5">
          <span className="eyebrow">KPIs de progresso</span>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {progressMetrics.map((m) => (
              <li key={m.label} className="chip chip-gray text-[12px]">{m.label}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Painel do HubSpot */}
      <section className="mb-10">
        <h2 className="mb-4 font-display text-h3 font-semibold">O painel que acompanhamos</h2>
        <MeasurementDashboard />
      </section>

      {/* MQA */}
      <section className="mb-10">
        <div className="surface-card p-5">
          <h3 className="font-display text-h4 font-semibold">{mqa.title}</h3>
          <p className="mt-2 max-w-text text-body-sm text-fg-muted">{mqa.body}</p>
          <div className="mt-4 flex gap-2">
            {threeRs.map((r) => (
              <span key={r} className="chip chip-blue">{r}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Acordo marketing + comercial */}
      <section>
        <h2 className="mb-4 font-display text-h3 font-semibold">O acordo entre marketing e comercial</h2>
        <div className="surface-card overflow-hidden">
          <div className="border-b border-border bg-bg-soft px-5 py-3">
            <span className="font-medium text-fg">Um único motion, dois donos, a mesma régua</span>
          </div>
          <ol className="divide-y divide-border">
            {alignment.map((k, i) => (
              <li key={k.label} className="flex items-start gap-4 px-5 py-4">
                <span className="flex h-7 w-7 flex-none items-center justify-center rounded-pill bg-primary-soft font-display text-body-sm font-semibold text-primary">
                  {i + 1}
                </span>
                <span>
                  <span className="block font-medium text-fg">{k.label}</span>
                  <span className="block text-body-sm text-fg-muted">{k.detail}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </SectionShell>
  );
}
