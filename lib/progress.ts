"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Mode = "treinar" | "consultar";

interface ProgressState {
  mode: Mode;
  seen: Record<string, boolean>; // slug -> visto
  checklist: Record<string, boolean>; // id -> marcado
  hydrated: boolean;
  setMode: (m: Mode) => void;
  markSeen: (slug: string) => void;
  toggleChecklist: (id: string) => void;
  resetProgress: () => void;
  setHydrated: () => void;
}

export const useProgress = create<ProgressState>()(
  persist(
    (set) => ({
      mode: "treinar",
      seen: {},
      checklist: {},
      hydrated: false,
      setMode: (m) => set({ mode: m }),
      markSeen: (slug) =>
        set((s) => (s.seen[slug] ? s : { seen: { ...s.seen, [slug]: true } })),
      toggleChecklist: (id) =>
        set((s) => ({ checklist: { ...s.checklist, [id]: !s.checklist[id] } })),
      resetProgress: () => set({ seen: {}, checklist: {} }),
      setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "bm-playbook-abm",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);
