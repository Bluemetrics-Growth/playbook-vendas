"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, X, RotateCcw, PartyPopper, ArrowLeft } from "lucide-react";
import { checkpoint } from "@/content/abm/quiz";

export function Checkpoint() {
  const [answers, setAnswers] = useState<Record<string, number>>({});

  function pick(qid: string, idx: number) {
    setAnswers((a) => (a[qid] !== undefined ? a : { ...a, [qid]: idx }));
  }
  function reset() {
    setAnswers({});
  }

  const answered = Object.keys(answers).length;
  const correct = checkpoint.filter((q) => answers[q.id] === q.answer).length;
  const allDone = answered === checkpoint.length;

  return (
    <div className="flex flex-col gap-5">
      <div className="surface-card flex items-center justify-between gap-4 p-4">
        <span className="text-body-sm text-fg-muted">
          Sem nota formal. É reforço dos pontos que mais confundem. Feedback imediato.
        </span>
        <span className="mono flex-none text-body-sm">{correct}/{checkpoint.length}</span>
      </div>

      {checkpoint.map((q, qi) => {
        const chosen = answers[q.id];
        const done = chosen !== undefined;
        return (
          <div key={q.id} className="surface-card p-5">
            <p className="mb-3 font-medium text-fg">
              <span className="mono mr-2 text-fg-muted">{qi + 1}.</span>
              {q.question}
            </p>
            <div className="flex flex-col gap-2">
              {q.options.map((opt, oi) => {
                const isAnswer = oi === q.answer;
                const isChosen = oi === chosen;
                let cls = "border-border hover:border-border-strong";
                if (done && isAnswer) cls = "border-success bg-[rgba(0,209,0,0.08)]";
                else if (done && isChosen && !isAnswer) cls = "border-danger bg-[rgba(255,68,0,0.06)]";
                return (
                  <button
                    key={oi}
                    onClick={() => pick(q.id, oi)}
                    disabled={done}
                    className={`flex items-center gap-3 rounded-m border p-3 text-left text-body-sm transition-colors disabled:cursor-default ${cls}`}
                  >
                    <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full border border-border text-[11px]">
                      {done && isAnswer ? <Check size={13} className="text-success" /> : done && isChosen ? <X size={13} className="text-danger" /> : String.fromCharCode(65 + oi)}
                    </span>
                    <span className="text-fg">{opt}</span>
                  </button>
                );
              })}
            </div>
            {done ? (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-3 overflow-hidden rounded-m bg-bg-soft px-3 py-2 text-[13px] text-fg-muted"
              >
                {q.explanation}
              </motion.p>
            ) : null}
          </div>
        );
      })}

      {allDone ? (
        <div className="surface-card flex flex-col items-center gap-3 p-6 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft text-primary">
            <PartyPopper size={24} />
          </span>
          <h3 className="font-display text-h3 font-semibold">Você acertou {correct} de {checkpoint.length}.</h3>
          <p className="max-w-narrow text-body-sm text-fg-muted">
            {correct === checkpoint.length
              ? "Modelo dominado. Agora é operar sob sinal e registrar tudo no HubSpot."
              : "Bom trabalho. Revise as seções dos pontos que escaparam e volte quando quiser."}
          </p>
          <div className="flex gap-2">
            <button onClick={reset} className="btn btn-tertiary"><RotateCcw size={15} /> Refazer</button>
            <Link href="/abm" className="btn btn-primary"><ArrowLeft size={15} /> Voltar ao ABM</Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
