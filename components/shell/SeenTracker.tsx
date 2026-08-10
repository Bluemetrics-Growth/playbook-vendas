"use client";

import { useEffect } from "react";
import { useProgress } from "@/lib/progress";

/** Marca uma seção da trilha como vista ao montar. Sem UI. */
export function SeenTracker({ slug }: { slug: string }) {
  const markSeen = useProgress((s) => s.markSeen);
  useEffect(() => {
    markSeen(slug);
  }, [slug, markSeen]);
  return null;
}
