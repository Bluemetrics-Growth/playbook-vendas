import type { Tier3Decision, Tier3Point, Tier3Stage } from "../types";

// =========================================================================
// Seção Tier 3: prospecção ABM para contas dos Estados Unidos.
// Fonte da verdade: PRD "Expansão do Playbook ABM para Tier 3".
// Regra editorial: separar regra confirmada de decisão em aberto. Não inventar
// nomes, enums, thresholds ou automações não confirmadas. O Tier 3 é extensão
// do framework atual, não uma máquina paralela isolada.
// =========================================================================

export const tier3Intro =
  "O Tier 3 é a camada de prospecção ABM para contas frias ou mornas, com abordagem de escala controlada, orientada a valor, para gerar ativação, resposta e eventual evolução para oportunidade real. Nasce para atender a prospecção outbound de contas dos Estados Unidos e reaproveita a lógica já consolidada de Tier 1 e Tier 2. A prioridade aqui não é redesenhar a estratégia, é traduzir para operação treinável a lógica já construída para o mercado US.";

// 15.1 Visão geral
export const tier3Overview: Tier3Point[] = [
  {
    title: "Propósito",
    body: "Colocar contas frias e mornas em observação ativa e ativá-las por valor, até gerar resposta e um pedido de reunião qualificado. Operação mais fria e escalável que Tier 1 e Tier 2.",
  },
  {
    title: "Público-alvo",
    body: "Contas dos Estados Unidos priorizadas para prospecção outbound ABM, que ainda não estão em operação ativa de deal como Tier 1. O owner operacional vem do Company owner.",
  },
  {
    title: "Coorte mista: new logo + winback",
    body: "New logos são empresas que ainda não foram clientes. Winback são ex-clientes BlueMetrics que voltam para reativação. O winback é subtipo de coorte, não um tier separado: segue a mesma lógica do frio, sem motor paralelo.",
  },
  {
    title: "Diferença para Tier 1 e Tier 2",
    body: "Tier 1 é oportunidade com deal aberto (Score de Prioridade). Tier 2 é relacionamento na rede dos executivos, com fit garantido na entrada. Tier 3 é prospecção US mais fria: entra sem relacionamento prévio garantido e sobe por comportamento no mesmo Score de Abordagem do Tier 2.",
  },
  {
    title: "Extensão, não máquina paralela",
    body: "O Tier 3 é tratado como extensão do framework atual. Reaproveita banda, score, roteador e movimentos já desenhados. Onde algo diverge, prevalece o HubSpot.",
  },
];

// 15.2 Arquitetura lógica
export const tier3Architecture: Tier3Point[] = [
  {
    title: "Score herdado do Tier 2",
    body: "O Tier 3 usa o Score de Abordagem como base de classificação. Não há score novo, a menos que seja solicitado depois. A leitura de intenção e prioridade é a mesma do Tier 2.",
  },
  {
    title: "Bandas herdadas do Tier 2",
    body: "Os cortes de banda são os mesmos: 0-39, 40-59, 60-74, 75-100. As bandas roteiam para T3-0, T3-1, T3-2 e T3-3, respectivamente.",
  },
  {
    title: "Roteador canônico por banda",
    body: "Uma única entrada por tier lê a banda atual e faz a inscrição atômica na esteira certa. Inscreve por cruzamento de limiar (score subiu e cruzou 40, 60 ou 75), nunca por um genérico score mudou.",
  },
  {
    title: "Auto-desinscrição por mudança de banda",
    body: "Ao mudar de banda, a conta é removida da esteira anterior antes de entrar na nova. Assim nunca fica ativa em duas esteiras ao mesmo tempo.",
  },
  {
    title: "Promoção para Tier 1",
    body: "Quando a reunião tem aderência e oportunidade real, a conta é promovida: cria-se o deal no Pipeline Pibernat e a task de handoff. A promoção exige contato associado à empresa.",
  },
  {
    title: "Dormência e reciclagem",
    body: "Contas sem avanço saem da esteira ativa para dormência, com rechecagem de banda antes de concluir. A reciclagem futura é decisão humana, no próximo ciclo.",
  },
];

// 15.3 Esteiras do Tier 3
export const tier3Stages: Tier3Stage[] = [
  {
    id: "t3-0",
    workflowId: "T3-0",
    name: "T3-0 · Ativação fria",
    band: "0-39",
    bandKind: "nurture",
    objetivo:
      "Colocar a conta elegível em observação ativa e preparar a entrada na esteira sem atrito alto.",
    gatilhoEntrada:
      "Roteador T3 com banda 0-39. Permanência: ICP = Tier 3 E Score de Abordagem ≤ 39 E Status ABM = ativa.",
    permanencia:
      "Enquanto a conta segue Tier 3, com score ≤ 39 e status ativa. Checkpoints validam se ainda faz sentido manter.",
    saida:
      "Score cruza 40 (vai para T3-1), ICP sai de Tier 3, status sai de ativa, ou o corte de permanência leva à dormência.",
    canais:
      "Comunicação de marketing no comitê US (LinkedIn Ads). Ainda sem toque humano. Tarefas de revisão nos checkpoints.",
    proximoEstado: "T3-1 (score cruza 40) ou Dormência Tier 3.",
    guardrails:
      "Checkpoint tratado em 30 dias corridos na implementação citada. Prazo sujeito a decisão final (ver pendências).",
  },
  {
    id: "t3-1",
    workflowId: "T3-1",
    name: "T3-1 · Primeiro toque frio",
    band: "40-59",
    bandKind: "warm",
    objetivo:
      "Fazer a primeira ativação consultiva da conta com abordagem fria, foco em dor e resultado.",
    gatilhoEntrada: "Score de Abordagem cruza 40 numa conta Tier 3 ativa.",
    permanencia: "Banda 40-59. O roteador move assim que o score cruza outro limiar.",
    saida: "Score cruza 60 (vai para T3-2) ou cai e volta para T3-0.",
    canais:
      "Email 1:1 consultivo em inglês nativo, seguido de LinkedIn no mesmo ângulo se não houver resposta.",
    proximoEstado: "T3-2 (score cruza 60).",
    guardrails:
      "Baixo atrito, sem pitch de features e sem pressão de agenda. Exceção deliberada à regra de ouro: o toque abre frio, mas a reunião ainda depende de sinal.",
  },
  {
    id: "t3-2",
    workflowId: "T3-2",
    name: "T3-2 · Sequência de ativação",
    band: "60-74",
    bandKind: "attention",
    objetivo:
      "Dar continuidade à ativação com cadência multicanal orientada a baseline, ROI e mini-diagnóstico.",
    gatilhoEntrada: "Score de Abordagem cruza 60 numa conta Tier 3 ativa.",
    permanencia: "Banda 60-74, enquanto a conta responde ou usa os instrumentos.",
    saida: "Usar o instrumento ou responder faz o score cruzar 75 e o roteador move para T3-3.",
    canais:
      "Email 1:1 de observação e valor, follow-up em LinkedIn no mesmo ângulo, WhatsApp apenas se já houve resposta anterior.",
    proximoEstado: "T3-3 (score cruza 75).",
    guardrails:
      "Conectar dor a resultado concreto com benchmark real do segmento. Sem discurso de feature, sem pedido prematuro de reunião.",
  },
  {
    id: "t3-3",
    workflowId: "T3-3",
    name: "T3-3 · Pedido de reunião",
    band: "75-100",
    bandKind: "trigger",
    objetivo: "Converter interesse validado em conversa comercial qualificada.",
    gatilhoEntrada: "Score de Abordagem cruza 75 numa conta Tier 3 ativa. SLA de 24h.",
    permanencia: "Banda 75-100 durante a sequência de pedido de reunião.",
    saida:
      "Respondeu ou marcou: preenche Resultado da reunião ABM. Sem resposta: volta à banda anterior ou entra em dormência.",
    canais:
      "Email 1:1 com gancho no sinal recente, LinkedIn com novo ângulo se não responder, break-up leve ao fim.",
    proximoEstado: "Promoção T3→T1 se aderência, ou retorno de banda / dormência.",
    guardrails:
      "A conta já passou por ativação suficiente. Aqui a regra de ouro volta a valer: aborda-se sob sinal, com gancho no comportamento recente.",
  },
  {
    id: "t3-dorm",
    workflowId: "MOV-DORM-T3",
    name: "Dormência Tier 3",
    bandKind: "nurture",
    objetivo:
      "Retirar da esteira ativa as contas sem avanço, reduzir ruído operacional e preparar reciclagem futura.",
    gatilhoEntrada:
      "Conta Tier 3 sem avanço após o corte de permanência. Referência prática de espera segura: 90 dias.",
    permanencia:
      "Antes de dormir, recheca se a conta ainda permanece na mesma banda/faixa.",
    saida:
      "Confirmada a dormência, Status ABM = dormente e a conta sai das esteiras ativas. Nova subida relevante de score reativa via roteador.",
    canais: "Automação e tarefa de revisão de reciclagem futura por decisão humana.",
    proximoEstado: "Reciclagem futura (decisão humana) ou reativação por novo sinal.",
    guardrails:
      "Prazo (corridos x úteis) sujeito a decisão final. Reentrada exige recomputar ou resetar o Score de Abordagem.",
  },
];

// 15.4 Regras de conteúdo
export const tier3ContentRules: string[] = [
  "Abordagem consultiva, mesmo na porta fria.",
  "Baseline e benchmark reais do segmento, nunca inventados.",
  "Conexão explícita entre dor e resultado mensurável.",
  "Oferta de mini-diagnóstico como próximo passo leve.",
  "Baixa fricção: você monta, a conta só recebe.",
  "Sem pitch prematuro de produto ou features.",
  "Sem pedir reunião cedo demais. O pedido é T3-3, sob sinal.",
  "Mensagens em inglês nativo e idiomático para o mercado US.",
  "Winback: histórico verdadeiro e leve, sem cobrança.",
];

// 15.5 Transições e estados
export const tier3Transitions: Tier3Point[] = [
  {
    title: "Quando a conta entra em Tier 3",
    body: "Quando o ICP é marcado como Tier 3 e o Status ABM está ativa. O roteador lê a banda pelo Score de Abordagem e inscreve na esteira certa.",
  },
  {
    title: "Quando muda de banda",
    body: "Quando o Score de Abordagem cruza um limiar (sobe e cruza 40, 60 ou 75). O roteador desinscreve da esteira anterior e inscreve na nova, de forma atômica.",
  },
  {
    title: "Quando avança de esteira",
    body: "T3-0 → T3-1 aos 40, T3-1 → T3-2 aos 60, T3-2 → T3-3 aos 75. O avanço é por cruzamento de limiar, não por oscilação marginal.",
  },
  {
    title: "Quando fica dormente",
    body: "Sem avanço após o corte de permanência, com a banda rechecada. A conta sai das esteiras ativas e o status vira dormente.",
  },
  {
    title: "Quando recicla",
    body: "Na reentrada, o Score de Abordagem é recomputado ou resetado antes de rotear, para score residual não recolocar a conta numa banda inadequada. A reciclagem é decisão humana.",
  },
  {
    title: "Quando promove para Tier 1",
    body: "Quando Resultado da reunião ABM = Aderência-oportunidade real E existe contato associado à empresa. Cria-se o deal no Pibernat e a task de handoff para o Company owner.",
  },
];

// Pré-requisitos de cada mudança sensível
export const tier3Prereqs: string[] = [
  "Mudança de banda: cruzamento de limiar do Score de Abordagem e conta ainda elegível (Tier 3, ativa).",
  "Pedido de reunião (T3-3): sinal recente real (uso de instrumento, resposta ou visita), citável no toque.",
  "Promoção para Tier 1: aderência na reunião, contato associado à empresa e deal criável no Pibernat.",
  "Dormência: rechecagem de banda antes de concluir, para não dormir uma conta que reaqueceu.",
  "Reentrada: recomputar ou resetar o Score de Abordagem antes de rotear.",
];

// 14 Guardrails obrigatórios
export const tier3Guardrails: Tier3Point[] = [
  {
    title: "Sem duplicidade de esteiras",
    body: "A mesma conta não pode ficar ativa em múltiplas esteiras incompatíveis ao mesmo tempo. O roteador desinscreve da anterior antes de inscrever na nova.",
  },
  {
    title: "Anti-thrashing",
    body: "Mitigar idas e vindas rápidas entre estados (ativa x dormente, banda A x banda B) por oscilações marginais. Promover de banda só por subida relevante e cruzamento de limiar.",
  },
  {
    title: "Reentrada segura",
    body: "Recomputar ou resetar o Score de Abordagem na reentrada. Score residual não pode recolocar a conta numa banda aleatória ou inadequada.",
  },
  {
    title: "Campo de banda é dívida técnica",
    body: "A propriedade ABM Banda atual ainda existe como texto. Texto livre aumenta o risco de inconsistência de valores e de roteamento. Idealmente evoluir para seleção controlada.",
  },
  {
    title: "Closed-lost e saída",
    body: "A lógica de saída usa os motivos reais já existentes, separando reciclagem de arquivamento. Não reinventar enums.",
  },
];

// 17 Decisões em aberto
export const tier3Decisions: Tier3Decision[] = [
  {
    id: "d-dormencia",
    title: "Dormência em dias úteis ou corridos",
    body: "Há divergência entre trechos que falam em 30/60/90 dias e outros que falam em 30 dias úteis. O T3-0 aparece com 30 dias corridos como comportamento atual, mas o padrão exato ainda não está fechado.",
    status: "pendente",
  },
  {
    id: "d-reciclagem",
    title: "Reciclagem de closed-lost para Tier 2",
    body: "A seletividade por motivo de perda já foi discutida, mas precisa permanecer documentada como decisão arquitetural sensível, não como regra fechada.",
    status: "pendente",
  },
  {
    id: "d-estagio-deal",
    title: "Estágio inicial do deal no Pibernat",
    body: "Qual estágio o deal assume ao ser criado na promoção. Ponto de definição final caso ainda não esteja travado. Não travar sem confirmação.",
    status: "pendente",
  },
  {
    id: "d-t2-4",
    title: "Definição de T2-4 e relação com always-on",
    body: "Ainda há dúvida se T2-4 é uma banda, um workflow autônomo ou parte de T2-0, e como isso conversa com listas always-on.",
    status: "pendente",
  },
  {
    id: "d-leadscores",
    title: "Validação completa dos leadscores",
    body: "A estrutura está parcialmente confirmada, mas a auditoria integral das regras dos dois scores ainda não foi concluída. Usar a estrutura acordada como referência e sinalizar onde depende de validação.",
    status: "pendente",
  },
  {
    id: "d-guardrails",
    title: "Guardrails de reentrada, desinscrição e anti-thrashing",
    body: "São requisitos explícitos de arquitetura e devem ser mantidos como tal, mesmo enquanto a implementação final ainda depende de ajustes finos.",
    status: "confirmado",
  },
];

// Regra de winback (13)
export const tier3Winback = {
  title: "Winback dentro da mesma lógica do frio",
  body: "As contas de ex-clientes BlueMetrics dentro do Tier 3 seguem a mesma lógica operacional do frio, sem bifurcação estrutural obrigatória neste momento. Trate o winback como subtipo de coorte, explicite que a origem pode ser ex-cliente BM e adapte os exemplos de abordagem quando fizer sentido, sem criar um motor lógico paralelo.",
};
