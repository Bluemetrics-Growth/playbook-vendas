import type { Module } from "./types";

// Lista de modulos da home. Adicionar modulo = adicionar item aqui.
// Nomes de modulos futuros sao sugestoes: cortar ou renomear a vontade.
export const modules: Module[] = [
  {
    slug: "abm",
    title: "ABM",
    summary: "O sistema operacional de crescimento por conta.",
    status: "active",
    href: "/abm",
    icon: "Target",
  },
  {
    slug: "crm",
    title: "CRM",
    summary: "O ABM roda no HubSpot. Atalho direto para o CRM.",
    status: "shortcut",
    href: "/crm",
    icon: "Database",
  },
  {
    slug: "prospeccao-outbound",
    title: "Prospecção Outbound",
    summary: "Motor de prospecção ativa e cadências frias.",
    status: "coming-soon",
    icon: "Send",
  },
  {
    slug: "discovery-qualificacao",
    title: "Discovery & Qualificação",
    summary: "Descoberta de dor e qualificação de oportunidade.",
    status: "coming-soon",
    icon: "Search",
  },
  {
    slug: "objecoes",
    title: "Objeções",
    summary: "Biblioteca de objeções e respostas.",
    status: "coming-soon",
    icon: "MessageSquareWarning",
  },
  {
    slug: "propostas-pricing",
    title: "Propostas & Pricing",
    summary: "Estrutura de proposta, faseamento e preço.",
    status: "coming-soon",
    icon: "FileText",
  },
  {
    slug: "solution-packs",
    title: "Solution Packs",
    summary: "Pacotes de solução por dor e segmento.",
    status: "coming-soon",
    icon: "Package",
  },
  {
    slug: "cases-prova-social",
    title: "Cases & Prova Social",
    summary: "Casos, resultados e provas por indústria.",
    status: "coming-soon",
    icon: "Award",
  },
  {
    slug: "eventos-field",
    title: "Eventos & Field",
    summary: "Roundtables, eventos e captura de intenção.",
    status: "coming-soon",
    icon: "CalendarDays",
  },
];
