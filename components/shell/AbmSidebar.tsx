"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { abmSections } from "@/content/abm/sections";
import { Icon } from "@/components/ui/Icon";
import { BrandLogo } from "./BrandLogo";
import { SearchButton } from "./CommandPalette";

const groups = ["Tese", "Modelo", "Operação", "Gestão"] as const;

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-5">
      {groups.map((group) => {
        const items = abmSections.filter((s) => s.group === group);
        return (
          <div key={group} className="flex flex-col gap-1">
            <span className="eyebrow px-2 text-[11px]">{group}</span>
            {items.map((s) => {
              const active = pathname === s.href;
              return (
                <Link
                  key={s.slug}
                  href={s.href}
                  onClick={onNavigate}
                  aria-current={active ? "page" : undefined}
                  className={[
                    "group flex items-center gap-2.5 rounded-m px-2 py-2 text-body-sm transition-colors",
                    active ? "bg-primary-soft font-medium text-primary" : "text-fg-muted hover:bg-bg-stage hover:text-fg",
                  ].join(" ")}
                >
                  <Icon name={s.icon} size={16} strokeWidth={1.75} className="flex-none" />
                  <span className="flex-1 truncate">{s.title}</span>
                </Link>
              );
            })}
          </div>
        );
      })}
    </nav>
  );
}

function SidebarInner({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col gap-5">
      <div className="flex flex-col gap-4">
        <BrandLogo />
        <SearchButton className="w-full justify-start" />
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto pr-1">
        <NavList onNavigate={onNavigate} />
      </div>
    </div>
  );
}

export function AbmSidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-[280px] flex-none border-r border-border bg-surface px-5 py-6 lg:block">
      <SidebarInner />
    </aside>
  );
}

export function AbmMobileBar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-border bg-surface/85 px-4 py-3 backdrop-blur-md lg:hidden">
        <BrandLogo />
        <div className="flex items-center gap-2">
          <SearchButton />
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="btn btn-sm btn-tertiary"
            aria-label="Abrir menu"
          >
            <Menu size={18} />
          </button>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-[300px] max-w-[85vw] overflow-y-auto bg-surface px-5 py-6 shadow-3">
            <div className="mb-4 flex justify-end">
              <button type="button" onClick={() => setOpen(false)} className="btn btn-sm btn-tertiary" aria-label="Fechar menu">
                <X size={18} />
              </button>
            </div>
            <SidebarInner onNavigate={() => setOpen(false)} />
          </div>
        </div>
      ) : null}
    </>
  );
}
