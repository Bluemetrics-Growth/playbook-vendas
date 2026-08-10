import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Zap } from "lucide-react";
import { workflows, workflowsById } from "@/content/abm/workflows";
import { CadenceTimeline } from "@/components/abm/CadenceTimeline";
import { CopyButton } from "@/components/ui/CopyButton";
import { BandBadge } from "@/components/ui/BandBadge";
import { SeenTracker } from "@/components/shell/SeenTracker";

export function generateStaticParams() {
  return workflows.map((w) => ({ id: w.id }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const w = workflowsById[params.id];
  return { title: w ? w.name.replace(/^\[ABM\]\[[^\]]+\]\s*/, "") : "Esteira" };
}

export default function EsteiraDetailPage({ params }: { params: { id: string } }) {
  const w = workflowsById[params.id];
  if (!w) notFound();

  return (
    <div>
      <SeenTracker slug="esteiras" />
      <Link href="/abm/esteiras" className="mb-4 inline-flex items-center gap-1.5 text-body-sm text-fg-muted hover:text-fg">
        <ArrowLeft size={15} /> Todas as esteiras
      </Link>

      <header className="mb-6 flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="chip chip-blue">{w.tier}</span>
          {w.band && w.bandKind ? <BandBadge kind={w.bandKind} label={w.band} /> : null}
          {w.isGate ? (
            <span className="chip" style={{ background: "var(--band-trigger)", color: "#fff" }}>
              <Zap size={13} /> GATILHO
            </span>
          ) : null}
          {w.sla ? <span className="chip" style={{ background: "rgba(255,68,0,0.1)", color: "var(--danger)" }}>SLA {w.sla}</span> : null}
        </div>

        <div>
          <span className="mono text-body-sm text-fg-muted">{w.id}</span>
          <h1 className="font-display text-display-m font-semibold tracking-tight">
            {w.name.replace(/^\[ABM\]\[[^\]]+\]\s*/, "").replace(/\s*·\s*Score.*$/, "")}
          </h1>
        </div>

        <p className="max-w-text text-body text-fg-muted">{w.summary}</p>

        {/* Nome do workflow copiável no padrão HubSpot */}
        <div className="flex flex-wrap items-center gap-3 rounded-m border border-border bg-bg-soft p-3">
          <span className="mono flex-1 text-[13px] text-fg">{w.name}</span>
          <CopyButton text={w.name} label="Copiar nome do workflow" />
        </div>

        {/* Metadados */}
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Meta label="Gatilho" value={w.trigger} />
          <Meta label="Dono" value={w.owner} />
          {w.lifecycleEnd ? <Meta label="Lifecycle no fim" value={w.lifecycleEnd} /> : null}
          {w.cancelWhen ? <Meta label="Cancelar quando" value={w.cancelWhen} /> : null}
        </dl>
      </header>

      <h2 className="mb-4 font-display text-h3 font-semibold">Sequência de tasks</h2>
      <CadenceTimeline workflow={w} />
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="surface-card p-3">
      <dt className="eyebrow text-[10px]">{label}</dt>
      <dd className="mt-0.5 text-body-sm text-fg">{value}</dd>
    </div>
  );
}
