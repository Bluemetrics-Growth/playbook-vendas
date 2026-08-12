import Link from "next/link";
import { ArrowRight, Check, X, AlertTriangle, HelpCircle } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { kindMeta } from "@/components/ui/BandBadge";
import {
  readingSignals,
  readingTable,
  t20Example,
  t20Checkpoints,
  readingMistakes,
  validationQuestions,
  simuladorCopy,
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

/** Seção 2 — Os 3 sinais que importam. */
export function ThreeSignals() {
  return (
    <section className="mt-12">
      <SectionTitle
        kicker="Os 3 sinais"
        title="O que você lê antes de decidir"
        intro="O score não decide sozinho. A decisão nasce da combinação de três sinais, todos propriedades reais da conta no HubSpot."
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {readingSignals.map((s) => (
          <div key={s.id} className="surface-card flex flex-col gap-2 p-5">
            <span className="flex h-9 w-9 items-center justify-center rounded-s bg-primary-soft text-primary">
              <Icon name={s.icon} size={18} />
            </span>
            <span className="font-display text-h4 font-semibold text-fg">{s.label}</span>
            <span className="text-body-sm font-medium text-primary">{s.question}</span>
            <span className="text-body-sm text-fg-muted">{s.detail}</span>
            <span className="mono mt-1 text-[12px] text-fg-hint">{s.property}</span>
          </div>
        ))}
      </div>
      <p className="mt-4 max-w-text text-body-sm text-fg-muted">{simuladorCopy.consequence}</p>
    </section>
  );
}

/** Seção 3 — Como interpretar a combinação. */
export function ReadingTable() {
  return (
    <section className="mt-12">
      <SectionTitle
        kicker="Como interpretar"
        title="Da leitura à ação"
        intro="Quatro cenários objetivos de permanência e saída. A situação combina os três sinais; a ação é o que o roteador e a cadência esperam."
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
          Onde o próximo destino ainda não está validado em automação, o playbook usa linguagem neutra:
          a conta segue para nova avaliação no roteador ou passa a outra lógica operacional. Não se
          promete um destino automático sem validação.
        </span>
      </p>
    </section>
  );
}

/** Seção 4 — Exemplo real: T2-0. */
export function T20Example() {
  return (
    <section className="mt-12">
      <SectionTitle
        kicker="Exemplo real"
        title="A esteira T2-0 na prática"
        intro={t20Example.copy}
      />
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

/** Seção 5 — O que acontece com o tempo (checkpoints). */
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

/** Seção 6 — Erros comuns de leitura. */
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

/** Seção 7 — Checkpoint final (validação operacional). */
export function ValidationCheckpoint() {
  return (
    <section className="mt-12">
      <SectionTitle
        kicker="Checkpoint final"
        title="Cinco perguntas para fechar a leitura"
        intro="Se você consegue responder às cinco, transformou score em decisão. É esse o papel do operador: ler a combinação de sinais e saber a próxima ação."
      />
      <ol className="flex flex-col gap-2">
        {validationQuestions.map((q, i) => (
          <li key={q} className="surface-card flex items-center gap-3 p-4">
            <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-primary font-display text-[13px] font-semibold text-white">
              {i + 1}
            </span>
            <span className="text-body-sm text-fg">{q}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
