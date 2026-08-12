// Tópico 3 — Simulador de Score. Conteúdo operacional do "como ler o score".
// A decisão não nasce de um eixo conceitual: nasce da combinação entre
// tier/ICP, score do tier e Status ABM. Espelho da lógica atual do roteador
// e do workflow [ABM][T2-0] Nutrição com checkpoints de saída.

export interface Signal {
  id: string;
  icon: string; // nome de icone lucide-react
  label: string;
  question: string;
  property: string;
  detail: string;
}

// Seção 2 — Os 3 sinais que importam.
export const readingSignals: Signal[] = [
  {
    id: "tier",
    icon: "Layers",
    label: "Tier / ICP",
    question: "Quem a conta é?",
    property: "Ideal Customer Profile Tier",
    detail:
      "Diz o peso estratégico e qual motor roteia a conta. Tier 2 é relacionamento, Tier 1 é oportunidade com deal aberto.",
  },
  {
    id: "score",
    icon: "Gauge",
    label: "Score do tier",
    question: "Quão aquecida ela está?",
    property: "Score de Abordagem (Tier 2) ou Score de Prioridade (Tier 1)",
    detail:
      "Diz o nível de sinal. Cada tier tem o seu score. No Tier 2 você lê o Score de Abordagem, no Tier 1 o Score de Prioridade.",
  },
  {
    id: "status",
    icon: "CircleDot",
    label: "Status ABM",
    question: "Ela ainda segue ativa no processo?",
    property: "Status ABM",
    detail:
      "Diz o estado operacional. Só ativa permite permanência na esteira. Dormente, cliente, perdida ou arquivada encerram a permanência.",
  },
];

// Copy de abertura e regra central (Seção 1 e explicação central).
export const simuladorCopy = {
  teaches:
    "Este tópico ensina a transformar score em decisão operacional. Em vez de decorar uma matriz teórica, você vai ler a conta com base nos três sinais que realmente movem o processo: tier, score e Status ABM. É essa leitura combinada que orienta prioridade, abordagem e permanência na esteira.",
  central:
    "O score nunca deve ser lido sozinho. No ABM da BlueMetrics, a decisão sempre depende da combinação entre o tier da conta, o score aplicável e o Status ABM atual. Score sozinho não roteia a conta: ele ganha significado dentro do contexto de tier e status.",
  consequence:
    "Prioridade e abordagem não são eixos que você escolhe. São consequência da leitura. O tier dá o peso estratégico, o score dá o aquecimento, o status diz se a conta segue no jogo. A combinação dos três é que define a prioridade prática e a abordagem recomendada.",
};

// Seção 3 — Como interpretar a combinação (leitura por faixa e desfecho).
export interface ReadingRow {
  situation: string;
  reading: string;
  action: string;
  kind: "nurture" | "warm" | "attention" | "trigger";
}

export const readingTable: ReadingRow[] = [
  {
    situation: "Tier 2 · score 0-39 · ativa",
    reading: "Conta em nutrição",
    action: "Manter aquecimento e seguir os checkpoints da esteira.",
    kind: "nurture",
  },
  {
    situation: "Tier 2 · score > 39 · ativa",
    reading: "Conta evoluiu além da faixa T2-0",
    action: "Deixa de permanecer na T2-0 e segue para nova avaliação no roteador.",
    kind: "warm",
  },
  {
    situation: "ICP vira Tier 1 ou Tier 3",
    reading: "Conta mudou de enquadramento",
    action: "Sai da leitura de T2-0 e passa a outra lógica operacional.",
    kind: "attention",
  },
  {
    situation: "Status ABM diferente de ativa",
    reading: "Conta saiu da condição de permanência",
    action: "Encerra a permanência nesta esteira.",
    kind: "trigger",
  },
];

// Seção 4 — Exemplo real: T2-0.
export const t20Example = {
  workflowId: "T2-0",
  stay: {
    title: "Quando a conta permanece",
    conditions: [
      "ICP = Tier 2",
      "Score de Abordagem entre 0 e 39",
      "Status ABM = ativa",
    ],
    note:
      "As três condições valem ao mesmo tempo. Enquanto seguirem verdadeiras, a conta continua em nutrição de baixa intensidade e só o always-on trabalha.",
  },
  leave: {
    title: "Quando a conta sai",
    conditions: [
      "Score de Abordagem passa de 39",
      "ICP muda para Tier 1 ou Tier 3",
      "Status ABM deixa de ser ativa (dormente, cliente, perdida_reciclar, arquivada, perdida_arquivar)",
    ],
    note:
      "Basta uma condição mudar. A conta deixa de permanecer nessa lógica e precisa ser reavaliada pelo processo.",
  },
  copy:
    "Na esteira T2-0, a conta permanece em nutrição quando continua Tier 2, mantém score de 0 a 39 e segue com Status ABM ativa. Se qualquer uma dessas condições mudar, ela deixa de permanecer nessa lógica e precisa ser reavaliada pelo processo.",
};

// Seção 5 — O que acontece com o tempo (checkpoints em dias úteis).
export interface Checkpoint {
  day: string;
  title: string;
  detail: string;
}

export const t20Checkpoints: Checkpoint[] = [
  {
    day: "30 dias úteis",
    title: "Tarefa de revisão",
    detail:
      "Confirmar se a conta ainda é Tier 2, segue com score ≤ 39 e status ABM ativa.",
  },
  {
    day: "60 dias úteis",
    title: "Toque leve",
    detail:
      "Um sinal de valor da dor do segmento, sem pitch e sem pedir reunião.",
  },
  {
    day: "90 dias úteis",
    title: "Marca dormente",
    detail:
      "Status ABM passa para dormente e a conta sai da esteira. Cria tarefa de revisão trimestral.",
  },
];

export const checkpointsCopy =
  "Permanecer em nutrição não significa inércia. Se a conta seguir elegível em T2-0, o processo cria checkpoints em 30, 60 e 90 dias úteis para confirmar se ainda faz sentido manter aquecimento, dar um toque leve ou encerrar a permanência nessa esteira.";

// Seção 6 — Erros comuns de leitura.
export const readingMistakes: string[] = [
  "Olhar só o score e ignorar tier e status.",
  "Ignorar a mudança de tier: uma conta que virou Tier 1 ou Tier 3 já não se lê pela régua da T2-0.",
  "Ignorar o Status ABM: score baixo com status fora de ativa não é nutrição, é saída.",
  "Assumir que toda conta com score maior vai para o mesmo destino. O destino depende da leitura combinada.",
];

// Seção 7 — Checkpoint final (validação operacional do tópico).
export const validationQuestions: string[] = [
  "Em qual tier essa conta está?",
  "Qual score eu devo olhar para esta conta?",
  "O score indica nutrição, avanço ou saída?",
  "O Status ABM ainda permite permanência na esteira?",
  "Qual é a próxima ação operacional esperada?",
];
