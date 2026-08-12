import type { AbmSection } from "../types";

// Ordem da trilha = ordem abaixo. Playbook de operação (o motion já está no ar
// no HubSpot). cover: capa da tela. videoUrl: placeholder "vídeo em breve".
export const abmSections: AbmSection[] = [
  { slug: "tese", href: "/abm/tese", title: "A Tese", short: "Por que ABM na BlueMetrics", icon: "Lightbulb", group: "Tese", cover: "/brand/bg-rays.jpg", duration: "5 min", videoUrl: "/videos/abm/tese.mp4" },
  { slug: "modelo", href: "/abm/modelo", title: "O Modelo", short: "Tiers, score e status", icon: "Layers", group: "Modelo", cover: "/brand/bg-liquid-blue.png", duration: "6 min", videoUrl: "/videos/abm/modelo.mp4" },
  { slug: "leitura", href: "/abm/leitura", title: "Leitura de Score", short: "Como o score vira decisão", icon: "BookOpenCheck", group: "Modelo", cover: "/brand/bg-mesh-purple.jpg", duration: "7 min", videoUrl: "/videos/abm/leitura.mp4" },
  { slug: "simulador", href: "/abm/simulador", title: "Calculadora de Score", short: "Simule score e banda", icon: "Calculator", group: "Modelo", cover: "/brand/bg-liquid-deep.png", duration: "5 min", videoUrl: "/videos/abm/simulador.mp4" },
  { slug: "jornada", href: "/abm/jornada", title: "Jornada da Conta", short: "O ciclo da conta, ponta a ponta", icon: "Route", group: "Operação", cover: "/brand/bg-mesh-purple.jpg", duration: "6 min", videoUrl: "/videos/abm/jornada.mp4" },
  { slug: "esteiras", href: "/abm/esteiras", title: "Esteiras e Cadências", short: "O que dispara e quem age", icon: "GitBranch", group: "Operação", cover: "/brand/bg-network.jpg", duration: "10 min", videoUrl: "/videos/abm/esteiras.mp4" },
  { slug: "orquestracao", href: "/abm/orquestracao", title: "Orquestração", short: "Mapa de disparos e SLA", icon: "Workflow", group: "Operação", cover: "/brand/bg-8.jpg", duration: "5 min", videoUrl: "/videos/abm/orquestracao.mp4" },
  { slug: "hubspot", href: "/abm/hubspot", title: "Propriedades no HubSpot", short: "O que é cada campo", icon: "Database", group: "Operação", cover: "/brand/bg-liquid-3.png", duration: "6 min", videoUrl: "/videos/abm/hubspot.mp4" },
  { slug: "medicao", href: "/abm/medicao", title: "Mensuração", short: "KPIs e painel no HubSpot", icon: "BarChart3", group: "Gestão", cover: "/brand/bg-7.jpg", duration: "6 min", videoUrl: "/videos/abm/medicao.mp4" },
  { slug: "rito", href: "/abm/rito", title: "Rito Semanal", short: "Como revisamos e otimizamos", icon: "CalendarClock", group: "Gestão", cover: "/brand/bg-liquid-blue.png", duration: "5 min", videoUrl: "/videos/abm/rito.mp4" },
  { slug: "glossario", href: "/abm/glossario", title: "Glossário", short: "Vocabulário do ABM", icon: "BookOpen", group: "Gestão", cover: "/brand/bg-mesh-purple.jpg", duration: "4 min", videoUrl: "/videos/abm/glossario.mp4" },
];

export const abmSectionsBySlug: Record<string, AbmSection> = Object.fromEntries(
  abmSections.map((s) => [s.slug, s])
);
