// Narrativa das telas (prosa separada da UI). Playbook de operação do ABM.
// Sem eixo de esforço A/B/C e sem jargão: a presença constante do marketing
// é "comunicação de marketing".

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
      "Mesmo alvo, mesmo objetivo, mesma régua. Marketing e comercial perseguem as mesmas contas juntos e dividem o mesmo resultado, cada um com o seu papel.",
  },
  {
    id: "p4",
    title: "Orquestração em sequência",
    short:
      "Os anúncios fazem a marca ser reconhecida no comitê e preparam o terreno. O executivo de vendas conduz a conversa, com a sua abordagem, o seu tom e o seu relacionamento. O email reforça o valor e o evento captura intenção. O canal certo na hora certa.",
  },
  {
    id: "p5",
    title: "Medir por conta e pipeline",
    short:
      "Medimos engajamento de conta, penetração de comitê e pipeline criado, influenciado e acelerado. A leitura é sempre por conta-alvo, não por lead avulso.",
  },
];

export const teseModel =
  "É por isso que o modelo trabalha a conta, e não o lead solto: dois tiers para separar relacionamento de oportunidade, um score para cada um e o status que diz onde a conta está. Concentrar esforço nas contas certas, com o comitê inteiro à vista, é o que faz o ABM valer a pena.";

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
  {
    tier: "Tier 3",
    kicker: "prospecção US",
    who: "Contas frias ou mornas dos Estados Unidos, priorizadas para prospecção outbound ABM. Coorte mista: new logos e winback (ex-clientes BlueMetrics). Operação mais fria e escalável que o Tier 2.",
    score: "Score de Abordagem, herdado do Tier 2 (mesmos cortes de banda)",
    status: "Ativa enquanto está em prospecção. Sai para dormente, promovida a Tier 1, ou reciclada.",
    bands: "0-39 ativação fria · 40-59 primeiro toque · 60-74 sequência de ativação · 75+ pedido de reunião",
    focus: "Transformar dor percebida em baseline mensurável e abrir a primeira conversa, sob roteador canônico por banda.",
    deal: "Sem deal ainda. Vira Tier 1 quando a reunião tem aderência e há contato associado.",
  },
];

export const modeloSignals = [
  {
    id: "tier",
    icon: "Layers",
    title: "Tier / ICP",
    lead: "Diz quem a conta é.",
    detail: "O peso estratégico e o motor que roteia a conta. Tier 2 é relacionamento, Tier 1 é oportunidade com deal aberto, Tier 3 é prospecção fria de contas US (new logo e winback).",
  },
  {
    id: "score",
    icon: "Gauge",
    title: "Score do tier",
    lead: "Diz quão aquecida ela está.",
    detail: "No Tier 2 lemos o Score de Abordagem, no Tier 1 o Score de Prioridade, e o Tier 3 herda o Score de Abordagem do Tier 2. É o score que move a conta entre bandas.",
  },
  {
    id: "status",
    icon: "CircleDot",
    title: "Status ABM",
    lead: "Diz em que estado a conta está.",
    detail: "Ativa mantém a conta no processo. Dormente, cliente, perdida_reciclar, arquivada e perdida_arquivar encerram a permanência na esteira. É o status que separa uma conta em jogo de uma que saiu.",
  },
];

export const modeloCommittee = {
  title: "Trabalhamos o comitê em todo o ABM",
  body:
    "A decisão de compra passa por um time de pessoas, não por um contato. No Tier 2, alcançamos o comitê antes da primeira reunião para que a marca já seja conhecida quando a conversa começar. No Tier 1, seguimos penetrando o comitê do deal aberto: quanto mais gente da conta conhece a BlueMetrics, mais provável o fechamento. Por isso os anúncios rodam com frequência e segmentação nas pessoas-chave, enquanto o score diz a hora da abordagem do executivo.",
  stat: {
    value: "6 a 10",
    label: "pessoas no comitê de compra B2B",
    source: "Gartner",
    note: "Convencer um contato não fecha o negócio: o comitê inteiro precisa reconhecer a solução. Por isso alcançamos todos os decisores e influenciadores, nos dois tiers.",
  },
};

export const goldenRule = "Abordar sob sinal, nunca a frio.";
