import type { GlossaryTerm } from "../types";

// Glossário (termos-base). Sem links: cada termo é uma definição direta.
export const glossary: GlossaryTerm[] = [
  {
    term: "Tier 1 x Tier 2",
    definition:
      "Roteamento e cadência no CRM. Tier 1 = oportunidade (deal aberto, Score de Prioridade). Tier 2 = relacionamento (rede dos executivos, Score de Abordagem).",
  },
  {
    term: "Score de Abordagem",
    definition: "Lead score combinado do Tier 2, no objeto Empresa. Mede prontidão para conversa por comportamento.",
  },
  {
    term: "Score de Prioridade",
    definition: "Lead score combinado do Tier 1, no objeto Empresa. Mede prioridade e saúde do deal.",
  },
  {
    term: "Status ABM",
    definition:
      "Estado operacional da conta (ativa, dormente, cliente, perdida_reciclar, arquivada, perdida_arquivar). Só ativa permite permanência na esteira de nutrição. Lê-se junto com tier e score.",
  },
  {
    term: "MQA",
    definition:
      "Marketing Qualified Account. Conta qualificada por marketing, disparada pelos gatilhos de banda dos scores.",
  },
  {
    term: "Penetração de conta",
    definition: "Percentual do comitê engajado por conta.",
  },
  {
    term: "Comitê de compra",
    definition: "O conjunto de decisores, influenciadores, usuários e bloqueadores da conta. O ABM trabalha o comitê inteiro, não um contato.",
  },
  {
    term: "Frequência de comunicação",
    definition: "Presença constante do marketing no comitê via anúncios segmentados, para que as pessoas-chave já conheçam a BlueMetrics antes da primeira conversa.",
  },
  {
    term: "Buying Role",
    definition: "Papel de compra do contato (decisor, influenciador, usuário, bloqueador).",
  },
  {
    term: "Gatilho / SLA",
    definition: "O sinal que autoriza a abordagem e o prazo de resposta (quente = 24h).",
  },
  {
    term: "Penalidade por inatividade",
    definition: "Ajuste negativo nativo do Score de Prioridade por dias sem atividade registrada.",
  },
  {
    term: "Pipeline Pibernat",
    definition: "Pipeline real do Tier 1 no HubSpot.",
  },
];
