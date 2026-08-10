"use client";

import { motion } from "framer-motion";
import { GitBranch } from "lucide-react";
import type { Task, Workflow } from "@/content/types";
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

        {task.script ? (
          <div className="mt-3 rounded-m border border-border bg-bg-soft">
            <div className="flex items-center justify-between border-b border-border px-3 py-1.5">
              <span className="eyebrow text-[10px]">Roteiro</span>
              <CopyButton text={task.script} label="Copiar roteiro" />
            </div>
            <pre className="mono whitespace-pre-wrap px-3 py-2.5 text-[13px] leading-relaxed text-fg">{task.script}</pre>
          </div>
        ) : null}
      </div>
    </motion.li>
  );
}
