import { PageHeader } from "@/components/ui/PageHeader";
import { SectionShell } from "@/components/abm/SectionShell";
import { PilotTimeline } from "@/components/abm/PilotTimeline";
import { pilotGoal, weeklyRitual, pilotResources, pilotExpectation } from "@/content/abm/pilot";
import { CalendarClock, Users, Target } from "lucide-react";

export const metadata = { title: "Piloto de 90 dias" };

export default function PilotoPage() {
  return (
    <SectionShell slug="piloto">
      <PageHeader
        eyebrow="ABM · Piloto"
        title="Piloto de 90 dias"
        intro={pilotGoal}
      />

      <section className="mb-10">
        <h2 className="mb-4 font-display text-h3 font-semibold">As 3 fases</h2>
        <PilotTimeline />
      </section>

      <section className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="surface-card p-5">
          <span className="flex h-10 w-10 items-center justify-center rounded-m bg-primary-soft text-primary">
            <CalendarClock size={20} />
          </span>
          <h3 className="mt-3 font-display text-h4 font-semibold">Ritual semanal</h3>
          <ul className="mt-2 flex flex-col gap-1.5">
            {weeklyRitual.map((r) => (
              <li key={r} className="flex items-start gap-2 text-body-sm text-fg-muted">
                <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-primary" />
                {r}
              </li>
            ))}
          </ul>
        </div>
        <div className="surface-card p-5">
          <span className="flex h-10 w-10 items-center justify-center rounded-m bg-primary-soft text-primary">
            <Users size={20} />
          </span>
          <h3 className="mt-3 font-display text-h4 font-semibold">Recursos</h3>
          <ul className="mt-2 flex flex-col gap-1.5">
            {pilotResources.map((r) => (
              <li key={r} className="flex items-start gap-2 text-body-sm text-fg-muted">
                <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-primary" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="stage-card flex items-start gap-3 p-6">
        <Target size={20} className="mt-0.5 flex-none text-primary" />
        <p className="text-body text-fg-muted">{pilotExpectation}</p>
      </section>
    </SectionShell>
  );
}
