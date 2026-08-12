import { PageHeader } from "@/components/ui/PageHeader";
import { SectionShell } from "@/components/abm/SectionShell";
import { ScoreSimulator } from "@/components/abm/ScoreSimulator";
import {
  ThreeSignals,
  ReadingTable,
  T20Example,
  Checkpoints,
  ReadingMistakes,
  ValidationCheckpoint,
} from "@/components/abm/ScoreReading";
import { simuladorCopy } from "@/content/abm/simulador";
import { Info, Sparkle } from "lucide-react";

export const metadata = { title: "Simulador de Score" };

export default function SimuladorPage() {
  return (
    <SectionShell slug="simulador">
      <PageHeader
        eyebrow="ABM · Simulador"
        title="Como ler score, prioridade e próxima ação"
        intro={simuladorCopy.teaches}
      />

      {/* Regra central fixa */}
      <div className="sticky top-2 z-10 mb-8 flex items-start gap-2 rounded-m border border-primary/30 bg-primary-soft px-4 py-3 text-body-sm text-primary shadow-1 backdrop-blur">
        <Sparkle size={16} className="mt-0.5 flex-none" />
        <span>{simuladorCopy.central}</span>
      </div>

      {/* Seção 2 — Os 3 sinais */}
      <ThreeSignals />

      {/* Seção 3 — Como interpretar a combinação */}
      <ReadingTable />

      {/* Ferramenta: simulador interativo */}
      <section className="mt-12">
        <div className="mb-4 flex flex-col gap-1">
          <span className="eyebrow">Na prática</span>
          <h2 className="font-display text-h3 font-semibold tracking-tight">Simule o score e veja a banda</h2>
          <p className="max-w-text text-body-sm text-fg-muted">
            Marque os sinais e veja o score, a banda e o workflow que dispara ao vivo. Cada categoria respeita o teto. É
            a prova de que a leitura não é abstrata: o score aplicável muda a banda, e a banda muda a próxima ação.
          </p>
        </div>

        <ScoreSimulator />

        <div className="mt-6 flex items-start gap-3 rounded-m border border-border bg-bg-soft px-4 py-3 text-[13px] text-fg-muted">
          <Info size={16} className="mt-0.5 flex-none text-primary" />
          <span>
            O exemplo canônico do material é um deal em 84 que, ao ficar 14 dias mudo, cai para 74 e volta à nutrição do
            Tier 1 sem rebaixar de tier. O modelo de incrementos opera em múltiplos de 5, então o preset reproduz o mesmo
            mecanismo com números alcançáveis (a penalidade de -10 tira a conta da banda de fechamento 80+ e a leva para a
            nutrição 60-79). A regra é a mesma: a penalidade move entre bandas, nunca troca o tier.
          </span>
        </div>
      </section>

      {/* Seção 4 — Exemplo real: T2-0 */}
      <T20Example />

      {/* Seção 5 — Checkpoints no tempo */}
      <Checkpoints />

      {/* Seção 6 — Erros comuns */}
      <ReadingMistakes />

      {/* Seção 7 — Checkpoint final */}
      <ValidationCheckpoint />
    </SectionShell>
  );
}
