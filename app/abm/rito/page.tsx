import { PageHeader } from "@/components/ui/PageHeader";
import { SectionShell } from "@/components/abm/SectionShell";
import { ritoIntro, ritoAgenda, ritoCadence } from "@/content/abm/rito";
import { Icon } from "@/components/ui/Icon";

export const metadata = { title: "Rito Semanal" };

export default function RitoPage() {
  return (
    <SectionShell slug="rito">
      <PageHeader eyebrow="ABM · Rito Semanal" title="Como revisamos e otimizamos" intro={ritoIntro} />

      {/* A pauta da semana */}
      <section className="mb-10">
        <h2 className="mb-4 font-display text-h3 font-semibold">A pauta da semana</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {ritoAgenda.map((b) => (
            <div key={b.id} className="surface-card flex items-start gap-3 p-5">
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-m bg-primary-soft text-primary">
                <Icon name={b.icon} size={20} />
              </span>
              <div>
                <h3 className="font-display text-h4 font-semibold">{b.title}</h3>
                <p className="mt-1 text-body-sm text-fg-muted">{b.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="rounded-m border border-border bg-bg-soft px-4 py-3 text-body-sm text-fg-muted">
        {ritoCadence}
      </div>
    </SectionShell>
  );
}
