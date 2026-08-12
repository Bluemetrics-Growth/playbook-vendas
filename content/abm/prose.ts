// Narrativa das telas (prosa separada da UI). Playbook de operação: o motion
// já roda no HubSpot. Sem eixo de esforço A/B/C e sem jargão: a presença
// constante é "comunicação de marketing".

export interface Principle {
  id: string;
  title: string;
  short: string;
}

export const tesePrinciples: Principle[] = [
  {
    id: "p1",
    title: "Conta como unidade",
    short:
      "A unidade de trabalho é a conta e o seu comitê, não o lead solto. Queremos que todos os decisores e influenciadores conheçam a BlueMetrics, não uma pessoa só.",
  },
  {
    id: "p2",
    title: "Presença constante, abordagem no momento certo",
    short:
      "O marketing mantém a comunicação sempre presente no comitê, com frequência e segmentação. O toque humano do executivo entra quando o score do tier indica prontidão. Cada tier tem o seu score.",
  },
  {
    id: "p3",
    title: "Marketing e comercial, co-donos",
    short:
      "Um único motion, dois donos, a mesma régua e o mesmo ritual. Marketing e comercial olham as mesmas contas juntos e dividem o mesmo resultado.",
  },
  {
    id: "p4",
    title: "Orquestração em sequência",
    short:
      "Os anúncios preparam o comitê e mantêm a marca presente, o toque humano dá o lift, o email amplifica e o evento captura intenção. O canal certo na hora certa.",
  },
  {
    id: "p5",
    title: "Medir por conta e pipeline",
    short:
      "Medimos engajamento de conta, penetração de comitê e pipeline criado, influenciado e acelerado. A leitura é sempre por conta-alvo, não por lead avulso.",
  },
];

export const teseEconomics =
  "A economia que puxa ABM: ticket alto, ciclo longo e comitê amplo. Quando poucos negócios movem a agulha e a decisão passa por várias pessoas, faz sentido concentrar esforço nas contas certas em vez de espalhar disparos.";

export const teseContrast = {
  net: {
    title: "Pescar com rede",
    subtitle: "Demand gen tradicional",
    points: [
      "Volume: muitos leads, pouca qualificação.",
      "Mensagem genérica para um público amplo.",
      "Foco em um contato, não no comitê.",
      "Marketing entrega leads, vendas reclama da qualidade.",
    ],
  },
  spear: {
    title: "Pescar com lança",
    subtitle: "ABM",
    points: [
      "Foco: contas-alvo com fit garantido.",
      "Mensagem por conta, ancorada na dor e no sinal.",
      "Comitê inteiro alcançado com frequência e segmentação.",
      "Marketing e comercial co-donos do mesmo resultado.",
    ],
  },
};

// Modelo: quem a conta é (tier/ICP), quão aquecida está (score do tier) e se
// segue no jogo (status ABM). O movimento acontece por score e status.
export const modeloTiers = [
  {
    tier: "Tier 2",
    kicker: "relacionamento",
    who:
      "Rede dos executivos. Empresas com fit (ICP) e cargo relevante que o executivo já conhece, mas que ainda não conhecem a BlueMetrics. Fit garantido na entrada, não é público frio.",
    score: "Score de Abordagem (prontidão por comportamento)",
    status: "Ativa enquanto está em relacionamento. Sai para dormente, cliente, perdida ou arquivada.",
    bands: "0-39 nutrição · 40-59 reconexão leve · 60-74 observação · 75+ gatilho de reunião",
    focus: "Fazer o comitê conhecer a marca e abrir a primeira conversa no sinal certo.",
    deal: "Sem deal ainda. Vira Tier 1 quando a reunião tem aderência.",
  },
  {
    tier: "Tier 1",
    kicker: "oportunidade",
    who: "Conta com deal aberto no Pipeline Pibernat e orçamento emitido. Comercial é dono do deal.",
    score: "Score de Prioridade (prioridade e saúde do deal)",
    status: "Segue ativa com o deal aberto. O deal fechado é que encerra o Tier 1.",
    bands: "0-59 reengajamento · 60-79 ativação do comitê · 80+ fechamento",
    focus: "Penetrar o comitê inteiro e sustentar a prioridade do deal até o fechamento.",
    deal: "Deal aberto garante a permanência. Nunca é rebaixado. Só sai quando o deal fecha.",
  },
];

export const modeloSignals = [
  {
    id: "tier",
    icon: "Layers",
    title: "Tier / ICP",
    question: "Quem a conta é?",
    detail: "O peso estratégico e o motor que roteia a conta. Tier 2 é relacionamento, Tier 1 é oportunidade com deal aberto.",
  },
  {
    id: "score",
    icon: "Gauge",
    title: "Score do tier",
    question: "Quão aquecida ela está?",
    detail: "Cada tier tem o seu score. No Tier 2 lemos o Score de Abordagem, no Tier 1 o Score de Prioridade. É o score que move a conta entre bandas.",
  },
  {
    id: "status",
    icon: "CircleDot",
    title: "Status ABM",
    question: "Ela segue ativa no processo?",
    detail: "O estado operacional da conta. Só ativa permite permanência na esteira. Dormente, cliente, perdida ou arquivada encerram a permanência.",
  },
];

export const modeloCommittee =
  "Não trabalhamos um contato, trabalhamos o comitê. A meta é que todos os decisores e influenciadores da conta já conheçam a BlueMetrics antes da primeira conversa. Por isso os anúncios rodam com frequência e segmentação para alcançar as pessoas-chave da empresa, enquanto o score diz a hora do toque humano.";

export const tier2Decisions = [
  {
    threshold: "40-74",
    title: "Aquecimento e reconexão",
    detail: "O executivo faz toques leves, sem pitch. O marketing segue presente no comitê. A conta sobe de banda conforme dá sinais.",
  },
  {
    threshold: "75",
    title: "Pedido de reunião",
    detail: "Gatilho oficial, SLA 24h. Aqui a conta vira SQL e entra na sequência de reunião.",
  },
];

export const goldenRule = "Abordar sob sinal, nunca a frio.";
