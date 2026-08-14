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
    definition: "Pipeline real do Tier 1 no HubSpot. É onde o deal nasce quando uma conta é promovida (do Tier 2 ou do Tier 3) por aderência e oportunidade real.",
  },
  {
    term: "Tier 3",
    definition:
      "Camada de prospecção ABM para contas frias ou mornas dos Estados Unidos, com abordagem de escala controlada. Coorte mista de new logos e winback. Herda o Score de Abordagem e as bandas do Tier 2. É extensão do framework, não uma máquina paralela.",
  },
  {
    term: "Winback",
    definition:
      "Subtipo de coorte do Tier 3: empresas que já foram clientes BlueMetrics e voltam para esforço de reativação. Segue a mesma lógica operacional do frio, sem tier separado nem motor lógico paralelo, salvo decisão futura de especialização.",
  },
  {
    term: "Roteador canônico",
    definition:
      "Uma única entrada por tier que lê a banda atual e faz a inscrição atômica na esteira certa. Inscreve por cruzamento de limiar, decide uma banda por vez e desinscreve da esteira anterior ao mudar de banda.",
  },
  {
    term: "ABM Banda atual",
    definition:
      "Propriedade de empresa que guarda a banda de roteamento. Pivô lógico do fluxo. Hoje é campo de texto (dívida técnica), idealmente deve virar seleção controlada.",
  },
  {
    term: "Anti-thrashing / reentrada segura",
    definition:
      "Guardrails do roteamento. Anti-thrashing evita idas e vindas por oscilação marginal (ativa x dormente, banda A x banda B). Reentrada segura exige recomputar ou resetar o Score de Abordagem antes de rotear uma conta que reentra, para score residual não recolocá-la numa banda inadequada.",
  },
];
