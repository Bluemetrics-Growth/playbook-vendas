import type { Property } from "../types";

// Propriedades no HubSpot (espelho do CRM). Já estão construídas: aqui a gente
// explica o que é cada campo e para que serve na operação.
export const properties: Property[] = [
  {
    name: "Score de Abordagem",
    object: "Empresa",
    type: 'Pontuação combinada ("Lead score Tier 2")',
    usage:
      "Gatilho das bandas do Tier 2. O Tier 3 herda este mesmo score e os mesmos cortes de banda",
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
    type: "Dropdown (Tier 1 / Tier 2 / Tier 3)",
    usage: "Diz quem a conta é e roteia para o motor certo. Mudar de Tier 2 para Tier 1 ou Tier 3 tira a conta da nutrição T2-0",
  },
  {
    name: "Status ABM",
    object: "Empresa",
    type:
      "Dropdown (ativa / dormente / cliente / perdida_reciclar / arquivada / perdida_arquivar)",
    usage:
      "Estado operacional da conta. Só permanece na esteira T2-0 quando o status é ativa. Qualquer outro estado encerra a permanência",
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
    usage: "Público dos anúncios e penetração de comitê",
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
  {
    name: "ABM Banda atual",
    object: "Empresa",
    type: "Texto (hoje). Idealmente evoluir para seleção controlada (dropdown)",
    usage:
      "Pivô lógico do roteamento por banda. Hoje existe como campo de texto: é dívida técnica/funcional, porque texto livre aumenta o risco de inconsistência de valores e de roteamento errado",
  },
];

export const marketingComms = {
  title: "Comunicação de marketing no comitê",
  body:
    "Uma lista ativa de contatos com Buying Role conhecido, em empresas Target Account, sincronizada com o LinkedIn. Os anúncios rodam com frequência e segmentação para alcançar o comitê inteiro, nos dois tiers e em todas as etapas. É lista mais campanha mantida por Marketing, não um workflow.",
};
