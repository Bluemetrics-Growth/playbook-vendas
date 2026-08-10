import { PageHeader } from "@/components/ui/PageHeader";
import { SectionShell } from "@/components/abm/SectionShell";
import { ScoreSimulator } from "@/components/abm/ScoreSimulator";
import { Info } from "lucide-react";

export const metadata = { title: "Simulador de Score" };

export default function SimuladorPage() {
  return (
    <SectionShell slug="simulador">
      <PageHeader
        eyebrow="ABM · Simulador"
        title="Simulador de Score"
        intro="Marque os sinais e veja o score, a banda e o workflow que dispara ao vivo. Cada categoria respeita o teto. É a prova de que o motion não é um deck."
      />

      <ScoreSimulator />

      <div className="mt-8 flex items-start gap-3 rounded-m border border-border bg-bg-soft px-4 py-3 text-[13px] text-fg-muted">
        <Info size={16} className="mt-0.5 flex-none text-primary" />
        <span>
          O exemplo canônico do material é um deal em 84 que, ao ficar 14 dias mudo, cai para 74 e volta à nutrição do
          Tier 1 sem rebaixar de tier. O modelo de incrementos opera em múltiplos de 5, então o preset reproduz o mesmo
          mecanismo com números alcançáveis (a penalidade de -10 tira a conta da banda de fechamento 80+ e a leva para a
          nutrição 60-79). A regra é a mesma: a penalidade move entre bandas, nunca troca o tier.
        </span>
      </div>
    </SectionShell>
  );
}
