/* dataLayer / GTM (GTM-MNVPH77L). Eventos e parametros exatos da Secao 8.1.
   Um unico push helper para nao divergir do PRD. */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(event: string, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}
