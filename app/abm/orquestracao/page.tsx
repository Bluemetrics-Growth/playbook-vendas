import { PageHeader } from "@/components/ui/PageHeader";
import { SectionShell } from "@/components/abm/SectionShell";
import { IfThenMap } from "@/components/abm/IfThenMap";
import { orchestrationSequence, slaNote } from "@/content/abm/orchestration";
import { ArrowRight } from "lucide-react";

export const metadata = { title: "Orquestração" };

export default function OrquestracaoPage() {
  return (
    <SectionShell slug="orquestracao">
      <PageHeader
        eyebrow="ABM · Orquestração"
        title="Mapa if-then e SLA"
        intro="A referência rápida das regras de disparo. Filtre por tier ou por SLA. Abaixo, a sequência de canais que orquestra o motion."
      />

      <section className="mb-10">
        <IfThenMap />
      </section>

      <section className="mb-8">
        <h2 className="mb-4 font-display text-h3 font-semibold">Sequência de orquestração</h2>
        <div className="flex flex-col gap-3 md:flex-row md:items-stretch">
          {orchestrationSequence.map((stage, i) => (
            <div key={stage.step} className="flex flex-1 items-stretch gap-3">
              <div className="surface-card flex flex-1 flex-col gap-2 p-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-pill bg-primary font-display font-semibold text-white">
                  {stage.step}
                </span>
                <span className="font-medium text-fg">{stage.name}</span>
                <span className="text-body-sm text-fg-muted">{stage.role}</span>
              </div>
              {i < orchestrationSequence.length - 1 ? (
                <ArrowRight size={20} className="hidden flex-none self-center text-fg-hint md:block" />
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <div className="rounded-m border border-border bg-bg-soft px-4 py-3 text-body-sm text-fg-muted">
        {slaNote}
      </div>
    </SectionShell>
  );
}
