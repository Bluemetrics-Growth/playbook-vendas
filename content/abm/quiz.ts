import type { QuizQuestion } from "../types";

// Banco de perguntas do "Teste seus conhecimentos". Cada teste sorteia um
// subconjunto (ver quizConfig.perTest) de forma aleatória, então o tamanho do
// banco não fica exposto para quem responde. Foco em exemplos práticos.
export const quizConfig = {
  perTest: 5,
};

export const questionBank: QuizQuestion[] = [
  {
    id: "q-tier-score",
    question: "Que score você lê para cada tier?",
    options: [
      "Tier 1 pelo Score de Abordagem; Tier 2 pelo Score de Prioridade.",
      "Tier 2 pelo Score de Abordagem; Tier 1 pelo Score de Prioridade.",
      "Ambos pelo mesmo score.",
      "Nenhum tem score, é decisão manual.",
    ],
    answer: 1,
    explanation:
      "Tier 2 (relacionamento) usa o Score de Abordagem (prontidão). Tier 1 (oportunidade) usa o Score de Prioridade (prioridade e saúde do deal).",
  },
  {
    id: "q-tres-sinais",
    question: "Quais são os três sinais que movem uma conta no ABM?",
    options: [
      "Tier, número de contatos e cliques.",
      "Tier/ICP, score do tier e Status ABM.",
      "Score, cargo e setor.",
      "Abordagem, prioridade e esforço.",
    ],
    answer: 1,
    explanation:
      "A decisão nasce da combinação de tier/ICP (quem a conta é), score do tier (quão aquecida) e Status ABM (se segue ativa).",
  },
  {
    id: "q-t20-permanencia",
    question: "O que mantém uma conta na esteira de nutrição T2-0?",
    options: [
      "Só o score estar entre 0 e 39.",
      "ICP = Tier 2 E Score de Abordagem ≤ 39 E Status ABM = ativa, ao mesmo tempo.",
      "O Status ABM estar como dormente.",
      "Qualquer conta Tier 2, independente de score e status.",
    ],
    answer: 1,
    explanation:
      "A permanência na T2-0 depende dos três sinais juntos: Tier 2, score ≤ 39 e Status ABM ativa. Se qualquer um muda, a conta sai da esteira.",
  },
  {
    id: "q-t20-saida-score",
    question:
      "Uma conta Tier 2 na nutrição T2-0 cruza o Score de Abordagem de 39 para 45. O que acontece?",
    options: [
      "Nada, ela continua na T2-0.",
      "Ela sai da T2-0 e segue para nova avaliação no roteador (banda de reconexão).",
      "Ela é rebaixada para Tier 3.",
      "O deal é criado automaticamente.",
    ],
    answer: 1,
    explanation:
      "Score acima de 39 tira a conta da faixa T2-0. Ela deixa de permanecer nessa lógica e é reavaliada; na prática, entra na banda de reconexão (40-59).",
  },
  {
    id: "q-t20-status",
    question:
      "Uma conta está em T2-0 com score 20, mas o Status ABM muda de ativa para dormente. O que muda?",
    options: [
      "Continua na nutrição, porque o score ainda é baixo.",
      "Encerra a permanência na esteira: status fora de ativa é critério de saída.",
      "Vira cliente automaticamente.",
      "Sobe para o Tier 1.",
    ],
    answer: 1,
    explanation:
      "Score baixo não segura a conta se o status sai de ativa. Qualquer status diferente de ativa (dormente, cliente, perdida, arquivada) encerra a permanência na T2-0.",
  },
  {
    id: "q-checkpoint-30",
    question: "Uma conta ficou 30 dias úteis elegível na T2-0 sem dar sinal. O que o processo faz?",
    options: [
      "Marca a conta como dormente na hora.",
      "Cria uma tarefa de revisão para confirmar tier, score e status.",
      "Pede reunião com SLA de 24h.",
      "Cria o deal no Pibernat.",
    ],
    answer: 1,
    explanation:
      "No checkpoint de 30 dias úteis, o processo cria uma tarefa de revisão: confirmar se a conta ainda é Tier 2, com score ≤ 39 e status ativa.",
  },
  {
    id: "q-checkpoint-60",
    question: "O que acontece no checkpoint de 60 dias úteis da T2-0?",
    options: [
      "Marca a conta como perdida.",
      "Cria uma tarefa de toque leve: um sinal de valor, sem pitch e sem pedir reunião.",
      "Encerra a conta.",
      "Dispara a esteira de fechamento BANT.",
    ],
    answer: 1,
    explanation:
      "Aos 60 dias úteis, o toque leve compartilha um material de valor da dor do segmento. O objetivo é gerar o primeiro sinal, não avançar a conversa.",
  },
  {
    id: "q-checkpoint-90",
    question: "Uma conta chega a 90 dias úteis na T2-0 sem evoluir. O que o processo faz?",
    options: [
      "Mantém em nutrição indefinidamente.",
      "Marca Status ABM = dormente, cria tarefa de revisão trimestral e a conta sai da esteira.",
      "Promove para Tier 1.",
      "Cria uma reunião automática.",
    ],
    answer: 1,
    explanation:
      "Aos 90 dias úteis sem evolução, o Status ABM passa para dormente, a conta sai da T2-0 e fica uma tarefa de revisão trimestral. Reavaliação por decisão humana.",
  },
  {
    id: "q-t2-75",
    question: "No Tier 2, o que acontece quando a conta cruza 75 no Score de Abordagem?",
    options: [
      "Vira cliente.",
      "Dispara o gatilho de reunião: Lifecycle = SQL e abordagem com SLA de 24h.",
      "Entra na nutrição automática.",
      "É rebaixada para reconexão leve.",
    ],
    answer: 1,
    explanation:
      "75 é o pedido de reunião (gatilho oficial). Lifecycle vira SQL e a abordagem tem SLA de 24h.",
  },
  {
    id: "q-promocao",
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
    id: "q-t1-nao-rebaixa",
    question:
      "Um deal Tier 1 fica parado e o Score de Prioridade cai de 84 para 70. Para onde vai a conta?",
    options: [
      "Volta para Tier 2.",
      "Continua no Tier 1, agora na banda de ativação/reengajamento. O tier não muda.",
      "É arquivada.",
      "Fecha como perdida.",
    ],
    answer: 1,
    explanation:
      "O deal aberto mantém a conta no Tier 1. O score move entre bandas do Tier 1, nunca rebaixa o tier. A conta só sai quando o deal fecha.",
  },
  {
    id: "q-penalidade",
    question: "O que a penalidade por inatividade faz no Tier 1?",
    options: [
      "Rebaixa a conta para Tier 2.",
      "Move a conta entre bandas do Tier 1 sem rebaixar o tier.",
      "Fecha o deal como perdido.",
      "Não tem efeito no score.",
    ],
    answer: 1,
    explanation:
      "A penalidade derruba o score e move a conta entre bandas do Tier 1. O deal aberto mantém a conta no tier.",
  },
  {
    id: "q-canonico",
    question: "Um deal em 84 que fica 14 dias mudo:",
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
    id: "q-regra-ouro",
    question: "Qual a regra de ouro da abordagem no Tier 2?",
    options: [
      "Abordar o quanto antes, mesmo a frio.",
      "Abordar sob sinal, nunca a frio.",
      "Só abordar depois de 30 dias.",
      "Deixar o marketing abordar sempre.",
    ],
    answer: 1,
    explanation:
      "A regra de ouro é abordar sob sinal, nunca a frio. Antes do sinal, quem trabalha é o marketing, mantendo presença no comitê.",
  },
  {
    id: "q-comite",
    question: "Por que o ABM trabalha o comitê inteiro, e não um contato só?",
    options: [
      "Para gerar mais leads.",
      "Para que todos os decisores e influenciadores já conheçam a BlueMetrics antes da conversa.",
      "Porque o HubSpot exige.",
      "Para baixar o custo por clique.",
    ],
    answer: 1,
    explanation:
      "A decisão passa por várias pessoas. Alcançar o comitê com frequência e segmentação faz a marca chegar pronta na primeira conversa.",
  },
  {
    id: "q-marketing-nutricao",
    question: "Na etapa de nutrição, qual o papel do marketing?",
    options: [
      "Ficar parado até o executivo pedir.",
      "Manter comunicação no comitê via anúncios segmentados e emails estratégicos por conta.",
      "Ligar para o decisor todo dia.",
      "Fechar o deal.",
    ],
    answer: 1,
    explanation:
      "Na nutrição, o marketing sustenta a presença: anúncios com frequência e segmentação no comitê, mais emails estratégicos por conta, gerando o primeiro sinal.",
  },
  {
    id: "q-notificacao",
    question:
      "Quando uma esteira gera uma tarefa (revisão ou envio de email), quem é notificado no HubSpot?",
    options: [
      "Todo o time de marketing.",
      "O executivo dono da empresa no HubSpot, que recebe a notificação da tarefa.",
      "Ninguém, é só um registro.",
      "O cliente final.",
    ],
    answer: 1,
    explanation:
      "As tarefas caem para o executivo atribuído como dono da empresa. Ele recebe a notificação (tarefa de revisão, envio de email etc.) e executa.",
  },
  {
    id: "q-status-valores",
    question: "Qual destes é um Status ABM que encerra a permanência na nutrição?",
    options: [
      "ativa",
      "dormente",
      "Tier 2",
      "score 39",
    ],
    answer: 1,
    explanation:
      "Só ativa mantém a conta na esteira. Dormente, cliente, perdida_reciclar, arquivada e perdida_arquivar são estados de saída.",
  },
  {
    id: "q-icp-tier3",
    question: "O ICP de uma conta em T2-0 muda de Tier 2 para Tier 3. O que acontece?",
    options: [
      "Continua na T2-0 normalmente.",
      "Sai da leitura de T2-0 e passa a outra lógica operacional.",
      "Vira Tier 1 e cria deal.",
      "O score zera.",
    ],
    answer: 1,
    explanation:
      "Mudança de enquadramento (Tier 1 ou Tier 3) tira a conta da régua da T2-0. Ela deixa de permanecer nessa esteira.",
  },
  {
    id: "q-erro-leitura",
    question: "Qual é um erro comum de leitura de score?",
    options: [
      "Ler o score junto com tier e status.",
      "Olhar só o score e ignorar o tier e o Status ABM.",
      "Confirmar a banda antes de agir.",
      "Registrar a atividade no HubSpot.",
    ],
    answer: 1,
    explanation:
      "Score sozinho não roteia. Ignorar tier ou status leva a decisões erradas: score baixo com status fora de ativa é saída, não nutrição.",
  },
  {
    id: "q-rito-semanal",
    question: "O que é discutido no rito semanal de ABM?",
    options: [
      "Só o número de leads da semana.",
      "Revisão de contas, abordagens específicas, criativos de ads e otimização de processos.",
      "Apenas o fechamento de deals.",
      "Nada, é uma reunião informal.",
    ],
    answer: 1,
    explanation:
      "No rito semanal, marketing e comercial revisam contas juntos, definem abordagens específicas, avaliam criativos de anúncios e otimizam o processo.",
  },
  {
    id: "q-mqa",
    question: "O que dispara uma MQA (Marketing Qualified Account)?",
    options: [
      "Um formulário preenchido.",
      "Os gatilhos de banda dos scores: no Tier 2, cruzar 75; no Tier 1, cruzar 80.",
      "Qualquer visita ao site.",
      "A criação manual pelo executivo.",
    ],
    answer: 1,
    explanation:
      "A MQA é qualificada por marketing pelos gatilhos de banda: Tier 2 cruzando 75 (vira SQL, SLA 24h) e Tier 1 cruzando 80 (esteira de fechamento).",
  },
  {
    id: "q-tier2-banda40",
    question:
      "Uma conta Tier 2 ativa está com Score de Abordagem 52. Em que banda ela está e o que se espera?",
    options: [
      "Nutrição: só comunicação de marketing.",
      "Reconexão leve: toque humano suave do executivo, sem pitch.",
      "Gatilho de reunião: pedir reunião com SLA 24h.",
      "Fechamento BANT.",
    ],
    answer: 1,
    explanation:
      "52 cai na banda 40-59 (reconexão leve). O executivo faz um toque humano suave, ancorado no relacionamento, sem pedir reunião ainda.",
  },
  {
    id: "q-t3-score",
    question: "Qual score o Tier 3 usa para classificar as contas?",
    options: [
      "Um score novo, criado só para o Tier 3.",
      "O Score de Abordagem do Tier 2, com as mesmas bandas.",
      "O Score de Prioridade do Tier 1.",
      "Nenhum, é decisão manual.",
    ],
    answer: 1,
    explanation:
      "O Tier 3 não tem score próprio: herda o Score de Abordagem do Tier 2 e os mesmos cortes de banda (0-39, 40-59, 60-74, 75-100).",
  },
  {
    id: "q-t3-roteador",
    question: "O que o roteador canônico do Tier 3 faz quando uma conta muda de banda?",
    options: [
      "Inscreve na nova esteira e deixa a conta nas duas ao mesmo tempo.",
      "Desinscreve da esteira anterior antes de inscrever na nova (decisão atômica).",
      "Cria um deal no Pibernat.",
      "Rebaixa a conta para Tier 2.",
    ],
    answer: 1,
    explanation:
      "O roteador faz a inscrição atômica por banda: ao mudar de banda, desinscreve da esteira anterior antes de entrar na nova. Uma conta nunca fica ativa em duas esteiras.",
  },
  {
    id: "q-t3-promocao",
    question: "O que a promoção de uma conta do Tier 3 para o Tier 1 exige, além da aderência na reunião?",
    options: [
      "Nada além do resultado da reunião.",
      "Um contato associado à empresa (copiar ou reaproveitar se faltar) e o deal no Pibernat.",
      "Que o score chegue a 100.",
      "Aprovação do marketing.",
    ],
    answer: 1,
    explanation:
      "A promoção exige contato associado à empresa. Onde não houver, copia-se ou reaproveita-se os contatos já associados. Aí cria-se o deal no Pipeline Pibernat e a task de handoff.",
  },
  {
    id: "q-t3-winback",
    question: "Como o winback (ex-clientes) é tratado no Tier 3?",
    options: [
      "Como um tier separado, com motor lógico próprio.",
      "Como subtipo de coorte, na mesma lógica do frio, sem bifurcação estrutural obrigatória.",
      "Como Tier 1 direto, com deal aberto.",
      "É ignorado no Tier 3.",
    ],
    answer: 1,
    explanation:
      "O winback é subtipo de coorte do Tier 3. Segue a mesma lógica operacional do frio, sem tier separado nem motor paralelo, salvo decisão futura de especialização.",
  },
  {
    id: "q-saida-deal",
    question: "Quando uma conta finalmente sai do Tier 1?",
    options: [
      "Quando o score cai abaixo de 60.",
      "Quando o deal fecha (Closed Won ou Closed Lost).",
      "Quando fica 30 dias parada.",
      "Quando o marketing decide.",
    ],
    answer: 1,
    explanation:
      "O Tier 1 só termina no fechamento do deal. Closed Won vira Customer; Closed Lost mantém Target Account, sem virar Tier 2.",
  },
];
