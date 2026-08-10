import type { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  children?: ReactNode;
}

export function PageHeader({ eyebrow, title, intro, children }: PageHeaderProps) {
  return (
    <header className="mb-8 flex flex-col gap-3">
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h1 className="text-display-m font-display font-semibold tracking-tight">{title}</h1>
      {intro ? (
        <div className="max-w-text text-body text-fg-muted leading-relaxed">{intro}</div>
      ) : null}
      {children}
    </header>
  );
}
