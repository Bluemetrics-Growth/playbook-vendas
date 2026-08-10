import type { ReactNode } from "react";
import { SeenTracker } from "@/components/shell/SeenTracker";
import { PrevNext } from "@/components/shell/PrevNext";
import { LessonHero } from "./LessonHero";

/**
 * Envolve uma seção da trilha: cabeçalho de aula (capa/vídeo), marca como vista
 * e adiciona Anterior/Próximo (modo Treinar).
 */
export function SectionShell({ slug, children }: { slug: string; children: ReactNode }) {
  return (
    <>
      <SeenTracker slug={slug} />
      <LessonHero slug={slug} />
      {children}
      <PrevNext slug={slug} />
    </>
  );
}
