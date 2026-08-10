import type { ReactNode } from "react";
import { SeenTracker } from "@/components/shell/SeenTracker";
import { PrevNext } from "@/components/shell/PrevNext";

/** Envolve uma seção da trilha: marca como vista e adiciona Anterior/Próximo (modo Treinar). */
export function SectionShell({ slug, children }: { slug: string; children: ReactNode }) {
  return (
    <>
      <SeenTracker slug={slug} />
      {children}
      <PrevNext slug={slug} />
    </>
  );
}
