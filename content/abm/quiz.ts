import type { QuizQuestion } from "../types";

// Checkpoint final (PRD Seção 8). Sem nota formal, é reforço.
// Foco nos pontos que mais confundem.
export const checkpoint: QuizQuestion[] = [
  {
    id: "q1",
    question: "Qual a diferença entre Tier 1/Tier 2 e A/B/C?",
    options: [
      "São a mesma coisa, só nomes diferentes.",
      "Tier 1/Tier 2 é roteamento e cadência; A/B/C é quanto esforço.",
      "A/B/C define o tier automaticamente.",
      "Tier 1/Tier 2 é o nível de esforço; A/B/C é o roteamento.",
    ],
    answer: 1,
    explanation:
      "Tier 1/Tier 2 é roteamento e cadência (qual motor). A/B/C é o eixo de esforço (Strategic, Lite, Programmatic). Uma conta Tier 1 pode ser A, B ou C.",
  },
  {
    id: "q2",
    question: "O que governa cada tier?",
    options: [
      "Tier 1 pelo Score de Abordagem; Tier 2 pelo Score de Prioridade.",
      "Ambos pelo mesmo score.",
      "Tier 2 pelo Score de Abordagem; Tier 1 pelo Score de Prioridade.",
      "Nenhum tem score, é decisão manual.",
    ],
    answer: 2,
    explanation:
      "Tier 2 (relacionamento) usa o Score de Abordagem (prontidão). Tier 1 (oportunidade) usa o Score de Prioridade (prioridade e saúde do deal).",
  },
  {
    id: "q3",
    question: "No Tier 2, o que acontece quando a conta cruza 75?",
    options: [
      "Vira Customer.",
      "Dispara o gatilho de reunião: Lifecycle = SQL, abordagem com SLA 24h.",
      "Entra na nutrição automática.",
      "É rebaixada para reconexão leve.",
    ],
    answer: 1,
    explanation:
      "75 é o pedido de reunião (gatilho oficial). Lifecycle vira SQL e a abordagem tem SLA de 24h, com sequência de reunião de 8 a 14 dias.",
  },
  {
    id: "q4",
    question: "O que promove uma conta de Tier 2 para Tier 1?",
    options: [
      "Cruzar 60 no Score de Abordagem.",
      "Uma reunião com aderência (Resultado da reunião ABM = Aderência-oportunidade real).",
      "Qualquer resposta de email.",
      "Marcar Buying Role no comitê.",
    ],
    answer: 1,
    explanation:
      "A promoção acontece quando a reunião tem aderência. Aí grava o tier, cria o deal no Pibernat e Lifecycle = Opportunity.",
  },
  {
    id: "q5",
    question: "O que a penalidade por inatividade faz no Tier 1?",
    options: [
      "Rebaixa a conta para Tier 2.",
      "Fecha o deal como perdido.",
      "Move a conta entre bandas do Tier 1 sem rebaixar o tier.",
      "Não tem efeito no score.",
    ],
    answer: 2,
    explanation:
      "A penalidade derruba o score e move a conta entre bandas do Tier 1. O deal aberto mantém a conta no Tier 1: nunca é rebaixada para Tier 2.",
  },
  {
    id: "q6",
    question: 'No exemplo canônico, um deal em 84 que fica 14 dias mudo:',
    options: [
      "Cai para 74, sai do fechamento e volta à nutrição do Tier 1.",
      "Vira Tier 2 novamente.",
      "Mantém 84 porque o deal está aberto.",
      "Sobe para 94 pela urgência.",
    ],
    answer: 0,
    explanation:
      "A penalidade de 14 dias é -10. O deal cai de 84 para 74, sai da banda de fechamento (80+) e volta à nutrição do Tier 1, sem rebaixar de tier.",
  },
  {
    id: "q7",
    question: "Qual a regra de ouro da abordagem no Tier 2?",
    options: [
      "Abordar o quanto antes, mesmo a frio.",
      "Abordar sob sinal, nunca a frio.",
      "Só abordar depois de 30 dias.",
      "Deixar o marketing abordar sempre.",
    ],
    answer: 1,
    explanation:
      "A regra de ouro é abordar sob sinal, nunca a frio. Abaixo de 50, só a camada always-on trabalha. 50 é a entrada leve do executivo.",
  },
  {
    id: "q8",
    question: "O que a camada always-on (air cover) faz?",
    options: [
      "Só roda no Tier 1.",
      "É um workflow que dispara por banda.",
      "Ads no comitê inteiro, sempre ligada, nos dois tiers e em todas as etapas.",
      "Substitui o toque humano.",
    ],
    answer: 2,
    explanation:
      "O always-on é uma lista ativa (não workflow) de ads no comitê inteiro, sincronizada com o LinkedIn. Vale para os dois tiers e todas as etapas.",
  },
];
