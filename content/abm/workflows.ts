import type { Workflow } from "../types";

// =========================================================================
// A.4 — Esteiras / workflows. Fonte da verdade: PRD Apendice A.
// Convencoes: objeto de inscricao = Empresa; responsavel = proprietario da
// empresa (no Tier 1, priorizar proprietario do negocio); nome no padrao
// [ABM][<tier-etapa>] <nome> · Score <faixa>; atrasos em dias uteis;
// D0 = dia da entrada; registrar sempre.
// =========================================================================

export const workflows: Workflow[] = [
  // ------------------------------------------------------------------ T2-0
  {
    id: "T2-0",
    name: "[ABM][T2-0] Nutrição · Score 0-39",
    tier: "Tier 2",
    band: "0-39",
    bandKind: "nurture",
    trigger: "Target Account = true E Tier 2 E score 0-39",
    owner: "Marketing (automação)",
    lifecycleEnd: "MQL",
    cancelWhen: "Score ≥ 40",
    summary:
      "Nutrição automática de baixa intensidade. Só a camada always-on trabalha até o primeiro sinal.",
    tasks: [
      {
        id: "T2-0-1",
        day: "D0",
        channel: "automação",
        action: "Se Lifecycle = Lead, setar MQL. Inscrever na nutrição de email.",
        script:
          "Nutrição de email: 1 email a cada 5 a 10 dias, valor sem formulário. Objetivo: gerar o primeiro sinal.",
      },
      {
        id: "T2-0-2",
        day: "D0",
        channel: "automação",
        action: "Garantir Buying Roles na lista always-on de ads.",
        script:
          "Confirmar que os contatos com Buying Role da conta estão na matched audience de LinkedIn Ads.",
      },
    ],
  },

  // ------------------------------------------------------------------ T2-1
  {
    id: "T2-1",
    name: "[ABM][T2-1] Reconexão leve · Score 40-59",
    tier: "Tier 2",
    band: "40-59",
    bandKind: "warm",
    trigger: "Score cruza 40",
    owner: "Executivo",
    lifecycleEnd: "MQL",
    summary:
      "Toque humano suave, ancorado no relacionamento. Sem pitch, sem pedir reunião.",
    tasks: [
      {
        id: "T2-1-1",
        day: "D0",
        channel: "LINKEDIN",
        priority: "Média",
        action: "Convite com nota curta e pessoal, ancorada no relacionamento. Registrar se aceitou.",
        script:
          "Oi [nome], vi que a gente se cruzou em [contexto do relacionamento]. Acompanho o que a [empresa] vem fazendo em [tema] e queria ficar por perto por aqui. Abraço.",
      },
      {
        id: "T2-1-2",
        day: "D+3",
        channel: "LINKEDIN",
        priority: "Baixa",
        action: "Só se aceitou. 1 conteúdo da dor do segmento (case). Não pede reunião.",
        branch: "Só se aceitou o convite.",
        script:
          "[nome], separei esse caso de [segmento] que resolveu [dor específica]. Achei que faria sentido pra vocês. Sem compromisso, só compartilhando.",
      },
      {
        id: "T2-1-3",
        day: "D+4",
        channel: "WHATSAPP",
        priority: "Baixa",
        action: "Opcional, só se tem o número pelo relacionamento (LGPD). Toque leve.",
        branch: "Só com número obtido pelo relacionamento (LGPD).",
        script:
          "Oi [nome], tudo certo? Vi um material que lembrei de você, mandei no seu LinkedIn. Qualquer coisa estou por aqui.",
      },
    ],
  },

  // ------------------------------------------------------------------ T2-2
  {
    id: "T2-2",
    name: "[ABM][T2-2] Observação e valor · Score 60-74",
    tier: "Tier 2",
    band: "60-74",
    bandKind: "attention",
    trigger: "Score cruza 60",
    owner: "Executivo + Marketing",
    lifecycleEnd: "MQL",
    summary:
      "Conectar a dor a um resultado concreto e oferecer valor. Sem pressão por reunião.",
    tasks: [
      {
        id: "T2-2-1",
        day: "D0",
        channel: "EMAIL 1:1",
        priority: "Média",
        action: "Conectar a dor a um resultado concreto (ROI, baseline). Oferecer valor (mini-diagnóstico).",
        script:
          "Assunto: um número que talvez mude a conversa em [empresa]\n\n[nome], empresas de [segmento] costumam deixar [X]% de eficiência na mesa em [processo]. Montei um mini-diagnóstico rápido pra estimar isso no cenário de vocês. Quer que eu mande o formato? Sem compromisso.",
      },
      {
        id: "T2-2-2",
        day: "D+4",
        channel: "LINKEDIN",
        priority: "Baixa",
        action: "Follow-up, mesmo ângulo.",
        script:
          "[nome], reforçando o mini-diagnóstico que comentei. Levo 20 minutos pra montar com você o baseline. Faz sentido?",
      },
      {
        id: "T2-2-3",
        day: "D+8",
        channel: "WHATSAPP",
        priority: "Baixa",
        action: "Só se já respondeu antes.",
        branch: "Só se já houve resposta anterior.",
        script:
          "Oi [nome], consegui um exemplo de [segmento] com o antes e depois. Te mando por aqui ou por email?",
      },
      {
        id: "T2-2-4",
        day: "—",
        channel: "automação",
        action: "Ramificação: usar a calculadora ou responder cruza 75 e passa para T2-3.",
        branch: "Usar calculadora ou responder → cruza 75 → T2-3.",
      },
    ],
  },

  // ------------------------------------------------------------------ T2-3
  {
    id: "T2-3",
    name: "[ABM][T2-3] Abordagem p/ reunião · Score 75-100",
    tier: "Tier 2",
    band: "75-100",
    bandKind: "trigger",
    trigger: "Score cruza 75",
    owner: "Executivo",
    sla: "24h",
    lifecycleEnd: "SQL",
    isGate: true,
    summary:
      "Gatilho oficial. Pedir a reunião direto, com gancho no sinal recente. SLA de 24h.",
    tasks: [
      {
        id: "T2-3-0",
        day: "D0",
        channel: "automação",
        action: "Setar Lifecycle = SQL.",
      },
      {
        id: "T2-3-1",
        day: "D0",
        channel: "WHATSAPP",
        priority: "Alta",
        action: "Pedir a reunião direto, gancho no sinal recente. SLA 24h. (ou LINKEDIN)",
        script:
          "Oi [nome], vi que você usou a [calculadora / material]. Isso normalmente indica que [dor] está no radar. Topa 30 minutos essa semana pra eu te mostrar como [segmento] resolveu isso? Tenho [dia] ou [dia].",
      },
      {
        id: "T2-3-2",
        day: "D+2",
        channel: "EMAIL 1:1",
        priority: "Alta",
        action: "Reforçar valor + 2 horários. Diagnóstico de 30 min, link de agenda.",
        script:
          "Assunto: 30 min pra estimar [resultado] em [empresa]\n\n[nome], seguindo o toque. Proponho um diagnóstico de 30 minutos pra mapear [dor] e estimar o retorno. Deixei dois horários no link: [agenda]. Se preferir, me diz o melhor dia.",
      },
      {
        id: "T2-3-3",
        day: "D+5",
        channel: "LINKEDIN",
        priority: "Média",
        action: "Só se não respondeu, novo ângulo (case do segmento).",
        branch: "Só se não respondeu.",
        script:
          "[nome], mudando o ângulo: esse é o caso de [empresa do segmento] que saiu de [antes] pra [depois] em [prazo]. É exatamente a conversa que eu queria ter com você.",
      },
      {
        id: "T2-3-4",
        day: "D+7",
        channel: "WHATSAPP",
        priority: "Baixa",
        action: "Follow-up curto, só se número disponível e já houve resposta.",
        branch: "Só com número disponível e resposta anterior.",
        script: "[nome], consigo fechar 30 min ainda essa semana? Me diz o melhor horário que eu me viro.",
      },
      {
        id: "T2-3-5",
        day: "D+14",
        channel: "EMAIL 1:1",
        priority: "Baixa",
        action: "Break-up leve, porta aberta. Ao concluir sem resposta, devolve a conta à nutrição.",
        script:
          "Assunto: fecho o ciclo por aqui\n\n[nome], não quero insistir no momento errado. Vou pausar por aqui e deixar a porta aberta. Quando [dor] voltar a pesar, é só me chamar. Abraço.",
      },
      {
        id: "T2-3-6",
        day: "—",
        channel: "automação",
        action: "Ramificação: se responde ou marca, pula o resto e preenche Resultado da reunião ABM.",
        branch: "Respondeu ou marcou → pula o resto → preencher 'Resultado da reunião ABM'.",
      },
    ],
  },

  // ------------------------------------------------------------------ MOV Promoção
  {
    id: "MOV-PROMO",
    name: "[ABM][MOV] Promoção T2→T1",
    tier: "Movimento",
    trigger: "Resultado da reunião ABM = Aderência-oportunidade real",
    owner: "Executivo + RevOps",
    lifecycleEnd: "Opportunity",
    cancelWhen: "Reinscrição desligada",
    summary:
      "A reunião teve aderência. Promove a conta para Tier 1, grava o tier e cria o deal no Pibernat.",
    tasks: [
      {
        id: "MOV-PROMO-1",
        day: "D0",
        channel: "automação",
        action:
          "Ideal Customer Profile Tier = Tier 1. Lifecycle = Opportunity. Criar deal no Pibernat no estágio acordado (ex.: Elaboração de PTC), associado à empresa e ao contato.",
      },
      {
        id: "MOV-PROMO-2",
        day: "D0",
        channel: "TAREFA",
        priority: "Alta",
        action: "Registrar contexto da reunião, mapear comitê faltante, definir próximo passo.",
        script:
          "Contexto da reunião: [dor confirmada], [pessoas presentes], [próximo passo acordado]. Comitê faltante: [papéis]. Próximo passo: [ação e data].",
      },
      {
        id: "MOV-PROMO-3",
        day: "D0",
        channel: "automação",
        action: "Remover das nutrições de Tier 2, manter o air cover.",
      },
    ],
  },

  // ------------------------------------------------------------------ T1-1
  {
    id: "T1-1",
    name: "[ABM][T1-1] Ativação do comitê · Score 60-79",
    tier: "Tier 1",
    band: "60-79",
    bandKind: "attention",
    trigger: "Tier 1 entre 60 e 79",
    owner: "Marketing + Executivo",
    lifecycleEnd: "Opportunity",
    summary:
      "Nutrir o business case e expandir o comitê. Toque a cada 4 a 6 dias úteis, sempre registrando.",
    tasks: [
      {
        id: "T1-1-1",
        day: "D0",
        channel: "EMAIL 1:1",
        priority: "Alta",
        action: "Nutrir o business case (baseline, ROI). Funding AWS só como sweetener no fim.",
        script:
          "[nome], consolidei o business case do projeto: baseline de [X], ganho estimado de [Y] em [prazo]. Anexei o one-pager. Quando fizer sentido, a gente ainda tem funding AWS que ajuda no arranque.",
      },
      {
        id: "T1-1-2",
        day: "D+2",
        channel: "TAREFA",
        priority: "Alta",
        action: "Expansão de comitê: identificar contatos faltantes, marcar Buying Role.",
        script:
          "Mapear decisor, influenciador, usuário e bloqueador. Marcar Buying Role em cada contato e adicionar os que faltam ao deal e ao air cover.",
      },
      {
        id: "T1-1-3",
        day: "D+3",
        channel: "LINKEDIN",
        priority: "Média",
        action: "Conectar novos stakeholders, contexto do projeto + material.",
        script:
          "Oi [nome], estou tocando com [sponsor] o projeto de [tema] na [empresa]. Queria te incluir na conversa. Segue um material de contexto: [link].",
      },
      {
        id: "T1-1-4",
        day: "D+6",
        channel: "TAREFA",
        priority: "Média",
        action: "Entregar conteúdo de conta (mini-diagnóstico ou case).",
      },
      {
        id: "T1-1-5",
        day: "D+9",
        channel: "WHATSAPP",
        priority: "Média",
        action: "Follow-up de proposta ou dúvida com o sponsor.",
        script: "[nome], como ficou a leitura do time sobre a proposta? Alguma dúvida que eu já adianto?",
      },
      {
        id: "T1-1-6",
        day: "D+9",
        channel: "automação",
        action: "Loop: sem cruzar 80 nem cair de 60, reinscreve no início.",
        branch: "D+9 sem cruzar 80 e sem cair de 60 → reinscreve no início.",
      },
    ],
  },

  // ------------------------------------------------------------------ T1-2
  {
    id: "T1-2",
    name: "[ABM][T1-2] Reengajamento · Score 0-59",
    tier: "Tier 1",
    band: "0-59",
    bandKind: "nurture",
    trigger: "Tier 1 cai abaixo de 60",
    owner: "Executivo + Marketing",
    lifecycleEnd: "Opportunity",
    summary:
      "A conta não é rebaixada: o deal aberto a mantém no Tier 1. Reativar com gancho novo e revisar a saúde do deal.",
    tasks: [
      {
        id: "T1-2-1",
        day: "D0",
        channel: "LIGAÇÃO",
        priority: "Alta",
        action: "Reativar com gancho novo. Se não atender, WhatsApp.",
        script:
          "[nome], apareceu [novidade / gatilho de mercado] que muda o cálculo do projeto. Vale 15 minutos pra eu te atualizar? Se agora não der, me diz o melhor momento.",
      },
      {
        id: "T1-2-2",
        day: "D0",
        channel: "TAREFA",
        priority: "Média",
        action: "(Marketing) Recolocar o comitê na nutrição por dor e no air cover reforçado.",
      },
      {
        id: "T1-2-3",
        day: "D+15",
        channel: "TAREFA",
        priority: "Alta",
        action:
          "Sem movimento por 15 a 20 dias, escalar para vendas decidir (seguir, repactuar, marcar perdido).",
        branch: "Sem movimento 15 a 20 dias → decisão de vendas.",
      },
    ],
  },

  // ------------------------------------------------------------------ T1-3
  {
    id: "T1-3",
    name: "[ABM][T1-3] Fechamento BANT · Score 80-100",
    tier: "Tier 1",
    band: "80-100",
    bandKind: "trigger",
    trigger: "Tier 1 cruza 80 com conversão real",
    owner: "Executivo",
    sla: "24h",
    lifecycleEnd: "Opportunity",
    isGate: true,
    summary:
      "Encerra a prospecção de marketing e entra em fechamento. Diagnóstico BANT, uma task por dimensão.",
    tasks: [
      {
        id: "T1-3-0",
        day: "D0",
        channel: "automação",
        action: "Encerrar prospecção de marketing, manter só o air cover.",
      },
      {
        id: "T1-3-1",
        day: "D0",
        channel: "LIGAÇÃO",
        priority: "Alta",
        action: 'Abertura com gancho de case/mercado, fechar com "o que falta para a gente fechar?".',
        script:
          "[nome], [case/gancho de mercado] mostra que a janela é agora. Pra fechar isso do jeito certo: o que ainda falta da sua parte pra a gente avançar?",
      },
      {
        id: "T1-3-2",
        day: "D0",
        channel: "TAREFA",
        priority: "Alta",
        action: "BANT · Budget",
        script:
          'Gancho: "Se não fosse o preço, você fecharia?" Se sim, o bloqueio é preço: trabalhar escopo e faseamento, one-pager de ROI, acionar funding AWS (sweetener).',
      },
      {
        id: "T1-3-3",
        day: "D0",
        channel: "TAREFA",
        priority: "Alta",
        action: "BANT · Autoridade",
        script:
          'Gancho: "Com quem está a decisão final?" Novo decisor: multithread, conectar no LinkedIn, incluir no comitê e nos ads, marcar Buying Role.',
      },
      {
        id: "T1-3-4",
        day: "D+1",
        channel: "TAREFA",
        priority: "Alta",
        action: "BANT · Necessidade",
        script:
          'Gancho: "Onde o projeto ainda não encaixa?" Necessidade fraca: voltar à identificação e ajustar escopo.',
      },
      {
        id: "T1-3-5",
        day: "D+1",
        channel: "TAREFA",
        priority: "Alta",
        action: "BANT · Timing",
        script:
          'Gancho: "Quando conseguimos um retorno? O que muda até lá?" Timing empurra: follow-up datado, manter air cover, registrar para o score não cair.',
      },
      {
        id: "T1-3-6",
        day: "—",
        channel: "automação",
        action:
          "Saída: o executivo move o deal no Pibernat. Closed Won encerra tudo. Timing empurrado gera follow-up datado e devolve à nutrição.",
      },
    ],
  },

  // ------------------------------------------------------------------ MOV Saída
  {
    id: "MOV-SAIDA",
    name: "[ABM][MOV] Saída do Tier 1",
    tier: "Movimento",
    trigger: "Deal do Pibernat em Closed Won ou Closed Lost",
    owner: "Automação",
    cancelWhen: "Reinscrição desligada",
    summary: "O deal fechou. A conta sai do Tier 1, sem rebaixamento para Tier 2.",
    tasks: [
      {
        id: "MOV-SAIDA-1",
        day: "D0",
        channel: "automação",
        action:
          "Closed Won: Lifecycle = Customer, handoff para Operação Contínua / MAIP, encerrar cadências.",
        branch: "Closed Won.",
      },
      {
        id: "MOV-SAIDA-2",
        day: "D0",
        channel: "automação",
        action:
          "Closed Lost: manter como Target Account, tirar do Tier 1, registrar motivo. Não vira Tier 2. Reavaliar em ciclo futuro por decisão humana.",
        branch: "Closed Lost.",
      },
    ],
  },
];

export const workflowsById: Record<string, Workflow> = Object.fromEntries(
  workflows.map((w) => [w.id, w])
);
