import type { Metric } from "../types";

// Mensuração. O que olhamos por conta e pipeline, e o painel no HubSpot.
export const resultMetrics: Metric[] = [
  { label: "Pipeline criado, influenciado e acelerado" },
  { label: "Reuniões com contas-alvo" },
  { label: "Win rate por conta-alvo vs baseline" },
];

export const progressMetrics: Metric[] = [
  { label: "Penetração de comitê" },
  { label: "Reuniões executivas" },
  { label: "Engajamento por tier" },
  { label: "Velocidade de deal e tempo parado por conta" },
  { label: "Taxa de registro de atividade no Tier 1" },
  { label: "Cobertura de pipeline" },
];

// O acordo entre marketing e comercial (co-donos do mesmo resultado).
export const alignment: { label: string; detail: string }[] = [
  { label: "ICP e tiers", detail: "Quem é conta-alvo, como se define cada tier e o modelo de score." },
  { label: "Critério de MQA", detail: "Quando uma conta está qualificada por marketing." },
  { label: "SLAs", detail: "Prazos de resposta por gatilho (sinal quente = 24h)." },
  { label: "KPIs por conta", detail: "Métricas de resultado e de progresso que os dois acompanham." },
  { label: "Ritual e dono por conta", detail: "Cadência semanal de revisão e responsável nomeado por conta." },
];

// Painel do HubSpot (dados de exemplo, ilustrativos).
export const sampleFunnel = [
  { stage: "Contas-alvo", value: 120 },
  { stage: "Engajadas", value: 74 },
  { stage: "Reuniões", value: 28 },
  { stage: "Oportunidades", value: 16 },
  { stage: "Fechamento", value: 6 },
];

export const sampleByTier = [
  { tier: "Tier 1", value: 34 },
  { tier: "Tier 2", value: 86 },
];

export const sampleCommittee = [
  { role: "Decisor", value: 82 },
  { role: "Influenciador", value: 64 },
  { role: "Usuário", value: 48 },
  { role: "Bloqueador", value: 21 },
];
