import type { AbmSection } from "../types";

// Ordem da trilha de treino = ordem abaixo (PRD Seção 9).
// cover: capa da aula. videoUrl: vazio por ora (placeholder "vídeo em breve").
export const abmSections: AbmSection[] = [
  { slug: "tese", href: "/abm/tese", title: "A Tese", short: "Por que ABM na BlueMetrics", icon: "Lightbulb", group: "Tese", cover: "/brand/bg-rays.jpg", duration: "5 min" },
  { slug: "modelo", href: "/abm/modelo", title: "O Modelo", short: "Dois tiers, dois scores", icon: "Layers", group: "Modelo", cover: "/brand/bg-liquid-blue.png", duration: "6 min" },
  { slug: "simulador", href: "/abm/simulador", title: "Simulador de Score", short: "Abordagem e Prioridade", icon: "Calculator", group: "Modelo", cover: "/brand/bg-liquid-deep.png", duration: "8 min" },
  { slug: "esteiras", href: "/abm/esteiras", title: "Esteiras / Cadências", short: "Workflows e roteiros", icon: "GitBranch", group: "Operação", cover: "/brand/bg-network.jpg", duration: "10 min" },
  { slug: "jornada", href: "/abm/jornada", title: "Jornada da Conta", short: "Máquina de estados", icon: "Route", group: "Operação", cover: "/brand/bg-mesh-purple.jpg", duration: "6 min" },
  { slug: "orquestracao", href: "/abm/orquestracao", title: "Orquestração", short: "Mapa if-then e SLA", icon: "Workflow", group: "Operação", cover: "/brand/bg-8.jpg", duration: "5 min" },
  { slug: "hubspot", href: "/abm/hubspot", title: "Fundação no HubSpot", short: "Propriedades e checklist", icon: "Database", group: "Operação", cover: "/brand/bg-liquid-3.png", duration: "7 min" },
  { slug: "medicao", href: "/abm/medicao", title: "Medição", short: "MQA e KPI Contract", icon: "BarChart3", group: "Gestão", cover: "/brand/bg-7.jpg", duration: "6 min" },
  { slug: "piloto", href: "/abm/piloto", title: "Piloto de 90 dias", short: "Fases e ritual", icon: "CalendarClock", group: "Gestão", cover: "/brand/bg-liquid-blue.png", duration: "5 min" },
  { slug: "glossario", href: "/abm/glossario", title: "Glossário", short: "Vocabulário do ABM", icon: "BookOpen", group: "Gestão", cover: "/brand/bg-mesh-purple.jpg", duration: "4 min" },
];

export const abmSectionsBySlug: Record<string, AbmSection> = Object.fromEntries(
  abmSections.map((s) => [s.slug, s])
);
