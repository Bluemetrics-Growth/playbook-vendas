import type { MeasureRow, Metric } from "../types";

// A.7 — Medição.
export const measureShift: MeasureRow[] = [
  { stop: "Número de leads / MQLs", start: "Engajamento e penetração de conta (% do comitê)" },
  { stop: "Volume de disparos e cliques isolados", start: "Pipeline criado, influenciado e acelerado" },
  { stop: "Custo por lead", start: "Reuniões com contas-alvo" },
  { stop: "Formulários preenchidos como meta", start: "Velocidade de deal e cobertura de pipeline" },
];

export const resultMetrics: Metric[] = [
  { label: "Pipeline criado, influenciado e acelerado" },
  { label: "Reuniões com contas-alvo", detail: "Meta: 5 a 8 novas em 90 dias" },
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

export const mqa = {
  title: "MQA (Marketing Qualified Account)",
  body:
    "Substitui o MQL. Implementado pelos dois scores e seus gatilhos de banda: no Tier 2, cruzar 75 qualifica para abordagem (vira SQL, SLA 24h); no Tier 1, cruzar 80 dispara a esteira de fechamento.",
};

export const threeRs = ["Relacionamento", "Reputação", "Receita"];

export const kpiContract: { label: string; detail: string }[] = [
  { label: "ICP e tiers", detail: "Definição de ICP, dos dois tiers e do modelo de score." },
  { label: "Critério de MQA", detail: "Quando uma conta é qualificada por marketing." },
  { label: "SLAs", detail: "Prazos de resposta por gatilho (sinal quente = 24h)." },
  { label: "Métricas e metas", detail: "Resultado e progresso, com metas do período." },
  { label: "Ritual e dono por conta", detail: "Cadência de revisão e responsável nomeado." },
];

// Dashboard ilustrativo (dados de exemplo, nao puxam dado vivo na v1).
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
