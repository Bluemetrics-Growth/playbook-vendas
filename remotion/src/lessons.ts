// Conteúdo dos vídeos explicativos, um por trilha/aula do módulo ABM.
// Derivado do conteúdo canônico do playbook. Sem áudio: explicador em texto animado.

export interface Lesson {
  slug: string;
  index: number;
  total: number;
  title: string;
  subtitle: string;
  cover: string; // arquivo em public/brand
  accent: string; // cor de acento
  bullets: string[];
}

const ACCENT = "#0c27e8";
const CYAN = "#00bbff";
const PURPLE = "#7b00dc";
const ORANGE = "#ff4400";

export const lessons: Lesson[] = [
  {
    slug: "tese",
    index: 1,
    total: 10,
    title: "A Tese",
    subtitle: "Por que ABM na BlueMetrics",
    cover: "bg-rays.jpg",
    accent: ACCENT,
    bullets: [
      "A conta é a unidade de trabalho, não o lead solto",
      "Esforço proporcional; o sinal governa a hora de abordar",
      "Medir por conta e pipeline, aposentando o MQL",
    ],
  },
  {
    slug: "modelo",
    index: 2,
    total: 10,
    title: "O Modelo",
    subtitle: "Dois tiers, dois scores",
    cover: "bg-liquid-blue.png",
    accent: ACCENT,
    bullets: [
      "Tier 1 e Tier 2 definem roteamento e cadência",
      "A/B/C é o eixo de esforço: Strategic, Lite, Programmatic",
      "Regra de ouro: abordar sob sinal, nunca a frio",
    ],
  },
  {
    slug: "simulador",
    index: 3,
    total: 10,
    title: "Simulador de Score",
    subtitle: "Abordagem e Prioridade",
    cover: "bg-liquid-deep.png",
    accent: CYAN,
    bullets: [
      "Score de Abordagem (Tier 2): prontidão por comportamento",
      "Score de Prioridade (Tier 1): prioridade e saúde do deal",
      "A penalidade move entre bandas, sem rebaixar de tier",
    ],
  },
  {
    slug: "esteiras",
    index: 4,
    total: 10,
    title: "Esteiras e Cadências",
    subtitle: "Workflows e roteiros",
    cover: "bg-network.jpg",
    accent: ACCENT,
    bullets: [
      "Um workflow por banda, do T2-0 ao T1-3",
      "Gatilhos em 75 e 80 com SLA de 24 horas",
      "Roteiros de task copiáveis, no padrão do HubSpot",
    ],
  },
  {
    slug: "jornada",
    index: 5,
    total: 10,
    title: "Jornada da Conta",
    subtitle: "Máquina de estados",
    cover: "bg-mesh-purple.jpg",
    accent: PURPLE,
    bullets: [
      "Do Tier 2 à promoção e ao fechamento do deal",
      "Air cover always-on ligado em todas as etapas",
      "Tier 1 nunca é rebaixado de volta ao Tier 2",
    ],
  },
  {
    slug: "orquestracao",
    index: 6,
    total: 10,
    title: "Orquestração",
    subtitle: "Mapa if-then e SLA",
    cover: "bg-8.jpg",
    accent: ACCENT,
    bullets: [
      "Regras SE e ENTÃO organizadas por tier",
      "Paid aquece, humano dá lift, email amplifica, evento captura",
      "Sinal quente exige ação em até 24 horas",
    ],
  },
  {
    slug: "hubspot",
    index: 7,
    total: 10,
    title: "Fundação no HubSpot",
    subtitle: "Propriedades e checklist",
    cover: "bg-liquid-3.png",
    accent: CYAN,
    bullets: [
      "Propriedades de score, tier, Target Account e Buying Role",
      "Lista always-on sincronizada com o LinkedIn",
      "Checklist de build na ordem certa dos workflows",
    ],
  },
  {
    slug: "medicao",
    index: 8,
    total: 10,
    title: "Medição",
    subtitle: "MQA e KPI Contract",
    cover: "bg-7.jpg",
    accent: ACCENT,
    bullets: [
      "Aposentar o MQL e medir conta e pipeline",
      "A MQA é disparada pelos gatilhos de banda dos scores",
      "KPI Contract co-assinado por marketing e vendas",
    ],
  },
  {
    slug: "piloto",
    index: 9,
    total: 10,
    title: "Piloto de 90 dias",
    subtitle: "Fases e ritual",
    cover: "bg-liquid-blue.png",
    accent: ORANGE,
    bullets: [
      "Fase 0 Fundação, Fase 1 Ativação, Fase 2 Conversão",
      "Meta de 5 a 8 novas reuniões com contas-alvo",
      "Ritual semanal com um dono nomeado por conta",
    ],
  },
  {
    slug: "glossario",
    index: 10,
    total: 10,
    title: "Glossário",
    subtitle: "Vocabulário do ABM",
    cover: "bg-mesh-purple.jpg",
    accent: PURPLE,
    bullets: [
      "Tier, score, MQA e penetração de conta",
      "Buying Role, gatilho, SLA e air cover",
      "Pipeline Pibernat e penalidade por inatividade",
    ],
  },
];
