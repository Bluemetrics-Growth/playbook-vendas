import { PageHeader } from "@/components/ui/PageHeader";
import { SectionShell } from "@/components/abm/SectionShell";
import { ScoreAnatomy } from "@/components/abm/ScoreAnatomy";
import { Sparkle, Calculator } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Leitura de Score" };

export default function LeituraPage() {
  return (
    <SectionShell slug="leitura">
      <PageHeader
        eyebrow="ABM · Leitura de Score"
        title="Como o score é montado"
        intro="Cada tier tem o seu score, e cada score é montado a partir de sinais que valem pontos. Aqui você vê, de forma visual, como esses pontos se acumulam e empurram a conta pela régua de bandas."
      />

      {/* Regra central */}
      <div className="mb-8 flex items-start gap-2 rounded-m border border-primary/30 bg-primary-soft px-4 py-3 text-body-sm text-primary">
        <Sparkle size={16} className="mt-0.5 flex-none" />
        <span>
          O score nunca é lido sozinho. Ele ganha sentido com o tier (quem a conta é) e o status (em que estado ela
          está). O que o score decide é em qual banda a conta cai, e a banda é que orienta a próxima ação.
        </span>
      </div>

      <ScoreAnatomy />

      {/* Ponte para a calculadora */}
      <Link
        href="/abm/simulador"
        className="mt-10 flex items-center justify-between gap-3 rounded-l border border-border bg-bg-soft px-5 py-4 transition-colors hover:border-border-strong"
      >
        <span className="flex items-center gap-3">
          <span className="flex h-10 w-10 flex-none items-center justify-center rounded-m bg-primary-soft text-primary">
            <Calculator size={20} />
          </span>
          <span>
            <span className="block font-medium text-fg">Ver o score se montando</span>
            <span className="block text-body-sm text-fg-muted">Abra a calculadora e marque os sinais para ver os pontos e a banda ao vivo.</span>
          </span>
        </span>
        <span className="text-body-sm font-medium text-primary">Abrir</span>
      </Link>
    </SectionShell>
  );
}
