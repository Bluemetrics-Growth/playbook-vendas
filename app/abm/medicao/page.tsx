import { PageHeader } from "@/components/ui/PageHeader";
import { SectionShell } from "@/components/abm/SectionShell";
import { MeasurementDashboard } from "@/components/abm/MeasurementDashboard";
import { measureShift, resultMetrics, progressMetrics, mqa, threeRs, kpiContract } from "@/content/abm/measurement";
import { ArrowRight, X, Check } from "lucide-react";

export const metadata = { title: "Medição" };

export default function MedicaoPage() {
  return (
    <SectionShell slug="medicao">
      <PageHeader
        eyebrow="ABM · Medição"
        title="Instalar a régua certa"
        intro="Aposentar o MQL. Medir por conta e pipeline. A MQA substitui o MQL, disparada pelos gatilhos de banda dos dois scores."
      />

      {/* Antes x depois */}
      <section className="mb-10">
        <h2 className="mb-4 font-display text-h3 font-semibold">Deixar de medir x passar a medir</h2>
        <div className="overflow-hidden rounded-l border border-border">
          <div className="grid grid-cols-2 border-b border-border bg-bg-soft text-body-sm font-semibold">
            <div className="flex items-center gap-2 px-4 py-3 text-fg-muted"><X size={15} className="text-danger" /> Deixar de medir</div>
            <div className="flex items-center gap-2 border-l border-border px-4 py-3 text-fg"><Check size={15} className="text-success" /> Passar a medir</div>
          </div>
          {measureShift.map((row) => (
            <div key={row.stop} className="grid grid-cols-2 border-b border-border text-body-sm last:border-0">
              <div className="px-4 py-3 text-fg-muted line-through decoration-danger/40">{row.stop}</div>
              <div className="border-l border-border px-4 py-3 text-fg">{row.start}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Dashboard ilustrativo */}
      <section className="mb-10">
        <h2 className="mb-4 font-display text-h3 font-semibold">Como um painel ABM se pareceria</h2>
        <MeasurementDashboard />
      </section>

      {/* MQA + métricas */}
      <section className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="surface-card p-5">
          <h3 className="font-display text-h4 font-semibold">{mqa.title}</h3>
          <p className="mt-2 text-body-sm text-fg-muted">{mqa.body}</p>
          <div className="mt-4 flex gap-2">
            {threeRs.map((r) => (
              <span key={r} className="chip chip-blue">{r}</span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="surface-card p-5">
            <span className="eyebrow">Métricas de resultado</span>
            <ul className="mt-2 flex flex-col gap-1.5">
              {resultMetrics.map((m) => (
                <li key={m.label} className="text-body-sm text-fg">
                  {m.label}{m.detail ? <span className="text-fg-hint"> · {m.detail}</span> : null}
                </li>
              ))}
            </ul>
          </div>
          <div className="surface-card p-5">
            <span className="eyebrow">Métricas de progresso</span>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {progressMetrics.map((m) => (
                <li key={m.label} className="chip chip-gray text-[12px]">{m.label}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* KPI Contract */}
      <section>
        <h2 className="mb-4 font-display text-h3 font-semibold">KPI Contract</h2>
        <div className="surface-card overflow-hidden">
          <div className="flex items-center justify-between border-b border-border bg-bg-soft px-5 py-3">
            <span className="font-medium text-fg">Uma página, co-assinada por marketing e vendas</span>
            <ArrowRight size={16} className="text-fg-hint" />
          </div>
          <ol className="divide-y divide-border">
            {kpiContract.map((k, i) => (
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
