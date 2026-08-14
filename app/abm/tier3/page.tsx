import { PageHeader } from "@/components/ui/PageHeader";
import { SectionShell } from "@/components/abm/SectionShell";
import { Tier3Guide } from "@/components/abm/Tier3Guide";
import { tier3Intro } from "@/content/abm/tier3";

export const metadata = { title: "Tier 3 · Prospecção US" };

export default function Tier3Page() {
  return (
    <SectionShell slug="tier3">
      <PageHeader
        eyebrow="ABM · Tier 3"
        title="Tier 3: prospecção US"
        intro={tier3Intro}
      />
      <Tier3Guide />
    </SectionShell>
  );
}
