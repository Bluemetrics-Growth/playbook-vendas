import { PageHeader } from "@/components/ui/PageHeader";
import { SectionShell } from "@/components/abm/SectionShell";
import { TierExplorer } from "@/components/abm/TierExplorer";
import { goldenRule } from "@/content/abm/prose";
import { Sparkle } from "lucide-react";

export const metadata = { title: "O Modelo" };

export default function ModeloPage() {
  return (
    <SectionShell slug="modelo">
      <PageHeader
        eyebrow="ABM · O Modelo"
        title="Tiers, score e status"
        intro="A metodologia em uma leitura só. Cada conta é definida por quem ela é (tier), quão aquecida está (score) e se segue ativa no processo (status). É essa combinação que move a conta, não uma matriz teórica."
      />

      {/* Regra de ouro fixa */}
      <div className="sticky top-2 z-10 mb-6 flex items-center gap-2 rounded-pill border border-primary/30 bg-primary-soft px-4 py-2 text-body-sm font-medium text-primary shadow-1 backdrop-blur">
        <Sparkle size={16} /> Regra de ouro: {goldenRule}
      </div>

      <TierExplorer />
    </SectionShell>
  );
}
