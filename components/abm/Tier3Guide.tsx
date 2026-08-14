import Link from "next/link";
import {
  ArrowRight,
  RotateCcw,
  Globe,
  Route,
  ShieldCheck,
  CircleHelp,
  CheckCircle2,
  Ban,
} from "lucide-react";
import { BandBadge } from "@/components/ui/BandBadge";
import {
  tier3Overview,
  tier3Architecture,
  tier3Stages,
  tier3ContentRules,
  tier3Transitions,
  tier3Prereqs,
  tier3Guardrails,
  tier3Decisions,
  tier3Winback,
} from "@/content/abm/tier3";
import { tier3ScoreNote } from "@/content/abm/scores";
import { tier3RouterNote } from "@/content/abm/orchestration";

/**
 * Guia da seção Tier 3. Todo o conteúdo vem de content/abm/tier3.ts (dados
 * separados da UI). Renderiza visão geral, arquitetura lógica, esteiras,
 * regras de conteúdo, transições, guardrails e o bloco de decisões em aberto.
 */
export function Tier3Guide() {
  return (
    <div className="flex flex-col gap-12">
      {/* 15.1 Visão geral */}
      <Block eyebrow="Visão geral" icon={<Globe size={16} />} title="O que é o Tier 3">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {tier3Overview.map((p) => (
            <PointCard key={p.title} title={p.title} body={p.body} />
          ))}
        </div>
        <div className="surface-card mt-3 flex items-start gap-3 p-4">
          <span className="flex h-9 w-9 flex-none items-center justify-center rounded-m" style={{ background: "rgba(123,0,220,0.1)", color: "var(--bm-purple)" }}>
            <RotateCcw size={18} />
          </span>
          <p className="text-body-sm text-fg-muted">
            <strong className="text-fg">{tier3Winback.title}.</strong> {tier3Winback.body}
          </p>
        </div>
      </Block>

      {/* 15.2 Arquitetura lógica */}
      <Block eyebrow="Arquitetura lógica" icon={<Route size={16} />} title="Como o Tier 3 roteia a conta">
        {/* Score herdado */}
        <div className="surface-card mb-3 flex flex-col gap-2 p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-display text-h4 font-semibold">{tier3ScoreNote.title}</h3>
            <BandBadge kind="warm" label="bandas" range={tier3ScoreNote.bandsInherited} size="sm" />
          </div>
          <p className="text-body-sm text-fg-muted">{tier3ScoreNote.body}</p>
          <p className="rounded-m bg-bg-soft px-3 py-2 text-[13px] text-fg-muted">
            <strong className="text-fg">Atenção:</strong> {tier3ScoreNote.caveat}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {tier3Architecture.map((p) => (
            <PointCard key={p.title} title={p.title} body={p.body} />
          ))}
        </div>

        <div className="mt-3 flex items-start gap-3 rounded-m border border-primary/25 bg-primary-soft px-4 py-3 text-body-sm text-primary">
          <Route size={16} className="mt-0.5 flex-none" />
          <span>{tier3RouterNote}</span>
        </div>
      </Block>

      {/* 15.3 Esteiras */}
      <Block eyebrow="Esteiras do Tier 3" icon={<ArrowRight size={16} />} title="Cada esteira, ponta a ponta">
        <div className="flex flex-col gap-3">
          {tier3Stages.map((s) => (
            <div key={s.id} className="surface-card p-5">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <h3 className="font-display text-h4 font-semibold">{s.name}</h3>
                {s.band && s.bandKind ? <BandBadge kind={s.bandKind} label={s.band} size="sm" /> : null}
                {s.workflowId ? (
                  <Link
                    href={`/abm/esteiras/${s.workflowId}`}
                    className="ml-auto inline-flex items-center gap-1.5 text-body-sm font-medium text-primary hover:underline"
                  >
                    Ver a esteira <ArrowRight size={14} />
                  </Link>
                ) : null}
              </div>
              <dl className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                <StageField label="Objetivo" value={s.objetivo} />
                <StageField label="Gatilho de entrada" value={s.gatilhoEntrada} />
                <StageField label="Condição de permanência" value={s.permanencia} />
                <StageField label="Condição de saída" value={s.saida} />
                <StageField label="Mensagens e canais" value={s.canais} />
                <StageField label="Próximo estado" value={s.proximoEstado} />
                <StageField label="Guardrails" value={s.guardrails} full />
              </dl>
            </div>
          ))}
        </div>
        <Link href="/abm/esteiras" className="btn btn-secondary btn-sm mt-4 w-fit">
          Abrir as esteiras no filtro Tier 3 <ArrowRight size={15} />
        </Link>
      </Block>

      {/* 15.4 Regras de conteúdo */}
      <Block eyebrow="Regras de conteúdo" icon={<CheckCircle2 size={16} />} title="Como falar com a conta fria">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {tier3ContentRules.map((r) => (
            <div key={r} className="flex items-start gap-2 rounded-m border border-border bg-surface px-3 py-2.5 text-body-sm text-fg">
              <CheckCircle2 size={16} className="mt-0.5 flex-none text-primary" />
              <span>{r}</span>
            </div>
          ))}
        </div>
      </Block>

      {/* 15.5 Transições e estados */}
      <Block eyebrow="Transições e estados" icon={<Route size={16} />} title="Quando a conta muda de estado">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {tier3Transitions.map((p) => (
            <PointCard key={p.title} title={p.title} body={p.body} />
          ))}
        </div>
        <div className="surface-card mt-3 p-5">
          <span className="eyebrow text-[11px]">Pré-requisitos de cada mudança</span>
          <ul className="mt-2 flex flex-col gap-2">
            {tier3Prereqs.map((p) => (
              <li key={p} className="flex items-start gap-2 text-body-sm text-fg">
                <span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-primary" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </Block>

      {/* 14 Guardrails */}
      <Block eyebrow="Guardrails obrigatórios" icon={<ShieldCheck size={16} />} title="O que o sistema protege">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {tier3Guardrails.map((p) => (
            <div key={p.title} className="surface-card flex items-start gap-3 p-4">
              <ShieldCheck size={18} className="mt-0.5 flex-none text-primary" />
              <div>
                <h3 className="font-medium text-fg">{p.title}</h3>
                <p className="mt-1 text-body-sm text-fg-muted">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Block>

      {/* 17 Decisões em aberto */}
      <Block eyebrow="Decisões em aberto" icon={<CircleHelp size={16} />} title="O que ainda não está fechado">
        <p className="mb-3 max-w-text text-body-sm text-fg-muted">
          Estas questões não devem ser tratadas como encerradas. O playbook usa a estrutura acordada como referência e
          sinaliza onde uma regra depende de validação, sem transformar hipótese em regra fechada.
        </p>
        <ul className="flex flex-col gap-3">
          {tier3Decisions.map((d) => {
            const pending = d.status === "pendente";
            return (
              <li key={d.id} className="surface-card flex items-start gap-3 p-4">
                <span
                  className="flex h-8 w-8 flex-none items-center justify-center rounded-m"
                  style={
                    pending
                      ? { background: "rgba(255,68,0,0.12)", color: "var(--band-trigger)" }
                      : { background: "rgba(0,187,255,0.12)", color: "var(--band-warm)" }
                  }
                >
                  {pending ? <CircleHelp size={16} /> : <CheckCircle2 size={16} />}
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-medium text-fg">{d.title}</h3>
                    <span
                      className="chip text-[11px]"
                      style={
                        pending
                          ? { background: "rgba(255,68,0,0.12)", color: "var(--band-trigger)" }
                          : { background: "rgba(0,187,255,0.12)", color: "var(--band-warm)" }
                      }
                    >
                      {pending ? "pendente" : "confirmado"}
                    </span>
                  </div>
                  <p className="mt-1 text-body-sm text-fg-muted">{d.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </Block>

      {/* Nota editorial */}
      <div className="flex items-start gap-3 rounded-m border border-border bg-bg-soft px-4 py-3 text-body-sm text-fg-muted">
        <Ban size={16} className="mt-0.5 flex-none" style={{ color: "var(--danger)" }} />
        <span>
          <strong className="text-fg">Não inventar regra técnica não confirmada.</strong> Onde o PRD não fecha um
          número, um enum ou uma automação, o playbook mantém a referência operacional e sinaliza a pendência. A fonte
          da verdade permanece o HubSpot: onde divergir, prevalece o CRM.
        </span>
      </div>
    </div>
  );
}

function Block({
  eyebrow,
  title,
  icon,
  children,
}: {
  eyebrow: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <span className="flex items-center gap-1.5 eyebrow text-primary">{icon} {eyebrow}</span>
        <h2 className="font-display text-h3 font-semibold tracking-tight">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function PointCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="surface-card flex flex-col gap-1.5 p-4">
      <h3 className="font-medium text-fg">{title}</h3>
      <p className="text-body-sm text-fg-muted">{body}</p>
    </div>
  );
}

function StageField({ label, value, full }: { label: string; value: string; full?: boolean }) {
  return (
    <div className={full ? "sm:col-span-2" : undefined}>
      <dt className="eyebrow text-[10px]">{label}</dt>
      <dd className="mt-0.5 text-body-sm text-fg">{value}</dd>
    </div>
  );
}
