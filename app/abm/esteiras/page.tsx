import { PageHeader } from "@/components/ui/PageHeader";
import { SectionShell } from "@/components/abm/SectionShell";
import { EsteirasIndex } from "@/components/abm/EsteirasIndex";
import { Bell, Megaphone } from "lucide-react";

export const metadata = { title: "Esteiras e Cadências" };

export default function EsteirasPage() {
  return (
    <SectionShell slug="esteiras">
      <PageHeader
        eyebrow="ABM · Esteiras"
        title="Esteiras e cadências"
        intro="As esteiras já estão criadas e rodando no HubSpot. Aqui você vê o que cada uma dispara, quem age e a sequência de tasks com roteiros prontos para copiar. Filtre por tier para separar relacionamento (Tier 2) de oportunidade (Tier 1)."
      />

      {/* Como as esteiras chegam até você */}
      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="surface-card flex items-start gap-3 p-4">
          <span className="flex h-9 w-9 flex-none items-center justify-center rounded-m bg-primary-soft text-primary">
            <Bell size={18} />
          </span>
          <p className="text-body-sm text-fg-muted">
            <strong className="text-fg">A esteira te notifica.</strong> Quando uma conta se move, a tarefa cai para o
            executivo dono da empresa no HubSpot. Você recebe a notificação (revisão, envio de email, toque) e executa.
          </p>
        </div>
        <div className="surface-card flex items-start gap-3 p-4">
          <span className="flex h-9 w-9 flex-none items-center justify-center rounded-m" style={{ background: "rgba(123,0,220,0.1)", color: "var(--bm-purple)" }}>
            <Megaphone size={18} />
          </span>
          <p className="text-body-sm text-fg-muted">
            <strong className="text-fg">Marketing trabalha por baixo.</strong> Na nutrição, o marketing sustenta a
            comunicação no comitê com anúncios segmentados e emails estratégicos por conta, até a conta dar o primeiro sinal.
          </p>
        </div>
      </div>

      <EsteirasIndex />
    </SectionShell>
  );
}
