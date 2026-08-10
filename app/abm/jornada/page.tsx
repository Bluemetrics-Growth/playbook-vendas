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
        intro="O ciclo completo como um sistema vivo. Clique num estado para ver o que acontece ali, ou toque para animar uma conta percorrendo o ciclo, do Tier 2 ao fechamento."
      />
      <AccountJourney />
    </SectionShell>
  );
}
