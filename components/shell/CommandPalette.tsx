"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { Search, CornerDownLeft } from "lucide-react";
import { buildSearchIndex, kindLabel } from "@/lib/search";
import { Icon } from "@/components/ui/Icon";
import type { SearchKind } from "@/content/types";

const kindIcon: Record<SearchKind, string> = {
  section: "FileText",
  workflow: "GitBranch",
  task: "ListChecks",
  term: "BookOpen",
  property: "Database",
  rule: "Workflow",
};

export const OPEN_PALETTE_EVENT = "bm:open-command-palette";

export function openCommandPalette() {
  window.dispatchEvent(new Event(OPEN_PALETTE_EVENT));
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const index = useMemo(() => buildSearchIndex(), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    const onOpen = () => setOpen(true);
    document.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE_EVENT, onOpen);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE_EVENT, onOpen);
    };
  }, []);

  const go = useCallback(
    (href: string) => {
      setOpen(false);
      setQuery("");
      router.push(href);
    },
    [router]
  );

  const grouped = useMemo(() => {
    const g: Record<string, typeof index> = {};
    for (const it of index) {
      (g[it.kind] ??= []).push(it);
    }
    return g;
  }, [index]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[12vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Busca do Playbook"
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />
      <Command
        label="Busca do Playbook"
        shouldFilter
        className="relative z-10 w-full max-w-[640px] overflow-hidden rounded-xl border border-border bg-surface shadow-3"
        filter={(value, search) => {
          const v = value.toLowerCase();
          const s = search
            .toLowerCase()
            .normalize("NFD")
            .replace(/[̀-ͯ]/g, "");
          return s.split(/\s+/).every((t) => v.includes(t)) ? 1 : 0;
        }}
      >
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search size={18} className="text-fg-muted" />
          <Command.Input
            autoFocus
            value={query}
            onValueChange={setQuery}
            placeholder="Buscar workflow, task, termo, propriedade..."
            className="h-14 flex-1 bg-transparent text-body outline-none placeholder:text-fg-hint"
          />
          <kbd className="mono rounded-s border border-border px-1.5 py-0.5 text-[11px] text-fg-muted">esc</kbd>
        </div>

        <Command.List className="max-h-[52vh] overflow-y-auto p-2">
          <Command.Empty className="px-3 py-8 text-center text-body-sm text-fg-muted">
            Nada encontrado para essa busca.
          </Command.Empty>

          {Object.entries(grouped).map(([kind, items]) => (
            <Command.Group
              key={kind}
              heading={kindLabel[kind]}
              className="mb-1 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-eyebrow [&_[cmdk-group-heading]]:text-fg-hint"
            >
              {items.map((it) => (
                <Command.Item
                  key={it.id}
                  value={`${it.title} ${it.subtitle ?? ""} ${it.keywords}`}
                  onSelect={() => go(it.href)}
                  className="flex cursor-pointer items-center gap-3 rounded-m px-3 py-2.5 text-body-sm aria-selected:bg-primary-soft"
                >
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-s bg-bg-stage text-fg-muted">
                    <Icon name={kindIcon[it.kind]} size={15} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium text-fg">{it.title}</span>
                    {it.subtitle ? (
                      <span className="block truncate text-[13px] text-fg-muted">{it.subtitle}</span>
                    ) : null}
                  </span>
                  <CornerDownLeft size={14} className="flex-none text-fg-hint opacity-0 aria-selected:opacity-100" />
                </Command.Item>
              ))}
            </Command.Group>
          ))}
        </Command.List>
      </Command>
    </div>
  );
}

export function SearchButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={openCommandPalette}
      className={`inline-flex items-center gap-2 rounded-pill border border-border bg-surface px-3 py-1.5 text-body-sm text-fg-muted transition-colors hover:border-border-strong hover:text-fg ${className}`}
      aria-label="Abrir busca"
    >
      <Search size={15} />
      <span className="hidden sm:inline">Buscar</span>
      <kbd className="mono ml-1 hidden rounded-s border border-border px-1.5 py-0.5 text-[11px] sm:inline">⌘K</kbd>
    </button>
  );
}
