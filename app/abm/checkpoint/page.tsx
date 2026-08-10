import { PageHeader } from "@/components/ui/PageHeader";
import { Checkpoint } from "@/components/abm/Checkpoint";

export const metadata = { title: "Checkpoint" };

export default function CheckpointPage() {
  return (
    <>
      <PageHeader
        eyebrow="ABM · Checkpoint"
        title="Checkpoint final"
        intro="Oito perguntas de reforço nos pontos que mais confundem. Feedback imediato, sem nota. Feche a trilha com confiança."
      />
      <Checkpoint />
    </>
  );
}
