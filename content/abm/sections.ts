import type { AbmSection } from "../types";

// Ordem da trilha de treino = ordem abaixo (PRD Seção 9).
export const abmSections: AbmSection[] = [
  { slug: "tese", href: "/abm/tese", title: "A Tese", short: "Por que ABM na BlueMetrics", icon: "Lightbulb", group: "Tese" },
  { slug: "modelo", href: "/abm/modelo", title: "O Modelo", short: "Dois tiers, dois scores", icon: "Layers", group: "Modelo" },
  { slug: "simulador", href: "/abm/simulador", title: "Simulador de Score", short: "Abordagem e Prioridade", icon: "Calculator", group: "Modelo" },
  { slug: "esteiras", href: "/abm/esteiras", title: "Esteiras / Cadências", short: "Workflows e roteiros", icon: "GitBranch", group: "Operação" },
  { slug: "jornada", href: "/abm/jornada", title: "Jornada da Conta", short: "Máquina de estados", icon: "Route", group: "Operação" },
  { slug: "orquestracao", href: "/abm/orquestracao", title: "Orquestração", short: "Mapa if-then e SLA", icon: "Workflow", group: "Operação" },
  { slug: "hubspot", href: "/abm/hubspot", title: "Fundação no HubSpot", short: "Propriedades e checklist", icon: "Database", group: "Operação" },
  { slug: "medicao", href: "/abm/medicao", title: "Medição", short: "MQA e KPI Contract", icon: "BarChart3", group: "Gestão" },
  { slug: "piloto", href: "/abm/piloto", title: "Piloto de 90 dias", short: "Fases e ritual", icon: "CalendarClock", group: "Gestão" },
  { slug: "glossario", href: "/abm/glossario", title: "Glossário", short: "Vocabulário do ABM", icon: "BookOpen", group: "Gestão" },
];

export const abmSectionsBySlug: Record<string, AbmSection> = Object.fromEntries(
  abmSections.map((s) => [s.slug, s])
);
