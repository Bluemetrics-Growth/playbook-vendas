import type { ReactNode } from "react";
import { PrevNext } from "@/components/shell/PrevNext";
import { LessonHero } from "./LessonHero";

/**
 * Envolve uma seção da trilha: cabeçalho de aula (capa/vídeo) e a navegação
 * Anterior/Próximo no rodapé.
 */
export function SectionShell({ slug, children }: { slug: string; children: ReactNode }) {
  return (
    <>
      <LessonHero slug={slug} />
      {children}
      <PrevNext slug={slug} />
    </>
  );
}
