import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BrandLogo } from "@/components/shell/BrandLogo";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-bg px-5 text-center">
      <BrandLogo href="/" />
      <div className="flex flex-col gap-2">
        <span className="font-display text-display-l font-semibold tracking-tight text-primary">404</span>
        <h1 className="font-display text-h2 font-semibold">Página não encontrada</h1>
        <p className="max-w-narrow text-body text-fg-muted">
          Esse caminho não existe no Playbook. Use a busca (⌘K) ou volte para a home.
        </p>
      </div>
      <Link href="/" className="btn btn-primary">
        <ArrowLeft size={16} /> Voltar para a home
      </Link>
    </div>
  );
}
