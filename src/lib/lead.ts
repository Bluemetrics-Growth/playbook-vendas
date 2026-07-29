/* Submit do lead (Secao 3 / 6 / 8.2). Chama a serverless function que grava
   no HubSpot com as 9 propriedades de contato e dispara o PDF por e-mail.
   Degrada com elegancia: se a API nao estiver configurada, o front continua
   e libera o resultado, sem travar a experiencia. */

import { lerFirstTouch } from "./firstTouch";

export interface LeadForm {
  nome: string;
  email: string;
  empresa: string;
}

// Payload com as 9 propriedades da Secao 8.2 + first-touch.
export interface LeadPayload extends LeadForm {
  bmFirstTouch: string;
  roi_vertical: string;
  roi_cenario: string;
  roi_custo_manual_ano: number;
  roi_valor_recuperavel_ano: number;
  roi_12m: number;
  roi_24m: number;
  roi_payback_meses: number | null;
  roi_docs_mes: number;
  roi_analistas_liberados: number;
}

export async function enviarLead(
  form: LeadForm,
  props: Omit<LeadPayload, keyof LeadForm | "bmFirstTouch">
): Promise<{ ok: boolean }> {
  const payload: LeadPayload = {
    ...form,
    bmFirstTouch: lerFirstTouch(),
    ...props,
  };

  try {
    const res = await fetch("/api/submit-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return { ok: res.ok };
  } catch {
    // Sem backend em dev/preview: nao trava o lead.
    return { ok: false };
  }
}
