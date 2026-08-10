import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Database } from "lucide-react";
import { BrandLogo } from "@/components/shell/BrandLogo";

export const metadata = { title: "CRM" };

const crmUrl =
  process.env.NEXT_PUBLIC_CRM_URL || process.env.NEXT_PUBLIC_HUBSPOT_BASE_URL || "https://app.hubspot.com";

export default function CrmPage() {
  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b border-border bg-surface">
        <div className="container-wide flex h-14 items-center justify-between">
          <BrandLogo />
          <Link href="/" className="btn btn-sm btn-tertiary">
            <ArrowLeft size={15} /> Home
          </Link>
        </div>
      </header>

      <main className="container-text flex flex-col items-center gap-6 py-20 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary-soft text-primary">
          <Database size={30} strokeWidth={1.5} />
        </span>
        <div className="flex flex-col gap-3">
          <span className="chip chip-gray mx-auto">Atalho · Em breve</span>
          <h1 className="font-display text-display-m font-semibold tracking-tight">CRM</h1>
          <p className="mx-auto max-w-narrow text-body text-fg-muted">
            O módulo de CRM ainda não tem conteúdo interno no Playbook. Todo o ABM é gerido no
            HubSpot, que é o sistema de registro. Use o atalho abaixo para abrir o CRM.
          </p>
        </div>
        <a href={crmUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
          Abrir o HubSpot <ArrowUpRight size={16} />
        </a>
      </main>
    </div>
  );
}
