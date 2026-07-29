/* =========================================================================
   Serverless function (Vercel) - submit do lead da Calculadora de ROI.
   Secao 6 / 8.2: grava/atualiza o contato no HubSpot com as 9 propriedades
   de ROI e dispara a entrega do PDF por e-mail (bonus).

   Degrada com elegancia: se as variaveis de ambiente do HubSpot nao estiverem
   configuradas, responde 200 com { hubspot: "skipped" } para nao travar o
   lead em dev/preview. O criterio de aceite (zero submit sem contato no
   HubSpot) vale para producao, com o token configurado.

   Variaveis de ambiente esperadas:
     HUBSPOT_PRIVATE_APP_TOKEN  (token de private app com scope de contatos)
   ========================================================================= */

interface LeadBody {
  nome?: string;
  email?: string;
  empresa?: string;
  bmFirstTouch?: string;
  roi_vertical?: string;
  roi_cenario?: string;
  roi_custo_manual_ano?: number;
  roi_valor_recuperavel_ano?: number;
  roi_12m?: number;
  roi_24m?: number;
  roi_payback_meses?: number | null;
  roi_docs_mes?: number;
  roi_analistas_liberados?: number;
}

// Handler no formato Node (req, res) suportado pela Vercel.
export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }

  const body: LeadBody = typeof req.body === "string" ? safeParse(req.body) : req.body || {};

  if (!body.email || !body.nome) {
    res.status(400).json({ error: "missing_fields" });
    return;
  }

  const token = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
  if (!token) {
    // Sem credencial: nao trava o lead (dev/preview).
    res.status(200).json({ ok: true, hubspot: "skipped" });
    return;
  }

  // Propriedades de contato da Secao 8.2 (as 9) + identificacao + first-touch.
  const properties: Record<string, string> = {
    email: body.email,
    firstname: body.nome,
    company: body.empresa ?? "",
    roi_vertical: str(body.roi_vertical),
    roi_cenario: str(body.roi_cenario),
    roi_custo_manual_ano: str(body.roi_custo_manual_ano),
    roi_valor_recuperavel_ano: str(body.roi_valor_recuperavel_ano),
    roi_12m: str(body.roi_12m),
    roi_24m: str(body.roi_24m),
    roi_payback_meses: str(body.roi_payback_meses),
    roi_docs_mes: str(body.roi_docs_mes),
    roi_analistas_liberados: str(body.roi_analistas_liberados),
    bm_first_touch: str(body.bmFirstTouch),
  };

  try {
    const r = await upsertHubspotContact(token, body.email, properties);
    if (!r.ok) {
      const detail = await r.text();
      res.status(502).json({ ok: false, hubspot: "error", detail });
      return;
    }
    res.status(200).json({ ok: true, hubspot: "upserted" });
  } catch (e) {
    res.status(500).json({ ok: false, error: String(e) });
  }
}

// Cria o contato; se ja existe (409), atualiza pelo e-mail.
async function upsertHubspotContact(
  token: string,
  email: string,
  properties: Record<string, string>
): Promise<Response> {
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const create = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
    method: "POST",
    headers,
    body: JSON.stringify({ properties }),
  });

  if (create.status !== 409) return create;

  // Conflito: atualiza usando o e-mail como idProperty.
  return fetch(
    `https://api.hubapi.com/crm/v3/objects/contacts/${encodeURIComponent(
      email
    )}?idProperty=email`,
    { method: "PATCH", headers, body: JSON.stringify({ properties }) }
  );
}

function str(v: unknown): string {
  if (v === null || v === undefined) return "";
  return String(v);
}

function safeParse(s: string): LeadBody {
  try {
    return JSON.parse(s);
  } catch {
    return {};
  }
}
