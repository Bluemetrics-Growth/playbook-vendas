// =========================================================================
// Content model — tipos-guia. Atualizar conteudo = editar dados, nao UI.
// Fonte da verdade de conteudo: PRD Apendice A. Onde divergir do HubSpot,
// prevalece o HubSpot.
// =========================================================================

export type ModuleStatus = "active" | "coming-soon";

export interface Module {
  slug: string;
  title: string;
  summary: string;
  status: ModuleStatus;
  href?: string;
  icon: string; // nome de icone lucide-react
  cover: string; // capa do card (imagem em /brand)
  kicker?: string; // rotulo curto (ex.: "Trilha", "Playbook")
  lessons?: number; // numero de aulas/secoes
  duration?: string; // ex.: "~45 min"
}

// ---------------------------------------------------------------- Scores
export interface ScoreIncrement {
  id: string;
  event: string;
  points: number;
  note?: string;
  /** incremento que pode ser somado varias vezes (ex.: +5 por pessoa). */
  repeatable?: boolean;
  unitLabel?: string;
  maxCount?: number;
}

export interface ScoreCategory {
  id: string;
  name: string;
  cap: number;
  increments: ScoreIncrement[];
  /** true quando os incrementos sao mutuamente exclusivos (escolhe 1 nivel). */
  exclusive?: boolean;
}

export type BandKind = "nurture" | "warm" | "attention" | "trigger";

export interface ScoreBand {
  min: number;
  max: number;
  label: string;
  kind: BandKind;
  workflowId?: string;
  sla?: string;
  note?: string;
}

export interface PenaltyTier {
  minDays: number;
  maxDays: number | null;
  adjust: number;
  note?: string;
}

export interface Score {
  id: "abordagem" | "prioridade";
  tier: "Tier 2" | "Tier 1";
  object: "Empresa";
  title: string;
  subtitle: string;
  categories: ScoreCategory[];
  bands: ScoreBand[];
  penalty?: PenaltyTier[]; // so Prioridade
  decay?: { days: string; points: number }; // so Abordagem
}

// ---------------------------------------------------------------- Workflows
export type Channel =
  | "LIGAÇÃO"
  | "EMAIL 1:1"
  | "LINKEDIN"
  | "WHATSAPP"
  | "TAREFA"
  | "automação";

export type Priority = "Alta" | "Média" | "Baixa";

export interface Task {
  id: string;
  day: string; // D0, D+2...
  channel: Channel;
  priority?: Priority;
  action: string;
  script?: string;
  branch?: string; // ramificacao / condicao
}

export type WorkflowGroup = "Tier 2" | "Movimento" | "Tier 1";

export interface Workflow {
  id: string; // ex.: 'T2-3'
  name: string; // '[ABM][T2-3] Abordagem p/ reuniao · Score 75-100'
  tier: WorkflowGroup;
  band?: string; // '75-100'
  bandKind?: BandKind;
  trigger: string;
  owner: string;
  sla?: string;
  lifecycleEnd?: string;
  cancelWhen?: string;
  isGate?: boolean;
  summary: string;
  tasks: Task[];
}

// ---------------------------------------------------------------- HubSpot
export interface Property {
  name: string;
  object: "Empresa" | "Contato";
  type: string;
  usage: string;
}

export interface ChecklistItem {
  id: string;
  label: string;
  group: string;
}

// ---------------------------------------------------------------- Orquestracao
export interface IfThenRule {
  id: string;
  tier: WorkflowGroup | "Always-on";
  condition: string; // "SE ..."
  action: string; // "ENTAO ..."
  sla?: string;
  isGate?: boolean;
}

export interface OrchestrationStage {
  step: number;
  name: string;
  role: string;
}

// ---------------------------------------------------------------- Medicao
export interface MeasureRow {
  stop: string;
  start: string;
}

export interface Metric {
  label: string;
  detail?: string;
}

// ---------------------------------------------------------------- Piloto
export interface PilotPhase {
  id: string;
  phase: string;
  weeks: string;
  name: string;
  activities: string[];
}

// ---------------------------------------------------------------- Glossario
export interface GlossaryTerm {
  term: string;
  definition: string;
  seeAlso?: string; // href da tela onde aparece em acao
  seeAlsoLabel?: string;
}

// ---------------------------------------------------------------- Trilha / busca
export interface AbmSection {
  slug: string;
  href: string;
  title: string;
  short: string;
  icon: string;
  group: "Tese" | "Modelo" | "Operação" | "Gestão";
  cover: string; // capa da aula (imagem em /brand)
  duration?: string; // ex.: "5 min"
  videoUrl?: string; // embed futuro; vazio => placeholder "vídeo em breve"
}

export type SearchKind =
  | "section"
  | "workflow"
  | "task"
  | "term"
  | "property"
  | "rule";

export interface SearchItem {
  id: string;
  kind: SearchKind;
  title: string;
  subtitle?: string;
  href: string;
  keywords: string;
}

// ---------------------------------------------------------------- Checkpoint
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  answer: number; // indice da correta
  explanation: string;
}
