import { PageHeader } from "@/components/ui/PageHeader";
import { SectionShell } from "@/components/abm/SectionShell";
import { TesePrinciples } from "@/components/abm/TesePrinciples";
import { DemandVsAbm } from "@/components/abm/DemandVsAbm";
import { teseEconomics } from "@/content/abm/prose";

export const metadata = { title: "A Tese" };

export default function TesePage() {
  return (
    <SectionShell slug="tese">
      <PageHeader
        eyebrow="ABM · A Tese"
        title="Por que ABM na BlueMetrics"
        intro="Antes da mecânica, o porquê. O ABM concentra esforço nas contas certas em vez de espalhar disparos. Cinco princípios inegociáveis sustentam o modelo."
      />

      <section className="mb-10">
        <h2 className="mb-4 font-display text-h3 font-semibold">Os 5 princípios</h2>
        <TesePrinciples />
      </section>

      <section className="mb-10">
        <h2 className="mb-4 font-display text-h3 font-semibold">Rede x lança</h2>
        <DemandVsAbm />
      </section>

      <section className="stage-card p-6">
        <h2 className="mb-2 font-display text-h4 font-semibold">A economia que puxa ABM</h2>
        <p className="max-w-text text-body text-fg-muted">{teseEconomics}</p>
      </section>
    </SectionShell>
  );
}
