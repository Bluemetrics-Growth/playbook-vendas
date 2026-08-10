import type { ChecklistItem, Property } from "../types";

// A.6 — Fundação no HubSpot (propriedades). Espelho do CRM.
export const properties: Property[] = [
  {
    name: "Score de Abordagem",
    object: "Empresa",
    type: 'Pontuação combinada ("Lead score Tier 2")',
    usage: "Gatilho das bandas do Tier 2",
  },
  {
    name: "Score de Prioridade",
    object: "Empresa",
    type: 'Pontuação combinada ("Lead score Tier 1")',
    usage: "Gatilho das bandas do Tier 1",
  },
  {
    name: "Ideal Customer Profile Tier",
    object: "Empresa",
    type: "Dropdown (Tier 1 / Tier 2)",
    usage: "Roteia a conta para o motor certo",
  },
  {
    name: "Target Account",
    object: "Empresa",
    type: "Booleano",
    usage: "Critério de inscrição em tudo",
  },
  {
    name: "Buying Role",
    object: "Contato",
    type: "Dropdown (Decisor / Influenciador / Usuário / Bloqueador)",
    usage: "Público de ads e penetração de comitê",
  },
  {
    name: "Resultado da reunião ABM",
    object: "Empresa",
    type: "Dropdown (Aguardando / Aderência-oportunidade real / Sem aderência / Sem resposta)",
    usage: "Gatilho da promoção Tier 2 → Tier 1",
  },
  {
    name: "Data da última atividade",
    object: "Contato",
    type: "Data (nativa)",
    usage: "Alimenta a penalidade nativa do Score de Prioridade",
  },
];

export const alwaysOn = {
  title: "Público always-on de ads",
  body:
    "Lista ativa de Contatos com Buying Role conhecido E empresa com Target Account = true, sincronizada com o LinkedIn (matched audience). Vale para os dois tiers e todas as etapas. É lista mais campanha mantida por Marketing.",
};

export const buildConventions: string[] = [
  "Objeto de inscrição = Empresa.",
  "Responsável = proprietário da empresa. No Tier 1, priorizar o proprietário do negócio.",
  "Tipos de task no HubSpot = Ligação, E-mail, Tarefa. LinkedIn e WhatsApp entram como Tarefa com prefixo no título.",
  "Nome do workflow = [ABM][<tier-etapa>] <nome> · Score <faixa>.",
  "Atrasos em dias úteis. D0 = dia da entrada.",
  "Reinscrição desligada nos movimentos (MOV). Registrar sempre toda atividade.",
];

export const buildChecklist: ChecklistItem[] = [
  { id: "chk-icp", group: "Fundação", label: "Popular Ideal Customer Profile Tier em todas as Target Accounts" },
  { id: "chk-scores", group: "Fundação", label: "Confirmar as duas propriedades de score publicadas" },
  { id: "chk-resultado", group: "Fundação", label: "Criar Resultado da reunião ABM" },
  { id: "chk-buyingrole", group: "Fundação", label: "Garantir Buying Role no comitê" },
  { id: "chk-alwayson", group: "Fundação", label: "Criar a lista always-on e sincronizar com o LinkedIn" },
  { id: "chk-t20", group: "Workflows (ordem)", label: "T2-0 Nutrição" },
  { id: "chk-t21", group: "Workflows (ordem)", label: "T2-1 Reconexão leve" },
  { id: "chk-t22", group: "Workflows (ordem)", label: "T2-2 Observação e valor" },
  { id: "chk-t23", group: "Workflows (ordem)", label: "T2-3 Abordagem p/ reunião" },
  { id: "chk-movpromo", group: "Workflows (ordem)", label: "MOV Promoção T2→T1" },
  { id: "chk-t11", group: "Workflows (ordem)", label: "T1-1 Ativação do comitê" },
  { id: "chk-t12", group: "Workflows (ordem)", label: "T1-2 Reengajamento" },
  { id: "chk-t13", group: "Workflows (ordem)", label: "T1-3 Fechamento BANT" },
  { id: "chk-movsaida", group: "Workflows (ordem)", label: "MOV Saída do Tier 1" },
  { id: "chk-teste", group: "Workflows (ordem)", label: "Testar cada banda com uma conta de teste" },
];
