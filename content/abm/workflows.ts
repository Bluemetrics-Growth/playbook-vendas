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
    name: "[ABM][T2-0] Nutrição com checkpoints de saída",
    tier: "Tier 2",
    band: "0-39",
    bandKind: "nurture",
    trigger:
      "Inscrição manual · permanência: ICP = Tier 2 E Score de Abordagem (Tier 2) ≤ 39 E Status ABM = ativa",
    owner: "Marketing (automação)",
    lifecycleEnd: "MQL",
    cancelWhen:
      "Score de Abordagem > 39 · OU ICP muda para Tier 1 ou Tier 3 · OU Status ABM sai de ativa (dormente, cliente, perdida_reciclar, arquivada, perdida_arquivar)",
    summary:
      "Nutrição automática de baixa intensidade enquanto a conta segue Tier 2, com score ≤ 39 e status ABM ativa. A comunicação de marketing trabalha até o primeiro sinal, e checkpoints de 30, 60 e 90 dias úteis revisam se ainda faz sentido manter a conta na esteira.",
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
        action: "Garantir Buying Roles na lista de comunicação de marketing (ads).",
        script:
          "Confirmar que os contatos com Buying Role da conta estão na matched audience de LinkedIn Ads.",
      },
      {
        id: "T2-0-3",
        day: "30u",
        channel: "TAREFA",
        priority: "Baixa",
        action:
          "Checkpoint de 30 dias úteis: criar tarefa de revisão. Confirmar se a conta ainda é Tier 2, segue com score ≤ 39 e status ABM ativa.",
        branch: "Só se a conta permanece elegível em T2-0 (Tier 2 · score ≤ 39 · ativa).",
        script:
          "Revisão T2-0 (30 dias úteis): a conta ainda faz sentido em nutrição? Checar ICP (Tier 2), Score de Abordagem (≤ 39) e Status ABM (ativa). Se algo mudou, a conta já deve ter saído da esteira pelo critério de saída.",
      },
      {
        id: "T2-0-4",
        day: "60u",
        channel: "TAREFA",
        priority: "Baixa",
        action:
          "Checkpoint de 60 dias úteis: criar tarefa de toque leve. Um sinal de valor, sem pitch e sem pedir reunião.",
        branch: "Só se a conta permanece elegível em T2-0 (Tier 2 · score ≤ 39 · ativa).",
        script:
          "Toque leve T2-0 (60 dias úteis): compartilhar um material de valor da dor do segmento. Objetivo é gerar o primeiro sinal, não avançar a conversa. Sem compromisso.",
      },
      {
        id: "T2-0-5",
        day: "90u",
        channel: "automação",
        action:
          "Checkpoint de 90 dias úteis: marcar Status ABM = dormente e criar tarefa de revisão trimestral. A conta deixa de permanecer na esteira ativa.",
        branch: "Se seguiu elegível sem sinal até 90 dias úteis → Status ABM = dormente → sai da T2-0.",
        script:
          "Revisão trimestral T2-0 (90 dias úteis): a conta ficou 90 dias úteis sem evoluir. Status ABM passa para dormente e ela sai desta esteira. Reavaliar no próximo ciclo por decisão humana.",
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
        brief: {
          tipo: "brief",
          objetivo:
            "Reabrir o canal com alguém que já te conhece, sem parecer abordagem comercial. A meta é o aceite do convite, nada além.",
          conteudo: [
            "A âncora real do relacionamento: onde, quando ou como vocês se cruzaram (projeto, evento, conexão em comum).",
            "Um sinal de que você acompanha o momento atual da empresa dela.",
            "Um motivo leve e honesto para reconectar agora (você está imerso em IA aplicada na BlueMetrics), sem pedir nada.",
          ],
          estrutura:
            "Abre nomeando o vínculo concreto. No meio, mostra que sabe algo atual e específico sobre a área ou a empresa dela. Fecha sinalizando presença, sem CTA comercial.",
          personalizacao:
            "O contexto do relacionamento tem que ser verdadeiro e nominal. Se você não lembra de onde se conhecem, não use esta esteira: pesquise antes ou trate como conta fria por outro caminho.",
          extensaoTom:
            "2 a 3 frases, coloquial, de igual para igual. A nota de convite do LinkedIn tem limite de caracteres, seja curto.",
          evite: [
            "Qualquer menção a produto, reunião, solução, case ou agenda.",
            "Frases como adoraria te apresentar, que derrubam o aceite.",
          ],
        },
      },
      {
        id: "T2-1-2",
        day: "D+3",
        channel: "LINKEDIN",
        priority: "Baixa",
        action: "Só se aceitou. 1 conteúdo da dor do segmento (case). Não pede reunião.",
        branch: "Só se aceitou o convite.",
        brief: {
          tipo: "brief",
          objetivo:
            "Entregar um sinal de valor que associe você a um problema real do mundo dela, sem cobrar retorno.",
          conteudo: [
            "Um material concreto e relevante para a dor típica do segmento dela (case, estudo, número de mercado).",
            "O motivo pelo qual você lembrou dela especificamente.",
            "Permissão explícita para ignorar, sem compromisso.",
          ],
          estrutura:
            "Contextualiza por que aquilo é relevante para o momento dela. Entrega o material. Encerra tirando a pressão.",
          personalizacao:
            "O material tem que casar com o segmento e, de preferência, com uma dor que você sabe que a empresa dela vive. Genérico demais vira spam.",
          extensaoTom: "2 a 4 frases, generoso, não vendedor.",
          evite: [
            "Pedir reunião ou perguntar podemos conversar.",
            "Mandar material em tom de folder. É partilha, não pitch.",
          ],
        },
      },
      {
        id: "T2-1-3",
        day: "D+4",
        channel: "WHATSAPP",
        priority: "Baixa",
        action: "Opcional, só se tem o número pelo relacionamento (LGPD). Toque leve.",
        branch: "Só com número obtido pelo relacionamento (LGPD).",
        brief: {
          tipo: "brief",
          objetivo:
            "Reforçar presença por um canal mais pessoal, mantendo o tom de quem já se conhece.",
          conteudo: [
            "Cumprimento pessoal.",
            "Referência ao material que você mandou no LinkedIn, sem repetir tudo.",
            "Porta aberta.",
          ],
          estrutura: "Cumprimenta, conecta ao toque anterior, encerra à disposição.",
          personalizacao:
            "Só usar se o número veio do relacionamento, nunca de enriquecimento. Registrar a origem do contato (LGPD).",
          extensaoTom: "1 a 2 linhas, informal.",
          evite: [
            "Primeira mensagem por WhatsApp sem relacionamento prévio.",
            "Qualquer venda.",
          ],
        },
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
        brief: {
          tipo: "brief",
          assunto:
            "Deve provocar curiosidade com um número ou uma pergunta sobre a operação dela, não anunciar a BlueMetrics. Sugere que existe um dado sobre o negócio dela que vale a leitura.",
          objetivo:
            "Fazer a pessoa enxergar um custo ou ineficiência que ela provavelmente tem, e oferecer uma forma de medir isso, sem custo e sem reunião.",
          conteudo: [
            "Um benchmark real do segmento (eficiência perdida, tempo gasto, custo de erro) ancorado no que a BlueMetrics vê no mercado, nunca inventado.",
            "A ponte para a realidade específica da empresa dela.",
            "A oferta do mini-diagnóstico como instrumento de medição do baseline.",
            "Fricção mínima: você monta, ela só recebe.",
          ],
          estrutura:
            "Abre com o número que gera desconforto produtivo. Conecta à operação dela. Oferece o mini-diagnóstico como próximo passo leve. Fecha sem pressão de agenda.",
          personalizacao:
            "O benchmark e o processo citado têm que ser do segmento e do porte dela. Para BlueDocs, use a calculadora de custo de análise manual como instrumento concreto. Para outros Solution Packs, descreva o baseline equivalente da dor.",
          extensaoTom: "Email curto, 4 a 6 linhas, escaneável, consultivo, orientado a número.",
          evite: [
            "Falar de features da BlueMetrics.",
            "Pedir reunião ou citar funding AWS. O foco é a dor mensurável, não o produto.",
          ],
        },
      },
      {
        id: "T2-2-2",
        day: "D+4",
        channel: "LINKEDIN",
        priority: "Baixa",
        action: "Follow-up, mesmo ângulo.",
        brief: {
          tipo: "brief",
          objetivo: "Manter o mesmo fio (o baseline) e reduzir a fricção do sim.",
          conteudo: [
            "Retomada do mini-diagnóstico sem repetir o email inteiro.",
            "O esforço real que aquilo exige dela (poucos minutos).",
            "Uma pergunta simples de sim ou não.",
          ],
          estrutura: "Referencia o toque anterior. Dimensiona o esforço como baixo. Pergunta se faz sentido.",
          personalizacao: "Mesmo ângulo do email, sem trocar de tema. Consistência é o que constrói o sinal.",
          extensaoTom: "2 a 3 frases.",
          evite: [
            "Novo tema ou novo material.",
            "Pedido de reunião formal. Ainda é oferta de valor.",
          ],
        },
      },
      {
        id: "T2-2-3",
        day: "D+8",
        channel: "WHATSAPP",
        priority: "Baixa",
        action: "Só se já respondeu antes.",
        branch: "Só se já houve resposta anterior.",
        brief: {
          tipo: "brief",
          objetivo: "Usar um exemplo real de antes e depois para transformar interesse em intenção.",
          conteudo: [
            "Um exemplo concreto do segmento, com antes e depois.",
            "A escolha de canal para ela (aqui ou por email).",
            "Leveza.",
          ],
          estrutura: "Oferece a prova. Deixa ela escolher como receber. Sem cobrança.",
          personalizacao: "Só disparar se já houve resposta anterior. O exemplo tem que ser do mesmo segmento ou dor.",
          extensaoTom: "1 a 2 linhas.",
          evite: [
            "Mandar sem resposta prévia.",
            "Despejar o case inteiro no WhatsApp.",
          ],
        },
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
        brief: {
          tipo: "brief",
          objetivo: "Converter um sinal quente e recente em reunião, agindo dentro do SLA de 24h.",
          conteudo: [
            "Referência explícita ao sinal que disparou o gatilho (usou a calculadora, baixou material, visitou determinada página), citado com naturalidade.",
            "A leitura do que aquele sinal costuma indicar (a dor está no radar).",
            "O convite direto para 30 minutos, com o benefício claro (mostrar como o segmento dela resolveu aquilo).",
            "Dois horários concretos para reduzir atrito.",
          ],
          estrutura:
            "Abre no sinal recente. Interpreta o sinal em uma frase. Propõe os 30 minutos com o valor explícito. Oferece duas janelas.",
          personalizacao:
            "O sinal citado tem que ser o real e recente. Se você não sabe qual foi, confira no HubSpot antes de escrever. Este toque é o coração da regra abordar sob sinal, nunca a frio.",
          extensaoTom: "Direto e confiante, 3 a 4 frases. É pedido de reunião, não continuação de nutrição.",
          evite: [
            "Rodeios e será que faz sentido.",
            "Agenda aberta (me diz sua disponibilidade). Ofereça horários.",
          ],
        },
      },
      {
        id: "T2-3-2",
        day: "D+2",
        channel: "EMAIL 1:1",
        priority: "Alta",
        action: "Reforçar valor + 2 horários. Diagnóstico de 30 min, link de agenda.",
        brief: {
          tipo: "brief",
          assunto:
            "Deve deixar claro, em uma linha, o resultado que a reunião estima (ex.: estimar determinado ganho na empresa dela).",
          objetivo: "Dar um registro formal e escaneável do convite, com o valor da reunião e o caminho de agendamento.",
          conteudo: [
            "Retomada do toque anterior.",
            "O formato da reunião (diagnóstico de 30 min) e o que ela sai levando (baseline ou estimativa de retorno).",
            "Link de agenda com dois horários visíveis.",
            "Alternativa: me diga o melhor dia.",
          ],
          estrutura:
            "Conecta ao toque. Descreve o valor concreto dos 30 minutos. Entrega o caminho de agendamento. Abre alternativa.",
          personalizacao:
            "O resultado prometido tem que ser plausível para a dor e o Solution Pack daquela conta. Nada de promessa genérica.",
          extensaoTom: "Curto, 4 a 5 linhas, orientado a ação.",
          evite: [
            "Reescrever o pitch inteiro.",
            "Múltiplos CTAs ou funding AWS.",
          ],
        },
      },
      {
        id: "T2-3-3",
        day: "D+5",
        channel: "LINKEDIN",
        priority: "Média",
        action: "Só se não respondeu, novo ângulo (case do segmento).",
        branch: "Só se não respondeu.",
        brief: {
          tipo: "brief",
          objetivo: "Quebrar o silêncio com um ângulo diferente, usando prova social do segmento.",
          conteudo: [
            "Sinalização explícita de que você está mudando o ângulo.",
            "Um case real do mesmo segmento, com o salto de antes para depois e o prazo.",
            "A conexão direta com o motivo de querer falar com ela.",
          ],
          estrutura: "Anuncia o novo ângulo. Entrega o case com número e prazo. Amarra ao interesse dela.",
          personalizacao: "O case tem que ser do segmento dela e verdadeiro, com prazo e resultado reais.",
          extensaoTom: "3 a 4 frases, seguro.",
          evite: [
            "Repetir o texto dos toques anteriores.",
            "Insistir sem novidade.",
          ],
        },
      },
      {
        id: "T2-3-4",
        day: "D+7",
        channel: "WHATSAPP",
        priority: "Baixa",
        action: "Follow-up curto, só se número disponível e já houve resposta.",
        branch: "Só com número disponível e resposta anterior.",
        brief: {
          tipo: "brief",
          objetivo: "Fechar o horário com o mínimo de fricção.",
          conteudo: [
            "Pergunta objetiva sobre fechar 30 min ainda nesta semana.",
            "Flexibilidade total de horário da sua parte.",
          ],
          estrutura: "Pergunta direta. Você se coloca à disposição para se adaptar.",
          personalizacao: "Só com número legítimo e resposta anterior.",
          extensaoTom: "1 linha.",
          evite: [
            "Reabrir argumentação.",
            "Disparar sem histórico de resposta.",
          ],
        },
      },
      {
        id: "T2-3-5",
        day: "D+14",
        channel: "EMAIL 1:1",
        priority: "Baixa",
        action: "Break-up leve, porta aberta. Ao concluir sem resposta, devolve a conta à nutrição.",
        brief: {
          tipo: "brief",
          assunto: "Deve sinalizar encerramento de ciclo sem drama (algo como fechar o ciclo por aqui).",
          objetivo:
            "Encerrar a sequência preservando a relação e deixando a porta aberta. Sem resposta, a conta volta para a nutrição.",
          conteudo: [
            "Reconhecimento de que talvez não seja o momento.",
            "Pausa explícita, sem ressentimento.",
            "Convite para ela retomar quando a dor voltar a pesar.",
          ],
          estrutura: "Valida o timing. Comunica a pausa. Deixa a ponte para o futuro.",
          personalizacao: "Tom coerente com o histórico real da conversa. Se houve algum avanço, reconheça.",
          extensaoTom: "Curto, 3 frases, elegante.",
          evite: [
            "Culpa, ironia ou última chance.",
            "Urgência artificial ou desconto.",
          ],
        },
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
        action: "Remover das nutrições de Tier 2, manter a comunicação de marketing.",
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
        brief: {
          tipo: "brief",
          assunto: "Deve sinalizar que há um business case consolidado esperando (ex.: o business case do projeto na empresa dela).",
          objetivo:
            "Dar ao sponsor um material pronto para circular internamente, que sustente a decisão: baseline, ganho estimado e prazo.",
          conteudo: [
            "O baseline atual da dor (número de partida real ou estimado junto com a conta).",
            "O ganho estimado com prazo.",
            "O one-pager de ROI anexo.",
            "O funding AWS mencionado só no fim, como facilitador de arranque, nunca como argumento central.",
          ],
          estrutura:
            "Entrega o business case em uma frase forte (de X para Y em prazo Z). Aponta o anexo. Posiciona o funding como sweetener discreto ao final.",
          personalizacao:
            "Os números de baseline e ganho têm que vir do que foi levantado com a conta, não de benchmark genérico. É deal aberto, precisão importa.",
          extensaoTom: "Objetivo, 5 a 7 linhas, com anexo. Executivo, orientado a decisão.",
          evite: [
            "Abrir pelo funding.",
            "Prometer percentuais sem lastro.",
            "Linguagem de prospecção fria: a conta já está em oportunidade.",
          ],
          registro: "Registrar o envio no HubSpot. No Tier 1, sem registro o score cai.",
        },
      },
      {
        id: "T1-1-2",
        day: "D+2",
        channel: "TAREFA",
        priority: "Alta",
        action: "Expansão de comitê: identificar contatos faltantes, marcar Buying Role.",
        script:
          "Mapear decisor, influenciador, usuário e bloqueador. Marcar Buying Role em cada contato e adicionar os que faltam ao deal e à comunicação de marketing.",
      },
      {
        id: "T1-1-3",
        day: "D+3",
        channel: "LINKEDIN",
        priority: "Média",
        action: "Conectar novos stakeholders, contexto do projeto + material.",
        brief: {
          tipo: "brief",
          objetivo:
            "Multithread. Trazer para a conversa um membro do comitê ainda não engajado, com contexto e sem passar por cima de ninguém.",
          conteudo: [
            "Menção transparente de que você já toca o projeto com o sponsor.",
            "O motivo de incluir essa pessoa (o papel dela na decisão ou no uso).",
            "Um material de contexto de baixo atrito.",
          ],
          estrutura:
            "Apresenta o vínculo já existente com o sponsor. Explica por que a pessoa importa para o projeto. Entrega contexto.",
          personalizacao:
            "Nomeie o sponsor e o tema real do projeto. Ao conectar, marque o Buying Role dessa pessoa no HubSpot.",
          extensaoTom: "2 a 3 frases, respeitoso da hierarquia interna.",
          evite: [
            "Dar impressão de estar apontando a ausência dela.",
            "Pedir decisão logo de cara.",
          ],
        },
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
        brief: {
          tipo: "brief",
          objetivo: "Destravar a leitura interna da proposta e antecipar objeções antes que virem bloqueio.",
          conteudo: [
            "Pergunta sobre como o time recebeu a proposta.",
            "Oferta de já adiantar dúvidas.",
            "Leveza de quem acompanha, não cobra.",
          ],
          estrutura: "Pergunta pela leitura do time. Se oferece para resolver dúvidas.",
          personalizacao: "Só com o sponsor com quem você já tem canal aberto. Referencie a proposta real.",
          extensaoTom: "1 a 2 linhas, tom de parceria.",
          evite: [
            "Pressão por data de assinatura.",
            "Tom de cobrança.",
          ],
          registro: "Registrar o toque no HubSpot.",
        },
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
        brief: {
          tipo: "ligacao",
          objetivo:
            "Reabrir o diálogo de um deal que esfriou, com um motivo legítimo e novo, e ler a saúde real do deal.",
          conteudo: [
            "Um gancho genuinamente novo (novidade de mercado, mudança de contexto, novo case, gatilho regulatório) que mude o cálculo do projeto.",
            "Um pedido de tempo pequeno e específico (15 min).",
            "Flexibilidade se o momento for ruim.",
          ],
          estrutura:
            "Abre pelo gancho novo. Conecta ao projeto parado. Pede os 15 min. Se não atender, migra para WhatsApp com a mesma lógica em texto curto.",
          personalizacao:
            "O gancho tem que ser real e relevante para aquela conta. Reengajar sem novidade soa como cobrança e queima o deal.",
          extensaoTom: "Consultivo, sem ansiedade. Você está atualizando, não implorando.",
          evite: [
            "Só passando para saber se você decidiu.",
            "Reabrir sem motivo ou com tom de cobrança de assinatura.",
          ],
          registro: "Registrar o resultado da ligação zera a penalidade de inatividade e recupera o score.",
        },
      },
      {
        id: "T1-2-2",
        day: "D0",
        channel: "TAREFA",
        priority: "Média",
        action: "(Marketing) Recolocar o comitê na nutrição por dor e reforçar a comunicação de marketing.",
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
        action: "Encerrar prospecção de marketing, manter só a comunicação de marca.",
      },
      {
        id: "T1-3-1",
        day: "D0",
        channel: "LIGAÇÃO",
        priority: "Alta",
        action: 'Abertura com gancho de case/mercado, fechar com "o que falta para a gente fechar?".',
        brief: {
          tipo: "ligacao",
          objetivo:
            "Abrir a conversa de fechamento criando senso de janela real e trazendo a pergunta que revela o que falta.",
          conteudo: [
            "Um gancho de case ou de mercado que mostre que a janela é agora.",
            "A transição para a pergunta de fechamento.",
            "A pergunta aberta sobre o que ainda falta da parte dela para avançar.",
          ],
          estrutura:
            "Abre pelo gancho de urgência legítima. Faz a pergunta direta sobre o que falta para fechar. Ouve mais do que fala.",
          personalizacao:
            "O gancho de janela tem que ser verdadeiro (um case recente, uma mudança concreta), não urgência fabricada.",
          extensaoTom: "Confiante, de quem conduz o fechamento.",
          evite: [
            "Pressão artificial.",
            "Desconto como primeira alavanca.",
            "Falar mais que o cliente.",
          ],
          registro: "Registrar tudo. No Tier 1 o registro segura o score.",
        },
      },
      {
        id: "T1-3-2",
        day: "D0",
        channel: "TAREFA",
        priority: "Alta",
        action: "BANT · Budget",
        brief: {
          tipo: "bant",
          objetivo: "Isolar se o preço é o bloqueio real.",
          perguntaGancho: 'Confirmar se o preço é o único obstáculo (referência: "se não fosse o preço, você fecharia?").',
          comoAgir:
            "Se sim, o bloqueio é orçamento: trabalhe escopo e faseamento, leve o one-pager de ROI e só então acione o funding AWS como sweetener. Se não, o preço é desculpa: siga para as outras dimensões.",
          evite: [
            "Abrir com desconto.",
            "Tratar preço como o único eixo.",
          ],
        },
      },
      {
        id: "T1-3-3",
        day: "D0",
        channel: "TAREFA",
        priority: "Alta",
        action: "BANT · Autoridade",
        brief: {
          tipo: "bant",
          objetivo: "Confirmar quem realmente decide.",
          perguntaGancho: 'Mapear onde está a decisão final (referência: "com quem está a decisão final?").',
          comoAgir:
            "Se aparecer um novo decisor, faça multithread: conecte no LinkedIn, inclua no comitê e na comunicação de marca, marque o Buying Role no HubSpot.",
          evite: [
            "Assumir que seu contato decide sozinho.",
          ],
        },
      },
      {
        id: "T1-3-4",
        day: "D+1",
        channel: "TAREFA",
        priority: "Alta",
        action: "BANT · Necessidade",
        brief: {
          tipo: "bant",
          objetivo: "Achar onde o projeto ainda não encaixa na realidade dela.",
          perguntaGancho: 'Descobrir a lacuna de encaixe (referência: "onde o projeto ainda não encaixa?").',
          comoAgir:
            "Se a necessidade estiver fraca, volte à identificação da dor e ajuste o escopo antes de insistir no fechamento.",
          evite: [
            "Empurrar escopo que não resolve a dor central.",
          ],
        },
      },
      {
        id: "T1-3-5",
        day: "D+1",
        channel: "TAREFA",
        priority: "Alta",
        action: "BANT · Timing",
        brief: {
          tipo: "bant",
          objetivo: "Entender e datar o quando.",
          perguntaGancho:
            'Amarrar retorno esperado e o que muda até lá (referência: "quando conseguimos um retorno? O que muda até lá?").',
          comoAgir:
            "Se o timing empurrar, crie follow-up datado, mantenha a comunicação de marca e registre para o score não cair.",
          evite: [
            "Aceitar depois sem data.",
            "Sumir e deixar o score despencar.",
          ],
        },
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
