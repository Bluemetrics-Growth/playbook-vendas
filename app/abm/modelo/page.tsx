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
        title="Dois tiers, dois scores"
        intro={
          <>
            A distinção que mais confunde. <strong className="text-fg">Tier 1/Tier 2</strong> é roteamento e cadência.{" "}
            <strong className="text-fg">A/B/C</strong> é quanto esforço. São eixos diferentes. Selecione um tier para
            explorar.
          </>
        }
      />

      {/* Regra de ouro fixa */}
      <div
        className="sticky top-2 z-10 mb-6 flex items-center gap-2 rounded-pill border border-primary/30 bg-primary-soft px-4 py-2 text-body-sm font-medium text-primary shadow-1 backdrop-blur"
      >
        <Sparkle size={16} /> Regra de ouro: {goldenRule}
      </div>

      <TierExplorer />
    </SectionShell>
  );
}
