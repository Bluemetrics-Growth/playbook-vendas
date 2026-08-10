"use client";

import { Check } from "lucide-react";
import { buildChecklist } from "@/content/abm/properties";
import { useProgress } from "@/lib/progress";

export function Checklist() {
  const checklist = useProgress((s) => s.checklist);
  const toggle = useProgress((s) => s.toggleChecklist);
  const hydrated = useProgress((s) => s.hydrated);

  const groups = Array.from(new Set(buildChecklist.map((i) => i.group)));
  const done = hydrated ? buildChecklist.filter((i) => checklist[i.id]).length : 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="eyebrow">Checklist de build</span>
        <span className="mono text-body-sm text-fg-muted">{done}/{buildChecklist.length}</span>
      </div>

      {groups.map((group) => (
        <div key={group} className="surface-card p-4">
          <h3 className="mb-2 font-display text-h4 font-semibold">{group}</h3>
          <ul className="flex flex-col gap-1">
            {buildChecklist.filter((i) => i.group === group).map((item) => {
              const checked = !!checklist[item.id];
              return (
                <li key={item.id}>
                  <button
                    onClick={() => toggle(item.id)}
                    aria-pressed={checked}
                    className="flex w-full items-center gap-3 rounded-m px-2 py-2 text-left transition-colors hover:bg-bg-stage"
                  >
                    <span
                      className={[
                        "flex h-5 w-5 flex-none items-center justify-center rounded-xs border transition-colors",
                        checked ? "border-primary bg-primary text-white" : "border-border-strong",
                      ].join(" ")}
                    >
                      {checked ? <Check size={14} /> : null}
                    </span>
                    <span className={["text-body-sm", checked ? "text-fg-muted line-through" : "text-fg"].join(" ")}>
                      {item.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
