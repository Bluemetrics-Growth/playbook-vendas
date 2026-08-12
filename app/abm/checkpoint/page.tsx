import { PageHeader } from "@/components/ui/PageHeader";
import { Checkpoint } from "@/components/abm/Checkpoint";

export const metadata = { title: "Teste seus conhecimentos" };

export default function CheckpointPage() {
  return (
    <>
      <PageHeader
        eyebrow="ABM · Teste"
        title="Teste seus conhecimentos"
        intro="Um teste leve, com perguntas sorteadas e cheias de exemplos da operação. Sem nota, feedback na hora. Cada rodada é diferente."
      />
      <Checkpoint />
    </>
  );
}
