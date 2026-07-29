/* First-touch attribution (Secao 8.3). Le e persiste o cookie bm_first_touch
   (mecanismo de atribuicao ja em uso). Enviado junto no payload do lead. */

const COOKIE = "bm_first_touch";

export function lerFirstTouch(): string {
  if (typeof document === "undefined") return "";
  const match = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${COOKIE}=`));
  return match ? decodeURIComponent(match.split("=")[1]) : "";
}

// Se ainda nao existe, grava a origem atual (referrer + utms) como primeiro toque.
export function garantirFirstTouch(): string {
  if (typeof document === "undefined") return "";
  const existente = lerFirstTouch();
  if (existente) return existente;

  const params = new URLSearchParams(window.location.search);
  const payload = JSON.stringify({
    ts: new Date().toISOString(),
    ref: document.referrer || "direct",
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
    landing: window.location.pathname,
  });

  // 1 ano
  const expira = new Date();
  expira.setFullYear(expira.getFullYear() + 1);
  document.cookie = `${COOKIE}=${encodeURIComponent(
    payload
  )}; path=/; expires=${expira.toUTCString()}; SameSite=Lax`;

  return payload;
}
