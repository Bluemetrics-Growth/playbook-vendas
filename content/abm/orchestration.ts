import type { IfThenRule, OrchestrationStage } from "../types";

// A.5 — Mapa if-then e SLA.
export const ifThenRules: IfThenRule[] = [
  {
    id: "r-marketing",
    tier: "Marketing",
    condition: "Todo contato com Buying Role",
    action: "Entra na comunicação de marketing (LinkedIn Ads), nos dois tiers, em todas as etapas. É lista ativa, não workflow.",
  },
  {
    id: "r-t2-nutricao",
    tier: "Tier 2",
    condition: "Tier 2 entra na nutrição",
    action: "Lifecycle = MQL.",
  },
  {
    id: "r-t2-40",
    tier: "Tier 2",
    condition: "Tier 2 cruza 40 (ou 50 com sinal)",
    action: "Task de conectar no LinkedIn, reduz nutrição pesada.",
  },
  {
    id: "r-t2-60",
    tier: "Tier 2",
    condition: "Tier 2 cruza 60",
    action: "Observação e oferta de valor.",
  },
  {
    id: "r-t2-75",
    tier: "Tier 2",
    condition: "Tier 2 cruza 75",
    action: "Lifecycle = SQL, abordagem com SLA 24h e sequência de reunião de 8 a 14 dias.",
    sla: "24h",
    isGate: true,
  },
  {
    id: "r-promo",
    tier: "Movimento",
    condition: "Resultado da reunião ABM = Aderência",
    action: "Promove a Tier 1, grava o tier, cria o deal, Lifecycle = Opportunity.",
  },
  {
    id: "r-t1-60-79",
    tier: "Tier 1",
    condition: "Tier 1 entre 60 e 79",
    action: "Ativação do comitê e comunicação de marketing reforçada.",
  },
  {
    id: "r-t1-inatividade",
    tier: "Tier 1",
    condition: "Tier 1 fica dias sem atividade registrada",
    action: "A penalidade nativa derruba o score (sem workflow).",
  },
  {
    id: "r-t1-abaixo60",
    tier: "Tier 1",
    condition: "Tier 1 cai abaixo de 60",
    action: "Reengajamento + revisão da saúde do deal, ainda no Tier 1.",
  },
  {
    id: "r-t1-80",
    tier: "Tier 1",
    condition: "Tier 1 cruza 80 com conversão real",
    action: "Encerra prospecção e dispara a esteira BANT.",
    sla: "24h",
    isGate: true,
  },
  {
    id: "r-t1-fecha",
    tier: "Tier 1",
    condition: "Deal do Tier 1 fecha",
    action: "A conta sai do Tier 1, sem rebaixamento para Tier 2.",
  },
  {
    id: "r-t3-roteador",
    tier: "Tier 3",
    condition: "ICP = Tier 3 e o Score de Abordagem cruza um limiar de banda",
    action:
      "O roteador canônico do Tier 3 lê a banda atual e faz a inscrição atômica na esteira certa (T3-0/1/2/3). Uma banda, uma esteira.",
  },
  {
    id: "r-t3-desinscricao",
    tier: "Tier 3",
    condition: "A conta Tier 3 muda de banda",
    action:
      "Auto-desinscrição: sai da esteira anterior antes de entrar na nova. Nunca duas esteiras ativas na mesma conta.",
  },
  {
    id: "r-t3-75",
    tier: "Tier 3",
    condition: "Tier 3 cruza 75 (usou o instrumento ou respondeu)",
    action:
      "Lifecycle = SQL, pedido de reunião (T3-3) com SLA de 24h. O gatilho de reunião segue sob sinal.",
    sla: "24h",
    isGate: true,
  },
  {
    id: "r-t3-promo",
    tier: "Movimento",
    condition: "Reunião Tier 3 = Aderência-oportunidade real",
    action:
      "Promove a Tier 1: garante contato associado (copia se faltar), cria o deal no Pibernat, cria task de handoff, Lifecycle = Opportunity.",
  },
  {
    id: "r-t3-dormencia",
    tier: "Tier 3",
    condition: "Conta Tier 3 sem avanço após o corte de permanência",
    action:
      "Recheca a banda e, se confirmada, marca dormente e desinscreve das esteiras ativas. Prazo exato (corridos x úteis) sujeito a decisão final.",
  },
  {
    id: "r-t3-reentrada",
    tier: "Tier 3",
    condition: "Conta Tier 3 reentra (volta de dormência ou reciclagem)",
    action:
      "Recomputar ou resetar o Score de Abordagem antes de rotear. Score residual não pode recolocar a conta numa banda aleatória.",
  },
];

export const orchestrationSequence: OrchestrationStage[] = [
  { step: 1, name: "Paid aquece", role: "Os anúncios de marketing preparam o comitê e mantêm a marca presente, com frequência e segmentação." },
  { step: 2, name: "Toque humano dá lift", role: "LinkedIn 1:1 do executivo converte a atenção em conversa." },
  { step: 3, name: "Email amplifica", role: "Email 1:1 reforça o valor e organiza os próximos passos." },
  { step: 4, name: "Evento captura intenção", role: "Roundtable ou evento captura o pico de intenção e agenda." },
];

export const slaNote =
  "SLA: sinal quente exige ação em até 24h. As tarefas chegam como notificação para o executivo dono da empresa no HubSpot. Registrar toda atividade. No Tier 1 o registro é o que segura o score.";

export const tier3RouterNote =
  "O Tier 3 segue o padrão arquitetural preferido: um roteador canônico por tier, inscrição por cruzamento de limiar (não por um genérico score mudou), decisão atômica de banda e desinscrição automática da esteira anterior ao mudar de banda. Isso evita contas em duas esteiras ao mesmo tempo, conflito de cadências, reentrada por score residual e ativação por oscilação marginal.";
