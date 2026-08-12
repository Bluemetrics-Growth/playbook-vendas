import type { GlossaryTerm } from "../types";

// A.9 — Glossário (termos-base).
export const glossary: GlossaryTerm[] = [
  {
    term: "Tier 1 x Tier 2",
    definition:
      "Roteamento e cadência no CRM. Tier 1 = oportunidade (deal aberto, Score de Prioridade). Tier 2 = relacionamento (rede dos executivos, Score de Abordagem).",
    seeAlso: "/abm/modelo",
    seeAlsoLabel: "Ver no Tier Explorer",
  },
  {
    term: "A/B/C",
    definition:
      "Eixo de esforço (Strategic 1:1, Lite 1:poucos, Programmatic 1:muitos). Não confundir com Tier 1/Tier 2.",
    seeAlso: "/abm/modelo",
    seeAlsoLabel: "Ver no Modelo",
  },
  {
    term: "Status ABM",
    definition:
      "Estado operacional da conta (ativa, dormente, cliente, perdida_reciclar, arquivada, perdida_arquivar). Só ativa permite permanência na esteira de nutrição. Lê-se junto com tier e score.",
    seeAlso: "/abm/simulador",
    seeAlsoLabel: "Ver no simulador",
  },
  {
    term: "Score de Abordagem",
    definition: "Lead score combinado do Tier 2, no objeto Empresa. Mede prontidão para conversa por comportamento.",
    seeAlso: "/abm/simulador",
    seeAlsoLabel: "Abrir simulador",
  },
  {
    term: "Score de Prioridade",
    definition: "Lead score combinado do Tier 1, no objeto Empresa. Mede prioridade e saúde do deal.",
    seeAlso: "/abm/simulador",
    seeAlsoLabel: "Abrir simulador",
  },
  {
    term: "MQA",
    definition:
      "Conta qualificada por marketing, substitui o MQL. Disparada pelos gatilhos de banda dos scores.",
    seeAlso: "/abm/medicao",
    seeAlsoLabel: "Ver na Medição",
  },
  {
    term: "Penetração de conta",
    definition: "Percentual do comitê engajado por conta.",
    seeAlso: "/abm/medicao",
    seeAlsoLabel: "Ver na Medição",
  },
  {
    term: "Air cover / always-on",
    definition: "Camada de ads no comitê inteiro, sempre ligada.",
    seeAlso: "/abm/jornada",
    seeAlsoLabel: "Ver na Jornada",
  },
  {
    term: "Buying Role",
    definition: "Papel de compra do contato (decisor, influenciador, usuário, bloqueador).",
    seeAlso: "/abm/hubspot",
    seeAlsoLabel: "Ver no HubSpot",
  },
  {
    term: "Gatilho / SLA",
    definition: "O sinal que autoriza a abordagem e o prazo de resposta (quente = 24h).",
    seeAlso: "/abm/orquestracao",
    seeAlsoLabel: "Ver na Orquestração",
  },
  {
    term: "Penalidade por inatividade",
    definition: "Ajuste negativo nativo do Score de Prioridade por dias sem atividade registrada.",
    seeAlso: "/abm/simulador",
    seeAlsoLabel: "Ver no simulador",
  },
  {
    term: "Pipeline Pibernat",
    definition: "Pipeline real do Tier 1 no HubSpot.",
    seeAlso: "/abm/esteiras",
    seeAlsoLabel: "Ver nas Esteiras",
  },
  {
    term: "MQL",
    definition:
      "Marketing Qualified Lead. O modelo aposenta o MQL como meta e mede por conta e pipeline (MQA).",
    seeAlso: "/abm/medicao",
    seeAlsoLabel: "Ver na Medição",
  },
];
