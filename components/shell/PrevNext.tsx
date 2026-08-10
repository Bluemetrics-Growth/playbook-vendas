"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { abmSections } from "@/content/abm/sections";
import { useProgress } from "@/lib/progress";

/**
 * Rodapé Anterior / Próximo da trilha. Só aparece no modo Treinar.
 * A última seção aponta para o checkpoint.
 */
export function PrevNext({ slug }: { slug: string }) {
  const mode = useProgress((s) => s.mode);
  const hydrated = useProgress((s) => s.hydrated);
  if (hydrated && mode !== "treinar") return null;

  const idx = abmSections.findIndex((s) => s.slug === slug);
  if (idx === -1) return null;
  const prev = idx > 0 ? abmSections[idx - 1] : null;
  const next = idx < abmSections.length - 1 ? abmSections[idx + 1] : null;
  const isLast = idx === abmSections.length - 1;

  return (
    <nav className="mt-10 flex items-center justify-between gap-4 border-t border-border pt-6">
      {prev ? (
        <Link href={prev.href} className="btn btn-tertiary">
          <ArrowLeft size={16} /> {prev.title}
        </Link>
      ) : (
        <Link href="/abm" className="btn btn-tertiary">
          <ArrowLeft size={16} /> Início do ABM
        </Link>
      )}

      {isLast ? (
        <Link href="/abm/checkpoint" className="btn btn-primary">
          Checkpoint final <ArrowRight size={16} />
        </Link>
      ) : next ? (
        <Link href={next.href} className="btn btn-primary">
          {next.title} <ArrowRight size={16} />
        </Link>
      ) : null}
    </nav>
  );
}
