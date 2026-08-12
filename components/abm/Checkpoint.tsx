"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, X, RotateCcw, PartyPopper, ArrowLeft, Play, Sparkles } from "lucide-react";
import type { QuizQuestion } from "@/content/types";
import { questionBank, quizConfig } from "@/content/abm/quiz";

interface DrawnQuestion extends QuizQuestion {
  order: number[]; // ordem embaralhada das opções (índices originais)
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Sorteia perTest perguntas do banco e embaralha as opções de cada uma. */
function drawTest(): DrawnQuestion[] {
  return shuffle(questionBank)
    .slice(0, quizConfig.perTest)
    .map((q) => ({ ...q, order: shuffle(q.options.map((_, i) => i)) }));
}

export function Checkpoint() {
  const [questions, setQuestions] = useState<DrawnQuestion[] | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  function start() {
    setQuestions(drawTest());
    setAnswers({});
  }
  function pick(qid: string, idx: number) {
    setAnswers((a) => (a[qid] !== undefined ? a : { ...a, [qid]: idx }));
  }

  // Tela de entrada convidativa. Não expõe o tamanho do banco.
  if (!questions) {
    return (
      <div className="surface-card flex flex-col items-center gap-4 p-8 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-soft text-primary">
          <Sparkles size={26} />
        </span>
        <h2 className="font-display text-h2 font-semibold">Teste seus conhecimentos</h2>
        <p className="max-w-narrow text-body text-fg-muted">
          Um teste rápido com {quizConfig.perTest} perguntas sorteadas, cheias de exemplos do dia a dia da operação.
          Sem nota, sem pressão. Cada rodada traz perguntas diferentes, então dá para voltar sempre que quiser.
        </p>
        <button onClick={start} className="btn btn-primary">
          <Play size={16} /> Começar teste
        </button>
      </div>
    );
  }

  const total = questions.length;
  const correct = questions.filter((q) => answers[q.id] === q.answer).length;
  const answered = Object.keys(answers).length;
  const allDone = answered === total;

  return (
    <div className="flex flex-col gap-5">
      <div className="surface-card flex items-center justify-between gap-4 p-4">
        <span className="text-body-sm text-fg-muted">
          {quizConfig.perTest} perguntas sorteadas. Feedback na hora. É só reforço.
        </span>
        <span className="mono flex-none text-body-sm">{correct}/{total}</span>
      </div>

      {questions.map((q, qi) => {
        const chosen = answers[q.id];
        const done = chosen !== undefined;
        return (
          <div key={q.id} className="surface-card p-5">
            <p className="mb-3 font-medium text-fg">
              <span className="mono mr-2 text-fg-muted">{qi + 1}.</span>
              {q.question}
            </p>
            <div className="flex flex-col gap-2">
              {q.order.map((oi) => {
                const opt = q.options[oi];
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
                      {done && isAnswer ? <Check size={13} className="text-success" /> : done && isChosen ? <X size={13} className="text-danger" /> : ""}
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
          <h3 className="font-display text-h3 font-semibold">Você acertou {correct} de {total}.</h3>
          <p className="max-w-narrow text-body-sm text-fg-muted">
            {correct === total
              ? "Mandou bem. Cada nova rodada sorteia outras perguntas, então vale voltar para treinar os cenários que ainda não apareceram."
              : "Bom treino. Revise os pontos que escaparam e faça outra rodada: as perguntas mudam a cada vez."}
          </p>
          <div className="flex gap-2">
            <button onClick={start} className="btn btn-primary"><RotateCcw size={15} /> Nova rodada</button>
            <Link href="/abm" className="btn btn-tertiary"><ArrowLeft size={15} /> Voltar ao ABM</Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
