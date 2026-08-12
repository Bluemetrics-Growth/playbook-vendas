import Link from "next/link";
import { ArrowRight, Check, X, AlertTriangle, HelpCircle } from "lucide-react";
import { kindMeta } from "@/components/ui/BandBadge";
import {
  readingTable,
  t20Example,
  t20Checkpoints,
  readingMistakes,
  checkpointsCopy,
} from "@/content/abm/simulador";

function SectionTitle({ kicker, title, intro }: { kicker: string; title: string; intro?: string }) {
  return (
    <div className="mb-4 flex flex-col gap-1">
      <span className="eyebrow">{kicker}</span>
      <h2 className="font-display text-h3 font-semibold tracking-tight">{title}</h2>
      {intro ? <p className="max-w-text text-body-sm text-fg-muted">{intro}</p> : null}
    </div>
  );
}

/** Como interpretar a combinação. */
export function ReadingTable() {
  return (
    <section className="mt-12">
      <SectionTitle
        kicker="Da leitura à ação"
        title="Quatro cenários, quatro desfechos"
        intro="A situação combina os três sinais. A leitura diz o que ela significa. A ação é o que o roteador e a cadência esperam."
      />
      <div className="flex flex-col gap-3">
        {readingTable.map((r, i) => {
          const color = kindMeta[r.kind].color;
          return (
            <div
              key={i}
              className="surface-card grid grid-cols-1 gap-3 p-4 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1.4fr)] sm:items-center"
              style={{ borderLeft: `3px solid ${color}` }}
            >
              <div>
                <span className="eyebrow text-[10px]">Situação</span>
                <p className="mono mt-0.5 text-[13px] text-fg">{r.situation}</p>
              </div>
              <div>
                <span className="eyebrow text-[10px]">Leitura</span>
                <p className="mt-0.5 text-body-sm font-medium" style={{ color }}>
                  {r.reading}
                </p>
              </div>
              <div>
                <span className="eyebrow text-[10px]">Ação esperada</span>
                <p className="mt-0.5 text-body-sm text-fg-muted">{r.action}</p>
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-4 flex items-start gap-2 rounded-m border border-border bg-bg-soft px-4 py-3 text-[13px] text-fg-muted">
        <HelpCircle size={16} className="mt-0.5 flex-none text-primary" />
        <span>
          Onde o próximo destino ainda não está fechado em automação, usamos linguagem neutra: a conta segue
          para nova avaliação no roteador ou passa a outra lógica. Não prometemos um destino automático sem
          validação.
        </span>
      </p>
    </section>
  );
}

/** Exemplo real: T2-0. */
export function T20Example() {
  return (
    <section className="mt-12">
      <SectionTitle kicker="Exemplo real" title="A esteira T2-0 na prática" intro={t20Example.copy} />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Permanência */}
        <div className="surface-card flex flex-col gap-3 p-5" style={{ borderTop: "3px solid var(--band-nurture)" }}>
          <span className="font-display text-h4 font-semibold text-fg">{t20Example.stay.title}</span>
          <ul className="flex flex-col gap-2">
            {t20Example.stay.conditions.map((c) => (
              <li key={c} className="flex items-start gap-2 text-body-sm text-fg">
                <Check size={16} className="mt-0.5 flex-none text-primary" />
                <span className="mono text-[13px]">{c}</span>
              </li>
            ))}
          </ul>
          <p className="text-[13px] text-fg-hint">{t20Example.stay.note}</p>
        </div>

        {/* Saída */}
        <div className="surface-card flex flex-col gap-3 p-5" style={{ borderTop: "3px solid var(--band-trigger)" }}>
          <span className="font-display text-h4 font-semibold text-fg">{t20Example.leave.title}</span>
          <ul className="flex flex-col gap-2">
            {t20Example.leave.conditions.map((c) => (
              <li key={c} className="flex items-start gap-2 text-body-sm text-fg">
                <X size={16} className="mt-0.5 flex-none" style={{ color: "var(--danger)" }} />
                <span className="text-[13px]">{c}</span>
              </li>
            ))}
          </ul>
          <p className="text-[13px] text-fg-hint">{t20Example.leave.note}</p>
        </div>
      </div>

      <Link
        href={`/abm/esteiras/${t20Example.workflowId}`}
        className="mt-4 inline-flex items-center gap-2 text-body-sm font-medium text-primary hover:underline"
      >
        Ver a esteira T2-0 completa <ArrowRight size={15} />
      </Link>
    </section>
  );
}

/** O que acontece com o tempo (checkpoints). */
export function Checkpoints() {
  return (
    <section className="mt-12">
      <SectionTitle
        kicker="Com o tempo"
        title="Checkpoints de 30, 60 e 90 dias úteis"
        intro={checkpointsCopy}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {t20Checkpoints.map((c) => (
          <div key={c.day} className="stage-card flex flex-col gap-1 p-5">
            <span className="mono text-[12px] text-primary">{c.day}</span>
            <span className="font-display text-h4 font-semibold text-fg">{c.title}</span>
            <span className="text-body-sm text-fg-muted">{c.detail}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/** Erros comuns de leitura. */
export function ReadingMistakes() {
  return (
    <section className="mt-12">
      <SectionTitle kicker="Erros comuns" title="O que trava uma leitura correta" />
      <ul className="flex flex-col gap-2">
        {readingMistakes.map((m) => (
          <li
            key={m}
            className="flex items-start gap-3 rounded-m border border-border bg-bg-soft px-4 py-3 text-body-sm text-fg"
          >
            <AlertTriangle size={16} className="mt-0.5 flex-none" style={{ color: "var(--warning)" }} />
            <span>{m}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
