"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { properties } from "@/content/abm/properties";

export function PropertyTable() {
  const [q, setQ] = useState("");
  const [obj, setObj] = useState<"Todos" | "Empresa" | "Contato">("Todos");

  const rows = properties.filter((p) => {
    const matchObj = obj === "Todos" || p.object === obj;
    const matchQ = `${p.name} ${p.type} ${p.usage}`.toLowerCase().includes(q.toLowerCase());
    return matchObj && matchQ;
  });

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex flex-1 items-center gap-2 rounded-m border border-border bg-surface px-3 py-2">
          <Search size={15} className="text-fg-muted" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Filtrar propriedades..."
            className="w-full bg-transparent text-body-sm outline-none placeholder:text-fg-hint"
          />
        </div>
        <div className="inline-flex items-center gap-1 rounded-pill bg-bg-stage p-1">
          {(["Todos", "Empresa", "Contato"] as const).map((o) => (
            <button
              key={o}
              onClick={() => setObj(o)}
              aria-pressed={obj === o}
              className={[
                "rounded-pill px-3 py-1 text-body-sm transition-all",
                obj === o ? "bg-surface text-fg shadow-1" : "text-fg-muted hover:text-fg",
              ].join(" ")}
            >
              {o}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-l border border-border">
        <table className="w-full min-w-[640px] border-collapse text-left text-body-sm">
          <thead>
            <tr className="border-b border-border bg-bg-soft">
              <th className="px-4 py-3 font-semibold">Propriedade</th>
              <th className="px-4 py-3 font-semibold">Objeto</th>
              <th className="px-4 py-3 font-semibold">Tipo</th>
              <th className="px-4 py-3 font-semibold">Uso</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.name} className="border-b border-border last:border-0 hover:bg-bg-soft">
                <td className="px-4 py-3"><span className="mono text-[13px] text-fg">{p.name}</span></td>
                <td className="px-4 py-3">
                  <span className="chip chip-gray text-[11px]">{p.object}</span>
                </td>
                <td className="px-4 py-3 text-fg-muted">{p.type}</td>
                <td className="px-4 py-3 text-fg-muted">{p.usage}</td>
              </tr>
            ))}
            {rows.length === 0 ? (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-fg-muted">Nada encontrado.</td></tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
