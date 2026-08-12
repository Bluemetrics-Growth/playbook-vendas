import { PageHeader } from "@/components/ui/PageHeader";
import { SectionShell } from "@/components/abm/SectionShell";
import { AccountJourney } from "@/components/abm/AccountJourney";

export const metadata = { title: "Jornada da Conta" };

export default function JornadaPage() {
  return (
    <SectionShell slug="jornada">
      <PageHeader
        eyebrow="ABM · Jornada"
        title="A jornada da conta"
        intro="O ciclo completo da conta, do Tier 2 ao fechamento. Clique em cada estado para ver o que acontece ali: a banda, o dono, o gatilho de saída e a esteira que dispara."
      />
      <AccountJourney />
    </SectionShell>
  );
}
