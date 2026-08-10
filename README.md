# bluemetrics Playbook

Ambiente web interno de **treinamento e consulta** comercial da BlueMetrics. Uma "escola" de
playbooks: cada playbook é uma trilha interativa que o time pode estudar do zero (treinar) ou
consultar no meio da operação. O playbook com conteúdo completo hoje é o **ABM** (Account-Based
Marketing); o de **CRM no HubSpot** está em construção.

Construído a partir do PRD `PRD BlueMetrics Playbook (Hub + Módulo ABM)`, com fidelidade total ao
design system da marca (incluído no repo).

## Stack

- **Next.js 14 (App Router) + TypeScript**, SSG por padrão.
- **Tailwind CSS** ligado aos tokens do design system (`styles/tokens.css`), sem hex cru em componentes.
- **Framer Motion** para as animações com propósito (simulador, jornada, stagger).
- **cmdk** para a busca / command palette (⌘K).
- **lucide-react** para ícones.
- **zustand** (com persistência em `localStorage`) para modo (Treinar/Consultar), progresso e checklist.
- Sem backend, sem banco, sem auth server-side. Conteúdo estático, interatividade no cliente.

## Rodando localmente

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção (SSG)
npm run start    # serve o build
```

## Arquitetura de conteúdo

Todo o conteúdo canônico do ABM (Apêndice A do PRD) vive tipado em `content/`, **separado da UI**.
Atualizar o playbook é editar dados, não componentes.

```
content/
  types.ts            Tipos (Module, Score, Workflow, Task, Property, ...)
  modules.ts          Cards da home (adicionar módulo = adicionar item)
  abm/
    scores.ts         Os dois scores (categorias, tetos, bandas, penalidade, preset)
    workflows.ts      Todas as esteiras e suas tasks (roteiros)
    properties.ts     Propriedades do HubSpot + convenções + checklist de build
    orchestration.ts  Regras if-then, sequência de canais, SLA
    measurement.ts    Métricas, MQA, KPI Contract, dados do dashboard ilustrativo
    pilot.ts          Fases do piloto, ritual, recursos
    glossary.ts       Termos
    prose.ts          Narrativa (tese, modelo)
    sections.ts       Ordem da trilha de treino
    quiz.ts           Checkpoint final
lib/
  score.ts            Motor de cálculo dos scores (tetos, exclusividade, penalidade, banda)
  search.ts           Índice da busca ⌘K
  progress.ts         Store de modo / progresso / checklist (localStorage)
```

O design system (tokens, fontes Outfit + Wix Madefor Text, logos, backgrounds) está em
`styles/tokens.css` e `public/fonts` + `public/brand`, extraído do export oficial da marca.

## Variáveis de ambiente

Copie `.env.example` para `.env.local`. Nenhuma é obrigatória para rodar; servem para os deep-links
do HubSpot. Nunca commite segredos.

| Variável | Uso |
|---|---|
| `NEXT_PUBLIC_HUBSPOT_BASE_URL` | Base do portal HubSpot. Usada no botão "Abrir o HubSpot" do playbook de CRM. |

## Deploy (Vercel)

O repo já está conectado à Vercel. `main` publica em produção, PRs geram preview.

Configure as variáveis de ambiente acima no painel da Vercel (Project Settings → Environment
Variables) quando os deep-links do HubSpot forem definidos.

## Gate de acesso

É uma ferramenta interna. A opção mais simples que atende a v1, sem construir auth, é a **Vercel
Deployment Protection** (Project Settings → Deployment Protection → Password Protection ou Vercel
Authentication por SSO da conta). Isso protege produção e previews sem tocar no código. SSO próprio
fica como fast-follow.

## Decisões (Apêndice B do PRD)

Defaults adotados na v1, ajustáveis a qualquer momento:

1. **Gate de acesso:** Vercel Deployment Protection (recomendado, sem código). Ajustar no painel.
2. **Deep-links do HubSpot:** parametrizados por env (`NEXT_PUBLIC_HUBSPOT_BASE_URL`), sem hardcode
   de IDs sensíveis. Preencher quando o portal e os IDs forem confirmados.
3. **Módulo CRM:** é um playbook/treinamento de HubSpot (trilha em construção). A página `/crm`
   apresenta o currículo planejado e um atalho "Abrir o HubSpot" enquanto o conteúdo não sai.

## Convenções

- **Fidelidade ao HubSpot:** nomes de propriedades, bandas e workflows batem exatamente com o CRM.
  O app é espelho do motion real. Onde divergir, prevalece o HubSpot.
- **Escrita:** nunca usar travessão longo em texto de interface. Hífen com parcimônia.
- **Acessibilidade:** navegável por teclado, contraste AA, `prefers-reduced-motion` respeitado, banda
  nunca comunicada só por cor (sempre com rótulo e ícone).
