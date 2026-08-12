"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Megaphone, ArrowDown } from "lucide-react";
import type { BandKind } from "@/content/types";
import { kindMeta } from "@/components/ui/BandBadge";
import { Icon } from "@/components/ui/Icon";

interface JourneyState {
  id: string;
  phase: "Tier 2" | "Movimento" | "Tier 1" | "Saída";
  title: string;
  kind: BandKind;
  band?: string;
  workflowId?: string;
  owner: string;
  sla?: string;
  transition?: string; // gatilho para o próximo
  note?: string;
}

const states: JourneyState[] = [
  { id: "t2-nutri", phase: "Tier 2", title: "Nutrição", kind: "nurture", band: "0-39", workflowId: "T2-0", owner: "Marketing", transition: "Cruza 40" },
  { id: "t2-recon", phase: "Tier 2", title: "Reconexão leve", kind: "warm", band: "40-59", workflowId: "T2-1", owner: "Executivo", transition: "Cruza 60" },
  { id: "t2-obs", phase: "Tier 2", title: "Observação e valor", kind: "attention", band: "60-74", workflowId: "T2-2", owner: "Executivo + Marketing", transition: "Cruza 75" },
  { id: "t2-gatilho", phase: "Tier 2", title: "Gatilho de reunião", kind: "trigger", band: "75-100", workflowId: "T2-3", owner: "Executivo", sla: "24h", transition: "Reunião com aderência" },
  { id: "mov-promo", phase: "Movimento", title: "Promoção T2 → T1", kind: "attention", workflowId: "MOV-PROMO", owner: "Executivo + RevOps", transition: "Deal criado, Opportunity" },
  { id: "t1-ativa", phase: "Tier 1", title: "Ativação do comitê", kind: "attention", band: "60-79", workflowId: "T1-1", owner: "Marketing + Executivo", transition: "Cruza 80", note: "Se cair abaixo de 60, entra em Reengajamento (T1-2), ainda no Tier 1." },
  { id: "t1-bant", phase: "Tier 1", title: "Fechamento BANT", kind: "trigger", band: "80-100", workflowId: "T1-3", owner: "Executivo", sla: "24h", transition: "Deal fecha" },
  { id: "saida", phase: "Saída", title: "Saída do Tier 1", kind: "nurture", workflowId: "MOV-SAIDA", owner: "Automação", note: "Closed Won vira Customer. Closed Lost mantém Target Account. Nunca volta para Tier 2." },
];

export function AccountJourney() {
  const [selected, setSelected] = useState<string>(states[0].id);
  const activeState = states.find((s) => s.id === selected) ?? states[0];

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_320px]">
        {/* Fluxo de estados (clicável) */}
        <ol className="relative flex flex-col gap-2">
          {states.map((s) => {
            const isSelected = s.id === selected;
            return (
              <li key={s.id}>
                <button
                  onClick={() => setSelected(s.id)}
                  className={[
                    "flex w-full items-center gap-3 rounded-l border p-3 text-left transition-all",
                    isSelected ? "border-primary bg-surface shadow-2" : "border-border bg-surface hover:border-border-strong",
                  ].join(" ")}
                >
                  <span
                    className="flex h-9 w-9 flex-none items-center justify-center rounded-full"
                    style={{ background: kindMeta[s.kind].bg, color: kindMeta[s.kind].color }}
                  >
                    <Icon name={kindMeta[s.kind].icon} size={16} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <span className="chip chip-gray text-[10px]">{s.phase}</span>
                      <span className="font-medium text-fg">{s.title}</span>
                    </span>
                    {s.band ? <span className="mono text-[12px] text-fg-muted">Score {s.band}</span> : null}
                  </span>
                  {s.sla ? (
                    <span className="chip text-[11px] flex-none" style={{ background: "rgba(255,68,0,0.1)", color: "var(--danger)" }}>
                      SLA {s.sla}
                    </span>
                  ) : null}
                </button>

                {s.transition ? (
                  <div className="flex items-center gap-2 py-1 pl-6 text-[12px] text-fg-muted">
                    <ArrowDown size={13} className="text-fg-hint" />
                    <span className="rounded-pill bg-bg-stage px-2 py-0.5">{s.transition}</span>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ol>

        {/* Detalhe do estado */}
        <div className="lg:sticky lg:top-6 lg:self-start">
          <motion.div
            key={activeState.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="surface-card p-5"
          >
            <span className="chip chip-gray text-[11px]">{activeState.phase}</span>
            <h3 className="mt-2 font-display text-h3 font-semibold" style={{ color: kindMeta[activeState.kind].color }}>
              {activeState.title}
            </h3>
            <dl className="mt-3 flex flex-col gap-2 text-body-sm">
              {activeState.band ? <Field label="Banda" value={`Score ${activeState.band}`} /> : null}
              <Field label="Dono" value={activeState.owner} />
              {activeState.sla ? <Field label="SLA" value={activeState.sla} /> : null}
              {activeState.transition ? <Field label="Gatilho de saída" value={activeState.transition} /> : null}
            </dl>
            {activeState.note ? (
              <p className="mt-3 rounded-m bg-bg-soft px-3 py-2 text-[13px] text-fg-muted">{activeState.note}</p>
            ) : null}
            {activeState.workflowId ? (
              <Link href={`/abm/esteiras/${activeState.workflowId}`} className="btn btn-sm btn-secondary mt-4 w-full justify-center">
                Ver esteira <ArrowRight size={15} />
              </Link>
            ) : null}
          </motion.div>
        </div>
      </div>

      <div className="flex items-start gap-3 rounded-m border border-border bg-bg-soft px-4 py-3 text-body-sm text-fg-muted">
        <Megaphone size={16} className="mt-0.5 flex-none" style={{ color: "var(--bm-purple)" }} />
        <span>
          <strong className="text-fg">Marketing sustenta o comitê em todas as etapas.</strong> Os anúncios seguem
          presentes com frequência e segmentação por baixo de toda a jornada, do primeiro toque ao fechamento. O
          Tier 1 nunca volta para Tier 2: o score move entre bandas, a saída só acontece no fechamento do deal.
        </span>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-fg-muted">{label}</dt>
      <dd className="text-right font-medium text-fg">{value}</dd>
    </div>
  );
}
