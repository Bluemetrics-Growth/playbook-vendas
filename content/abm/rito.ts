// Rito Semanal. A cadência de operação: marketing e comercial na mesma mesa.

export const ritoIntro =
  "O rito semanal é onde marketing e comercial sentam na mesma mesa para definir as estratégias da semana e ajustar o processo. As contas se movem sozinhas pelo score, mas as decisões (para quem falar, com qual ângulo, o que otimizar) são tomadas aqui. É esse encontro que tira o ABM do automático e o mantém afiado.";

export interface RitoBlock {
  id: string;
  icon: string; // nome de icone lucide-react
  title: string;
  detail: string;
}

export const ritoAgenda: RitoBlock[] = [
  {
    id: "revisao",
    icon: "Users",
    title: "Revisão de contas",
    detail: "Marketing e comercial passam pelas contas que se moveram: quem subiu de banda, quem esfriou, quem entrou em gatilho.",
  },
  {
    id: "sinais",
    icon: "Flame",
    title: "Sinais quentes da semana",
    detail: "As contas que cruzaram gatilho (Tier 2 em 75, Tier 1 em 80). Confirmar que o SLA de 24h foi cumprido.",
  },
  {
    id: "abordagens",
    icon: "MessageSquare",
    title: "Abordagens específicas",
    detail: "Para as contas que pedem toque humano, desenhar a abordagem por conta: ângulo, dor e próximo passo.",
  },
  {
    id: "criativos",
    icon: "Megaphone",
    title: "Criativos e comunicação de ads",
    detail: "Revisar o que está rodando no comitê: criativos, segmentação e frequência. Ajustar o que não está engajando.",
  },
  {
    id: "processo",
    icon: "Settings2",
    title: "Revisar e otimizar processos",
    detail: "O que travou na semana? Ajustar bandas, roteiros, propriedades e cadência. O processo é vivo, melhora toda semana.",
  },
];

export const ritoCadence =
  "O encontro é semanal e curto. A régua é sempre a mesma: por conta, por tier, por sinal. O objetivo não é revisar tudo, é decidir as próximas ações das contas que se moveram.";
