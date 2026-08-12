"use client";

import { motion } from "framer-motion";
import { GitBranch, PenLine, Compass, Target, Ban } from "lucide-react";
import type { RoteiroBrief, Task, Workflow } from "@/content/types";
import { ChannelBadge } from "./ChannelBadge";
import { CopyButton } from "@/components/ui/CopyButton";

const priorityColor: Record<string, string> = {
  Alta: "var(--danger)",
  Média: "var(--warning)",
  Baixa: "var(--fg-3)",
};

export function CadenceTimeline({ workflow }: { workflow: Workflow }) {
  return (
    <ol className="relative flex flex-col gap-3 pl-8">
      {/* linha vertical */}
      <span className="absolute left-[11px] top-2 bottom-2 w-px bg-border" aria-hidden />
      {workflow.tasks.map((task, i) => (
        <TaskCard key={task.id} task={task} index={i} />
      ))}
    </ol>
  );
}

function TaskCard({ task, index }: { task: Task; index: number }) {
  return (
    <motion.li
      id={task.id}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.03, 0.25) }}
      className="relative scroll-mt-24"
    >
      {/* nó */}
      <span
        className="absolute -left-8 top-4 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-surface"
        aria-hidden
      >
        <span className="mono text-[9px] font-semibold text-fg-muted">{task.day}</span>
      </span>

      <div className="surface-card p-4">
        <div className="flex flex-wrap items-center gap-2">
          <ChannelBadge channel={task.channel} />
          <span className="mono text-[12px] text-fg-muted">{task.id}</span>
          {task.priority ? (
            <span className="chip text-[11px]" style={{ background: "var(--neutral-100)", color: priorityColor[task.priority] }}>
              {task.priority}
            </span>
          ) : null}
        </div>

        <p className="mt-2 text-body-sm text-fg">{task.action}</p>

        {task.branch ? (
          <div className="mt-2 flex items-start gap-2 rounded-m bg-bg-soft px-3 py-2 text-[13px] text-fg-muted">
            <GitBranch size={14} className="mt-0.5 flex-none text-primary" />
            <span>{task.branch}</span>
          </div>
        ) : null}

        {task.brief ? <BriefCard brief={task.brief} /> : null}

        {task.script ? (
          <div className="mt-3 rounded-m border border-border bg-bg-soft">
            <div className="flex items-center justify-between border-b border-border px-3 py-1.5">
              <span className="eyebrow text-[10px]">Nota operacional</span>
              <CopyButton text={task.script} label="Copiar nota" />
            </div>
            <pre className="mono whitespace-pre-wrap px-3 py-2.5 text-[13px] leading-relaxed text-fg">{task.script}</pre>
          </div>
        ) : null}
      </div>
    </motion.li>
  );
}

/** Ficha diretiva: entrega a direção do toque, nunca a frase pronta. */
function BriefCard({ brief }: { brief: RoteiroBrief }) {
  const isBant = brief.tipo === "bant";
  const isLigacao = brief.tipo === "ligacao";
  const heading = isBant ? "Como conduzir" : "Como escrever este toque";
  const HeadIcon = isBant ? Compass : PenLine;
  const estruturaLabel = isLigacao ? "Como conduzir" : "Como estruturar";

  // Checklist copiável: os ingredientes obrigatórios e a personalização.
  const checklist = [
    ...(brief.conteudo ?? []),
    ...(brief.perguntaGancho ? [brief.perguntaGancho] : []),
    ...(brief.comoAgir ? [brief.comoAgir] : []),
    ...(brief.personalizacao ? [`Personalização: ${brief.personalizacao}`] : []),
  ]
    .map((i) => `- ${i}`)
    .join("\n");

  return (
    <div className="mt-3 rounded-m border border-border bg-bg-soft">
      <div className="flex items-center justify-between border-b border-border px-3 py-1.5">
        <span className="flex items-center gap-1.5 eyebrow text-[10px]">
          <HeadIcon size={12} className="text-primary" /> {heading}
        </span>
        {checklist ? <CopyButton text={checklist} label="Copiar checklist" /> : null}
      </div>

      <div className="flex flex-col gap-3 px-3 py-3">
        {brief.objetivo ? <Field label="Objetivo do toque" value={brief.objetivo} /> : null}
        {brief.assunto ? <Field label="Assunto (o que provocar)" value={brief.assunto} /> : null}
        {brief.conteudo?.length ? <ListField label="O que a mensagem precisa conter" items={brief.conteudo} /> : null}
        {brief.perguntaGancho ? <Field label="Pergunta-gancho" value={brief.perguntaGancho} /> : null}
        {brief.comoAgir ? <Field label="Como ler e agir" value={brief.comoAgir} /> : null}
        {brief.estrutura ? <Field label={estruturaLabel} value={brief.estrutura} /> : null}
        {brief.personalizacao ? (
          <Field label="Personalização inegociável" value={brief.personalizacao} accent="primary" icon={<Target size={13} />} />
        ) : null}
        {brief.extensaoTom ? <Field label="Extensão e tom" value={brief.extensaoTom} /> : null}
        {brief.evite?.length ? <ListField label="Evite" items={brief.evite} tone="danger" icon={<Ban size={13} />} /> : null}
        {brief.registro ? (
          <Field label="Registro no HubSpot" value={brief.registro} accent="primary" />
        ) : null}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  accent,
  icon,
}: {
  label: string;
  value: string;
  accent?: "primary";
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="flex items-center gap-1 eyebrow text-[10px]" style={accent === "primary" ? { color: "var(--primary)" } : undefined}>
        {icon} {label}
      </span>
      <span className="text-[13px] leading-relaxed text-fg">{value}</span>
    </div>
  );
}

function ListField({
  label,
  items,
  tone,
  icon,
}: {
  label: string;
  items: string[];
  tone?: "danger";
  icon?: React.ReactNode;
}) {
  const dot = tone === "danger" ? "var(--danger)" : "var(--primary)";
  return (
    <div className="flex flex-col gap-1">
      <span className="flex items-center gap-1 eyebrow text-[10px]" style={tone === "danger" ? { color: "var(--danger)" } : undefined}>
        {icon} {label}
      </span>
      <ul className="flex flex-col gap-1">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-2 text-[13px] leading-relaxed text-fg">
            <span className="mt-1.5 h-1 w-1 flex-none rounded-full" style={{ background: dot }} />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
