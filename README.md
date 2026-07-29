# Calculadora de ROI do BlueDocs

Primeira versão da calculadora de business case do BlueDocs (meio/fundo de funil),
conforme o PRD. Modela ROI, payback e cenários com as premissas do lead, entrega o
custo de continuar manual sem cadastro (ungated) e libera o business case completo
mais o PDF atrás de um gate mínimo.

Stack: React + Vite + TypeScript. Cálculo 100% client-side, instantâneo. Consome o
design system versionado da BlueMetrics (tokens, fontes e cores) sem tokens paralelos.

## Rodar

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # build de producao em dist/
npm run preview    # serve o build
npm run typecheck  # tsc sem emitir
```

## Estrutura

```
index.html                 SEO (Secao 5) + GTM (GTM-MNVPH77L) + link do design system
public/design-system/      Design system versionado (colors_and_type.css, fonts/, assets/)
src/
  config/roi-model.ts      Fonte da verdade: motor de calculo (Secao 2.4), presets por
                           vertical, cenarios, flags, nomes de eventos e props do HubSpot.
                           Toda calibragem de negocio vive aqui, com fonte comentada.
  lib/
    format.ts              Formatacao PT-BR (moeda, ROI como % e multiplo, payback)
    tracking.ts            Push de eventos para o dataLayer (Secao 8.1)
    firstTouch.ts          Cookie bm_first_touch, first-touch attribution (Secao 8.3)
    lead.ts                Submit do lead para a serverless, com degradacao graciosa
  components/              Hero, Premissas, Gate, Resultado, ComparisonTable, Stepper
  pdf/                     Business case em @react-pdf/renderer (lazy), paridade visual
  App.tsx                  Orquestra o fluxo de 4 telas e o tracking
api/submit-lead.ts         Serverless (Vercel): upsert de contato no HubSpot (Secao 8.2)
scripts/verificar-modelo.mjs  Sanity check do motor contra os presets (criterio #1)
```

## Fluxo (Secao 4)

1. Hero + seletor de vertical (5 verticais) + prova.
2. Premissas editáveis + custo de continuar manual ao vivo (ungated). O bloco premium
   (valor recuperável, ROI, payback) aparece borrado com selo de gate.
3. Gate mínimo: Nome, Email corporativo, Empresa.
4. Resultado completo: métrica-herói (valor recuperável líquido/ano), ROI 12/24m,
   payback, analistas liberados, toggle de cenário, tabela Hoje vs Com BlueDocs,
   ganho qualitativo, faixa de investimento (conforme flag), download do PDF e CTA.

A UI abre sempre no cenário Conservador (Decisão 4).

## Config e decisões (para o marketing/Diego)

Tudo é editável em `src/config/roi-model.ts`:

- `exibirInvestimentoPublico` (default `false`): a faixa de investimento do piloto
  (R$ 50k a 70k) só aparece na tela gateada e no PDF. Ligue para exibir também na
  parte pública. Ponto em aberto no PRD (Seção 0), altera só config, sem redeploy de
  lógica.
- **Calibragem dos defaults:** os defaults literais do PRD 2.6 (`operacaoMensal`
  R$ 15k a 25k/mês) deixavam o valor recuperável líquido e o ROI negativos no cenário
  Conservador em quase toda vertical, e a UI abre no Conservador. Recalibramos os dois
  levers tunáveis, operação mensal (para patamar de SaaS) e os volumes-padrão por
  vertical (para níveis representativos de mid-market), mantendo o motor idêntico à
  Seção 2.4 e a faixa comercial do piloto. Os valores originais do PRD estão comentados
  no arquivo para rastreabilidade. Ajuste conforme a realidade comercial.

Confira os números por vertical e cenário com:

```bash
node scripts/verificar-modelo.mjs
```

## Tracking (Seção 8, hard blocker antes de mídia paga)

- **dataLayer / GTM (GTM-MNVPH77L):** todos os eventos da Seção 8.1 disparam com os
  parâmetros exatos (`roi_start`, `roi_premissa_edit`, `roi_resultado_parcial`,
  `roi_gate_view`, `roi_lead_submit`, `roi_resultado_completo`, `roi_cenario_toggle`,
  `roi_pdf_download`, `roi_cta_especialista`).
- **HubSpot (Seção 8.2):** `api/submit-lead.ts` faz upsert do contato com as 9
  propriedades de ROI + first-touch. Requer a env `HUBSPOT_PRIVATE_APP_TOKEN` (private
  app com scope de contatos). Sem o token, a serverless responde 200 e pula o HubSpot,
  para não travar o lead em dev/preview. Em produção, com o token, vale o critério de
  aceite (zero submit sem contato no HubSpot). Crie as 9 propriedades de contato no
  HubSpot antes do go-live.
- **GA4:** marcar a conversão no `roi_lead_submit` e validar em DebugView.

Antes de mídia paga, rodar o checklist de QA de tracking da Seção 8.5.

## Deploy (Vercel)

`vercel.json` já configura framework Vite, o rewrite de SPA e a serverless em `api/`.
Configure `HUBSPOT_PRIVATE_APP_TOKEN` nas env vars do projeto na Vercel.

## Regras de escrita

Sem travessão longo em nenhum texto visível ou de código (usa vírgula, ponto ou hífen
simples). Copy em PT-BR com acentuação correta.
