"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { glossary } from "@/content/abm/glossary";

export function GlossaryList() {
  const [q, setQ] = useState("");
  const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const rows = glossary.filter((t) => norm(`${t.term} ${t.definition}`).includes(norm(q)));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 rounded-m border border-border bg-surface px-3 py-2">
        <Search size={16} className="text-fg-muted" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar termo..."
          className="w-full bg-transparent text-body-sm outline-none placeholder:text-fg-hint"
        />
      </div>

      <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {rows.map((t) => (
          <div key={t.term} className="surface-card flex flex-col gap-1.5 p-4">
            <dt className="font-display text-h4 font-semibold">{t.term}</dt>
            <dd className="text-body-sm text-fg-muted">{t.definition}</dd>
          </div>
        ))}
        {rows.length === 0 ? <p className="text-fg-muted">Nada encontrado.</p> : null}
      </dl>
    </div>
  );
}
