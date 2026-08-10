import type { PilotPhase } from "../types";

// A.8 — Piloto de 90 dias.
export const pilotGoal =
  "Meta padrão: 5 a 8 novas reuniões com contas-alvo mais aceleração de deals abertos em 90 dias.";

export const pilotPhases: PilotPhase[] = [
  {
    id: "fase-0",
    phase: "Fase 0",
    weeks: "Semanas 1-2",
    name: "Fundação",
    activities: [
      "Revisar critérios e tiers.",
      "Alinhar sales e marketing.",
      "Montar painel e ativos por segmento.",
      "Publicar o KPI Contract.",
    ],
  },
  {
    id: "fase-1",
    phase: "Fase 1",
    weeks: "Semanas 3-8",
    name: "Ativação",
    activities: [
      "Paid nas contas.",
      "Toques humanos no LinkedIn.",
      "Nutrição por email.",
      "Monitorar sinais e score.",
    ],
  },
  {
    id: "fase-2",
    phase: "Fase 2",
    weeks: "Semanas 9-12",
    name: "Conversão",
    activities: [
      "Abordar contas no sinal.",
      "Evento ou roundtable.",
      "Agendar reuniões.",
      "Acelerar deals e medir pipeline.",
    ],
  },
];

export const weeklyRitual = [
  "Revisão de contas em conjunto (sales mais marketing).",
  "Dono nomeado por conta.",
  "Sinais quentes da semana.",
  "SLA cobrado.",
];

export const pilotResources = [
  "Pod: lead de ABM mais apoio de conteúdo/criativo, pré-vendas e executivos.",
  "Verba de LinkedIn Ads por tier.",
  "Stack: HubSpot mais intenção mais LPs por segmento.",
];

export const pilotExpectation =
  "ABM aparece em 2 a 4 trimestres. No piloto, cobrar progresso (reuniões, penetração, aceleração), não receita fechada como única prova.";
