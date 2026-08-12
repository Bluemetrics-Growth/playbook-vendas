import { PageHeader } from "@/components/ui/PageHeader";
import { SectionShell } from "@/components/abm/SectionShell";
import { ReadingTable, T20Example, Checkpoints, ReadingMistakes } from "@/components/abm/ScoreReading";
import { simuladorCopy } from "@/content/abm/simulador";
import { Sparkle, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Leitura de Score" };

export default function LeituraPage() {
  return (
    <SectionShell slug="leitura">
      <PageHeader eyebrow="ABM · Leitura de Score" title="Como o score vira decisão" intro={simuladorCopy.teaches} />

      {/* Regra central */}
      <div className="mb-2 flex items-start gap-2 rounded-m border border-primary/30 bg-primary-soft px-4 py-3 text-body-sm text-primary">
        <Sparkle size={16} className="mt-0.5 flex-none" />
        <span>{simuladorCopy.central}</span>
      </div>
      <p className="max-w-text text-body-sm text-fg-muted">{simuladorCopy.consequence}</p>

      <ReadingTable />
      <T20Example />
      <Checkpoints />
      <ReadingMistakes />

      {/* Ponte para a calculadora */}
      <Link
        href="/abm/simulador"
        className="mt-12 flex items-center justify-between gap-3 rounded-l border border-border bg-bg-soft px-5 py-4 transition-colors hover:border-border-strong"
      >
        <span>
          <span className="block font-medium text-fg">Quer ver o score se mexendo?</span>
          <span className="block text-body-sm text-fg-muted">Abra a calculadora e marque os sinais para ver a banda e o workflow ao vivo.</span>
        </span>
        <ArrowRight size={18} className="flex-none text-primary" />
      </Link>
    </SectionShell>
  );
}
