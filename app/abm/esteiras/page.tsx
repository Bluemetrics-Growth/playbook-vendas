import { PageHeader } from "@/components/ui/PageHeader";
import { SectionShell } from "@/components/abm/SectionShell";
import { EsteirasIndex } from "@/components/abm/EsteirasIndex";

export const metadata = { title: "Esteiras / Cadências" };

export default function EsteirasPage() {
  return (
    <SectionShell slug="esteiras">
      <PageHeader
        eyebrow="ABM · Esteiras"
        title="Esteiras e cadências"
        intro="Cada workflow com seu gatilho, dono, SLA e a sequência de tasks. Filtre por tier ou veja só os gatilhos. Abra uma esteira para os roteiros copiáveis."
      />
      <EsteirasIndex />
    </SectionShell>
  );
}
