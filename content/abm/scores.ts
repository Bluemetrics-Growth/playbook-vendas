import type { Score } from "../types";

// =========================================================================
// A.2 e A.3 — Os dois scores. Fonte da verdade: PRD Apendice A.
// Nao alterar numeros. Espelho do HubSpot.
// =========================================================================

// Bandas de cor reutilizadas no simulador, esteiras e jornada.
export const scoreAbordagem: Score = {
  id: "abordagem",
  tier: "Tier 2",
  object: "Empresa",
  title: "Score de Abordagem",
  subtitle: "Prontidão para conversa por comportamento (Tier 2).",
  categories: [
    {
      id: "conteudo",
      name: "Conteúdo e LPs",
      cap: 40,
      increments: [
        { id: "lp", event: "Cadastro em LP (deixou contato)", points: 20, note: "Sinal mais forte." },
        { id: "leadmagnet", event: "Cadastro em lead magnet", points: 12 },
        { id: "download", event: "Download de asset (ebook, estudo, case, material)", points: 8 },
      ],
    },
    {
      id: "anuncios",
      name: "Anúncios",
      cap: 20,
      increments: [
        { id: "clique-ad", event: "Clique em anúncio", points: 12 },
        { id: "impressao", event: "Impressão do anúncio", points: 8 },
      ],
    },
    {
      id: "recencia",
      name: "Recência e repetição",
      cap: 20,
      increments: [
        { id: "visita-repetida", event: "Visita repetida ao site ou LP (2ª vez ou mais)", points: 12 },
        { id: "retorno-7d", event: "Retorno ao site em menos de 7 dias", points: 8 },
      ],
    },
    {
      id: "sinal-leve",
      name: "Sinal comercial leve",
      cap: 20,
      increments: [
        { id: "resposta", event: "Resposta a email ou a mensagem de LinkedIn", points: 12 },
        { id: "clique-email", event: "Clique em email", points: 5 },
        { id: "abertura", event: "Abertura de email", points: 3 },
      ],
    },
  ],
  bands: [
    { min: 0, max: 39, label: "Nutrição", kind: "nurture", workflowId: "T2-0", note: "Só a camada always-on trabalha." },
    { min: 40, max: 59, label: "Reconexão leve", kind: "warm", workflowId: "T2-1" },
    { min: 60, max: 74, label: "Observação e valor", kind: "attention", workflowId: "T2-2" },
    { min: 75, max: 100, label: "Gatilho de reunião", kind: "trigger", workflowId: "T2-3", sla: "24h" },
  ],
  decay: { days: "21 a 30 dias sem sinal", points: -10 },
};

export const scorePrioridade: Score = {
  id: "prioridade",
  tier: "Tier 1",
  object: "Empresa",
  title: "Score de Prioridade",
  subtitle: "Prioridade e saúde do deal (Tier 1).",
  categories: [
    {
      id: "fit",
      name: "Fit da conta",
      cap: 30,
      increments: [
        { id: "funcionarios", event: "+1.000 funcionários", points: 10 },
        {
          id: "setor",
          event:
            "Setor da lista (Bancário, TI e serviços, Varejo, Internet, Serviços financeiros, Automotivo, Cosméticos, Telecom, Bens de consumo)",
          points: 10,
        },
        { id: "receita", event: "Receita anual ≥ R$ 100.000.000", points: 10 },
      ],
    },
    {
      id: "engajamento",
      name: "Engajamento e intenção",
      cap: 30,
      increments: [
        { id: "pagina", event: "Página visitada (bluemetrics.ai) / Calculadora / respondeu email", points: 10 },
        {
          id: "interacao",
          event: "Interação de anúncio ou social",
          points: 5,
          repeatable: true,
          unitLabel: "pessoa",
          maxCount: 6,
        },
      ],
    },
    {
      id: "pipeline",
      name: "Sinal comercial e pipeline",
      cap: 40,
      exclusive: true,
      increments: [
        { id: "negociacao", event: "Etapa = Negociação (Pibernat)", points: 20 },
        { id: "enviar-proposta", event: "Etapa = Enviar Proposta (Pibernat)", points: 15 },
        { id: "apresentacao", event: "Etapa = Apresentação Proposta Cliente (Pibernat)", points: 15 },
        { id: "ptc", event: "Etapa = Elaboração de PTC (Pibernat)", points: 10 },
      ],
    },
  ],
  bands: [
    { min: 0, max: 59, label: "Reengajamento", kind: "nurture", workflowId: "T1-2" },
    { min: 60, max: 79, label: "Campo de nutrição (ativação do comitê)", kind: "attention", workflowId: "T1-1" },
    { min: 80, max: 100, label: "Fechamento BANT", kind: "trigger", workflowId: "T1-3", sla: "24h" },
  ],
  penalty: [
    { minDays: 0, maxDays: 6, adjust: 0 },
    { minDays: 7, maxDays: 13, adjust: -5 },
    { minDays: 14, maxDays: 20, adjust: -10 },
    { minDays: 21, maxDays: 29, adjust: -15 },
    { minDays: 30, maxDays: null, adjust: -20, note: "Sinaliza revisão da saúde do deal." },
  ],
};

export const scores = { abordagem: scoreAbordagem, prioridade: scorePrioridade };

// Preset do Tier 1: reproduz o mecanismo do exemplo canonico
// "deal quente que fica 14 dias mudo cai da banda de fechamento (80+) para a
//  nutricao do Tier 1, sem rebaixar de tier". O material cita 84 -> 74.
// O modelo de incrementos opera em multiplos de 5, entao o preset reproduz o
// mesmo efeito com numeros alcancaveis (80 -> 70). Ver nota no simulador.
export const tier1Preset = {
  selected: {
    funcionarios: true,
    setor: true,
    receita: true,
    pagina: true,
    interacao: 4, // +5 x 4 pessoas = 20 (cap 30 com o +10 acima => 30)
    negociacao: true,
  } as Record<string, boolean | number>,
  inactivityDays: 14,
  label: 'Deal quente, 14 dias mudo (exemplo "84 → 74")',
};
