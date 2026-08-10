"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Minus, Plus, ArrowRight, Info } from "lucide-react";
import type { Score, ScoreBand } from "@/content/types";
import { scoreAbordagem, scorePrioridade, tier1Preset } from "@/content/abm/scores";
import { workflowsById } from "@/content/abm/workflows";
import { bandFor, computeScore, type Selection, type ScoreResult } from "@/lib/score";
import { CopyButton } from "@/components/ui/CopyButton";
import { BandBadge, kindMeta } from "@/components/ui/BandBadge";

type Tab = "abordagem" | "prioridade";

export function ScoreSimulator({ initialTab = "abordagem" }: { initialTab?: Tab }) {
  const [tab, setTab] = useState<Tab>(initialTab);
  return (
    <div className="flex flex-col gap-6">
      <div role="tablist" aria-label="Calculadoras de score" className="inline-flex w-fit items-center gap-1 rounded-pill bg-bg-stage p-1">
        <TabButton active={tab === "abordagem"} onClick={() => setTab("abordagem")}>
          Score de Abordagem <span className="opacity-60">· Tier 2</span>
        </TabButton>
        <TabButton active={tab === "prioridade"} onClick={() => setTab("prioridade")}>
          Score de Prioridade <span className="opacity-60">· Tier 1</span>
        </TabButton>
      </div>

      {tab === "abordagem" ? (
        <Calculator key="abordagem" score={scoreAbordagem} kind="abordagem" />
      ) : (
        <Calculator key="prioridade" score={scorePrioridade} kind="prioridade" />
      )}
    </div>
  );
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={[
        "rounded-pill px-4 py-2 text-body-sm font-medium transition-all",
        active ? "bg-surface text-fg shadow-1" : "text-fg-muted hover:text-fg",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function Calculator({ score, kind }: { score: Score; kind: Tab }) {
  const [selection, setSelection] = useState<Selection>({});
  const [inactivity, setInactivity] = useState(0); // Tier 1
  const [decay, setDecay] = useState(false); // Tier 2

  const base = useMemo(() => computeScore(score, selection, kind === "prioridade" ? inactivity : 0), [score, selection, inactivity, kind]);

  // Tier 2: aplica o decaimento -10 opcional sobre o resultado.
  const result: ScoreResult = useMemo(() => {
    if (kind === "abordagem" && decay && score.decay) {
      const penalty = score.decay.points;
      const total = Math.max(0, Math.min(100, base.positive + penalty));
      return { ...base, penalty, total, band: bandFor(score, total) };
    }
    return base;
  }, [base, decay, kind, score]);

  function toggle(id: string) {
    setSelection((s) => ({ ...s, [id]: !s[id] }));
  }
  function setExclusive(catIncrements: string[], id: string) {
    setSelection((s) => {
      const next = { ...s };
      for (const inc of catIncrements) next[inc] = false;
      next[id] = !s[id];
      return next;
    });
  }
  function setCount(id: string, value: number, max: number) {
    setSelection((s) => ({ ...s, [id]: Math.max(0, Math.min(max, value)) }));
  }
  function reset() {
    setSelection({});
    setInactivity(0);
    setDecay(false);
  }
  function applyPreset() {
    setSelection({ ...tier1Preset.selected });
    setInactivity(tier1Preset.inactivityDays);
  }

  const workflow = result.band.workflowId ? workflowsById[result.band.workflowId] : undefined;
  const summary = `Score ${result.total} · banda ${result.band.label}${workflow ? ` · workflow ${workflow.name}` : ""}${result.band.sla ? ` · SLA ${result.band.sla}` : ""}`;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
      {/* Inputs */}
      <div className="flex flex-col gap-4">
        {kind === "prioridade" ? (
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={applyPreset} className="btn btn-sm btn-secondary">
              Preset: {tier1Preset.label}
            </button>
            <button onClick={reset} className="btn btn-sm btn-ghost">Limpar</button>
          </div>
        ) : (
          <div className="flex justify-end">
            <button onClick={reset} className="btn btn-sm btn-ghost">Limpar</button>
          </div>
        )}

        {score.categories.map((cat) => {
          const catResult = result.categories.find((c) => c.id === cat.id)!;
          const incIds = cat.increments.map((i) => i.id);
          return (
            <div key={cat.id} className="surface-card p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-h4 font-semibold">{cat.name}</h3>
                  {cat.exclusive ? <span className="chip chip-gray text-[11px]">escolha 1</span> : null}
                </div>
                <span className="mono text-body-sm text-fg-muted">
                  {catResult.value}<span className="opacity-50">/{cat.cap}</span>
                </span>
              </div>

              {/* Barra por categoria */}
              <div className="mb-3 h-1.5 w-full overflow-hidden rounded-pill bg-bg-stage">
                <div
                  className="h-full rounded-pill transition-[width] duration-300 ease-out"
                  style={{ width: `${(catResult.value / cat.cap) * 100}%`, background: kindMeta[result.band.kind].color }}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                {cat.increments.map((inc) => {
                  if (inc.repeatable) {
                    const count = typeof selection[inc.id] === "number" ? (selection[inc.id] as number) : 0;
                    const max = inc.maxCount ?? 6;
                    return (
                      <div key={inc.id} className="flex items-center justify-between gap-3 rounded-m px-2 py-2">
                        <span className="flex-1 text-body-sm">
                          {inc.event} <span className="mono text-fg-muted">+{inc.points}/{inc.unitLabel}</span>
                        </span>
                        <div className="flex items-center gap-2">
                          <button aria-label="menos" onClick={() => setCount(inc.id, count - 1, max)} className="flex h-7 w-7 items-center justify-center rounded-s border border-border hover:bg-bg-stage"><Minus size={14} /></button>
                          <span className="mono w-6 text-center text-body-sm">{count}</span>
                          <button aria-label="mais" onClick={() => setCount(inc.id, count + 1, max)} className="flex h-7 w-7 items-center justify-center rounded-s border border-border hover:bg-bg-stage"><Plus size={14} /></button>
                        </div>
                      </div>
                    );
                  }
                  const checked = !!selection[inc.id];
                  return (
                    <label
                      key={inc.id}
                      className={[
                        "flex cursor-pointer items-start gap-3 rounded-m px-2 py-2 transition-colors",
                        checked ? "bg-primary-soft" : "hover:bg-bg-stage",
                      ].join(" ")}
                    >
                      <input
                        type={cat.exclusive ? "radio" : "checkbox"}
                        name={cat.exclusive ? cat.id : inc.id}
                        checked={checked}
                        onChange={() => (cat.exclusive ? setExclusive(incIds, inc.id) : toggle(inc.id))}
                        className="mt-0.5 h-4 w-4 flex-none accent-[color:var(--bm-blue)]"
                      />
                      <span className="flex-1 text-body-sm leading-snug">
                        {inc.event}{" "}
                        <span className="mono text-fg-muted">+{inc.points}</span>
                        {inc.note ? <span className="block text-[12px] text-fg-hint">{inc.note}</span> : null}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Modificadores */}
        {kind === "prioridade" ? (
          <div className="surface-card p-4">
            <div className="mb-1 flex items-center justify-between">
              <h3 className="font-display text-h4 font-semibold">Penalidade por inatividade</h3>
              <span className="mono text-body-sm" style={{ color: result.penalty < 0 ? "var(--danger)" : "var(--fg-2)" }}>
                {result.penalty} pts
              </span>
            </div>
            <p className="mb-3 text-[12px] text-fg-hint">
              Dias sem atividade registrada no Contato associado. Zera com nova atividade.
            </p>
            <input
              type="range"
              min={0}
              max={35}
              value={inactivity}
              onChange={(e) => setInactivity(Number(e.target.value))}
              className="w-full accent-[color:var(--bm-orange)]"
              aria-label="Dias sem atividade"
            />
            <div className="mt-1 flex items-center justify-between text-body-sm">
              <span className="mono">{inactivity} dias</span>
              <span className="text-fg-muted">{penaltyLabel(inactivity)}</span>
            </div>
          </div>
        ) : (
          <div className="surface-card flex items-center justify-between gap-3 p-4">
            <div>
              <h3 className="font-display text-h4 font-semibold">Decaimento</h3>
              <p className="text-[12px] text-fg-hint">Sem nenhum sinal por 21 a 30 dias, perde 10 pontos.</p>
            </div>
            <button
              role="switch"
              aria-checked={decay}
              onClick={() => setDecay((d) => !d)}
              className="relative h-7 w-12 flex-none rounded-pill transition-colors"
              style={{ background: decay ? "var(--bm-orange)" : "var(--neutral-300)" }}
            >
              <span
                className="absolute top-1 h-5 w-5 rounded-full bg-white shadow-1 transition-[left]"
                style={{ left: decay ? 24 : 4 }}
              />
            </button>
          </div>
        )}
      </div>

      {/* Painel de resultado (sticky) */}
      <div className="lg:sticky lg:top-6 lg:self-start">
        <ResultPanel result={result} score={score} workflow={workflow ? { id: workflow.id, name: workflow.name } : undefined} summary={summary} />
      </div>
    </div>
  );
}

function ResultPanel({
  result,
  score,
  workflow,
  summary,
}: {
  result: ScoreResult;
  score: Score;
  workflow?: { id: string; name: string };
  summary: string;
}) {
  const color = kindMeta[result.band.kind].color;
  return (
    <div className="surface-card overflow-hidden">
      <div className="flex flex-col items-center gap-2 p-6" style={{ background: "var(--bg-soft)" }}>
        <span className="eyebrow">{score.title}</span>
        <motion.span
          key={result.total}
          initial={{ scale: 0.9, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="font-display text-[64px] font-semibold leading-none tracking-tight"
          style={{ color }}
        >
          {result.total}
        </motion.span>
        <BandBadge kind={result.band.kind} label={result.band.label} range={`${result.band.min}-${result.band.max}`} />
        {result.penalty !== 0 ? (
          <span className="mono text-[12px] text-fg-muted">
            {result.positive} positivo {result.penalty} penalidade
          </span>
        ) : null}
      </div>

      {/* Segmentos das bandas */}
      <div className="flex gap-1 px-6 pt-4">
        {score.bands.map((b) => {
          const active = b.min === result.band.min;
          return (
            <div key={b.label} className="flex-1" title={`${b.label} (${b.min}-${b.max})`}>
              <div
                className="h-1.5 rounded-pill transition-opacity"
                style={{ background: kindMeta[b.kind].color, opacity: active ? 1 : 0.25 }}
              />
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-3 p-6">
        {workflow ? (
          <Link
            href={`/abm/esteiras/${workflow.id}`}
            className="flex items-center gap-3 rounded-m border border-border p-3 transition-colors hover:border-border-strong hover:bg-bg-soft"
          >
            <span className="flex h-9 w-9 flex-none items-center justify-center rounded-s" style={{ background: `${color}22`, color }}>
              <ArrowRight size={16} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[12px] text-fg-muted">Dispara</span>
              <span className="mono block truncate text-[13px] text-fg">{workflow.name}</span>
            </span>
          </Link>
        ) : null}

        {result.band.sla ? (
          <div className="flex items-center gap-2 rounded-m bg-[rgba(255,68,0,0.08)] px-3 py-2 text-body-sm" style={{ color: "var(--danger)" }}>
            <Info size={15} /> SLA {result.band.sla}: agir sob sinal quente.
          </div>
        ) : null}

        <CopyButton text={summary} label="Copiar resumo" size="md" className="w-full justify-center" />
      </div>
    </div>
  );
}

function penaltyLabel(days: number): string {
  if (days <= 6) return "sem penalidade";
  if (days <= 13) return "-5 pts";
  if (days <= 20) return "-10 pts";
  if (days <= 29) return "-15 pts";
  return "-20 pts · revisar saúde do deal";
}
