import { PageHeader } from "@/components/ui/PageHeader";
import { SectionShell } from "@/components/abm/SectionShell";
import { GlossaryList } from "@/components/abm/GlossaryList";

export const metadata = { title: "Glossário" };

export default function GlossarioPage() {
  return (
    <SectionShell slug="glossario">
      <PageHeader
        eyebrow="ABM · Glossário"
        title="Vocabulário do ABM"
        intro="Elimina a confusão de termos. Uma definição direta para cada conceito do motion."
      />
      <GlossaryList />
    </SectionShell>
  );
}
