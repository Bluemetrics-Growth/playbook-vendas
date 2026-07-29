import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import {
  CENARIOS,
  CenarioId,
  EstadoCalculo,
  FAIXA_INVESTIMENTO,
  NOTA_FUNDING_AWS,
  Resultado,
  comporPremissas,
  exibirInvestimentoPublico,
  getVertical,
} from "../config/roi-model";
import { inteiro, moeda, payback, porcento, roiPorcento, umaCasa } from "../lib/format";

// Fontes do design system (mesmos arquivos self-hosted). Paridade com a web.
Font.register({
  family: "Outfit",
  fonts: [
    { src: "/design-system/fonts/Outfit-Regular.ttf", fontWeight: 400 },
    { src: "/design-system/fonts/Outfit-600.ttf", fontWeight: 600 },
    { src: "/design-system/fonts/Outfit-700.ttf", fontWeight: 700 },
  ],
});
Font.register({
  family: "WixMadeforText",
  fonts: [
    { src: "/design-system/fonts/Wix_Madefor_Text-Regular.ttf", fontWeight: 400 },
    { src: "/design-system/fonts/Wix_Madefor_Text-600.ttf", fontWeight: 600 },
    { src: "/design-system/fonts/Wix_Madefor_Text-700.ttf", fontWeight: 700 },
  ],
});

// Tokens do design system, espelhados (colors_and_type.css).
const T = {
  blue: "#0c27e8",
  deepBlue: "#030a8b",
  ink: "#1d1d1f",
  muted: "#6e6e73",
  hint: "#a1a1a6",
  border: "#ececef",
  stage: "#f5f5f7",
  white: "#ffffff",
};

const s = StyleSheet.create({
  page: {
    fontFamily: "WixMadeforText",
    fontSize: 10,
    color: T.ink,
    padding: 36,
    lineHeight: 1.45,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 18,
    paddingBottom: 14,
    borderBottom: `1px solid ${T.border}`,
  },
  brand: { fontFamily: "Outfit", fontSize: 15, fontWeight: 700, color: T.blue },
  brandNote: { fontSize: 8, color: T.muted, marginTop: 2 },
  cred: { fontSize: 8, color: T.muted, textAlign: "right", lineHeight: 1.4 },
  eyebrow: {
    fontSize: 8,
    color: T.muted,
    textTransform: "uppercase",
    letterSpacing: 1,
    fontWeight: 600,
  },
  title: { fontFamily: "Outfit", fontSize: 18, fontWeight: 700, marginTop: 4, marginBottom: 14 },
  heroCard: {
    backgroundColor: T.deepBlue,
    color: T.white,
    borderRadius: 12,
    padding: 18,
    marginBottom: 14,
  },
  heroLabel: { fontSize: 8, textTransform: "uppercase", letterSpacing: 1, color: "#c9cffb" },
  heroNum: { fontFamily: "Outfit", fontSize: 30, fontWeight: 700, color: T.white, marginTop: 4 },
  heroNote: { fontSize: 8, color: "#c9cffb", marginTop: 4 },
  metricsRow: { flexDirection: "row", gap: 10, marginBottom: 14 },
  metric: { flex: 1, backgroundColor: T.stage, borderRadius: 10, padding: 12 },
  metricLabel: { fontSize: 8, color: T.muted, fontWeight: 600 },
  metricNum: { fontFamily: "Outfit", fontSize: 18, fontWeight: 700, color: T.blue, marginTop: 3 },
  sectionTitle: { fontFamily: "Outfit", fontSize: 12, fontWeight: 600, marginBottom: 8 },
  table: { borderRadius: 8, overflow: "hidden", marginBottom: 14 },
  trHead: { flexDirection: "row", backgroundColor: T.stage },
  tr: { flexDirection: "row", borderBottom: `1px solid ${T.border}` },
  th: { flex: 1, padding: 6, fontSize: 8, color: T.muted, fontWeight: 600, textTransform: "uppercase" },
  td: { flex: 1, padding: 6, fontSize: 9 },
  tdBlue: { flex: 1, padding: 6, fontSize: 9, color: T.blue, fontFamily: "Outfit", fontWeight: 600 },
  quali: {
    backgroundColor: "#eef1fe",
    borderRadius: 8,
    padding: 12,
    marginBottom: 14,
    fontFamily: "Outfit",
    fontWeight: 600,
    fontSize: 11,
  },
  premissasBox: {
    border: `1px solid ${T.border}`,
    borderRadius: 8,
    padding: 12,
    marginBottom: 14,
  },
  premLine: { flexDirection: "row", justifyContent: "space-between", marginBottom: 3 },
  premKey: { fontSize: 9, color: T.muted },
  premVal: { fontSize: 9, color: T.ink, fontWeight: 600 },
  invest: {
    border: `1px dashed ${T.hint}`,
    borderRadius: 8,
    padding: 12,
    marginBottom: 14,
  },
  cta: {
    backgroundColor: T.blue,
    color: T.white,
    borderRadius: 10,
    padding: 14,
    textAlign: "center",
  },
  ctaTitle: { fontFamily: "Outfit", fontSize: 13, fontWeight: 700, color: T.white },
  ctaSub: { fontSize: 9, color: "#dfe3fd", marginTop: 3 },
  footer: { marginTop: 16, fontSize: 7, color: T.hint, textAlign: "center" },
});

export interface PdfProps {
  estado: EstadoCalculo;
  resultado: Resultado;
  cenario: CenarioId;
  empresa: string;
}

export function BusinessCasePdf({ estado, resultado: r, cenario, empresa }: PdfProps) {
  const vertical = getVertical(estado.verticalId);
  const cenarioNome = CENARIOS.find((c) => c.id === cenario)?.nome ?? cenario;
  const { premissas } = comporPremissas(estado.entradas, estado.fatores[cenario]);

  const horasHoje = premissas.docsMes * premissas.horasPorDoc;
  const horasCom = horasHoje * (1 - premissas.reducaoTempoIa);
  const erroHoje = premissas.docsMes * premissas.taxaErro * premissas.custoErro;
  const erroCom = erroHoje * (1 - premissas.reducaoErro);

  const rows = [
    ["Tempo de análise (h/mês)", `${inteiro(horasHoje)} h`, `${inteiro(horasCom)} h`],
    [
      "Custo da análise manual (mês)",
      moeda(horasHoje * premissas.custoHora),
      moeda(horasHoje * premissas.custoHora * (1 - premissas.reducaoTempoIa)),
    ],
    ["Erros e retrabalho (mês)", moeda(erroHoje), moeda(erroCom)],
    ["Velocidade de decisão", "Dias", "Horas"],
  ];

  return (
    <Document title={`Business case BlueDocs ${empresa}`.trim()}>
      <Page size="A4" style={s.page}>
        {/* header com credenciais (Secao 7) */}
        <View style={s.header}>
          <View>
            <Text style={s.brand}>bluemetrics · BlueDocs</Text>
            <Text style={s.brandNote}>Análise inteligente de documentos</Text>
          </View>
          <Text style={s.cred}>
            Anthropic Partner{"\n"}AWS Advanced Partner{"\n"}+200 projetos entregues
          </Text>
        </View>

        <Text style={s.eyebrow}>Business case · {vertical.nome}</Text>
        <Text style={s.title}>
          Quanto {empresa || "a sua operação"} recupera automatizando a análise documental.
        </Text>

        {/* heroi: valor recuperavel (recovery-first) */}
        <View style={s.heroCard}>
          <Text style={s.heroLabel}>Valor recuperável líquido / ano</Text>
          <Text style={s.heroNum}>{moeda(r.valorRecuperavelLiquidoAno)}</Text>
          <Text style={s.heroNote}>
            Cenário {cenarioNome}, já descontado o custo do BlueDocs. Com os números da
            operação.
          </Text>
        </View>

        <View style={s.metricsRow}>
          <View style={s.metric}>
            <Text style={s.metricLabel}>ROI em 12 meses</Text>
            <Text style={s.metricNum}>{roiPorcento(r.roi12)}</Text>
          </View>
          <View style={s.metric}>
            <Text style={s.metricLabel}>Payback</Text>
            <Text style={s.metricNum}>{payback(r.paybackMeses)}</Text>
          </View>
          <View style={s.metric}>
            <Text style={s.metricLabel}>Analistas liberados</Text>
            <Text style={s.metricNum}>{umaCasa(r.analistasLiberados)}</Text>
          </View>
        </View>

        <Text style={s.sectionTitle}>Hoje vs Com BlueDocs</Text>
        <View style={s.table}>
          <View style={s.trHead}>
            <Text style={s.th}> </Text>
            <Text style={s.th}>Hoje (manual)</Text>
            <Text style={s.th}>Com BlueDocs</Text>
          </View>
          {rows.map((row) => (
            <View style={s.tr} key={row[0]}>
              <Text style={s.td}>{row[0]}</Text>
              <Text style={s.td}>{row[1]}</Text>
              <Text style={s.tdBlue}>{row[2]}</Text>
            </View>
          ))}
        </View>

        <Text style={s.quali}>Decisões que hoje levam dias passam a levar horas.</Text>

        {/* premissas usadas (transparencia, Secao 7) */}
        <Text style={s.sectionTitle}>Premissas usadas</Text>
        <View style={s.premissasBox}>
          <Prem k="Documentos por mês" v={inteiro(premissas.docsMes)} />
          <Prem k="Horas por documento" v={umaCasa(premissas.horasPorDoc)} />
          <Prem k="Custo por hora" v={moeda(premissas.custoHora)} />
          <Prem k="Redução de tempo com IA" v={porcento(premissas.reducaoTempoIa)} />
          <Prem k="Fator de captura (haircut)" v={porcento(premissas.captura)} />
          <Prem k="Taxa de erro atual" v={porcento(premissas.taxaErro)} />
          <Prem k="Redução de erro com IA" v={porcento(premissas.reducaoErro)} />
        </View>

        {exibirInvestimentoPublico && (
          <View style={s.invest}>
            <Text style={s.metricLabel}>Investimento do piloto</Text>
            <Text style={{ fontFamily: "Outfit", fontSize: 13, fontWeight: 600, marginTop: 2 }}>
              {moeda(FAIXA_INVESTIMENTO.min)} a {moeda(FAIXA_INVESTIMENTO.max)}
            </Text>
            <Text style={{ fontSize: 8, color: T.muted, marginTop: 3 }}>{NOTA_FUNDING_AWS}</Text>
          </View>
        )}

        <View style={s.cta}>
          <Text style={s.ctaTitle}>Ver isso rodando nos seus documentos.</Text>
          <Text style={s.ctaSub}>
            Fale com um especialista. ROI comprovado em menos de 30 dias, implantação em 1
            a 2 semanas, dados 100% na sua conta AWS.
          </Text>
        </View>

        <Text style={s.footer}>
          Estimativa gerada pela Calculadora de ROI do BlueDocs com premissas conservadoras
          e editáveis. Não constitui proposta comercial. bluemetrics.
        </Text>
      </Page>
    </Document>
  );
}

function Prem({ k, v }: { k: string; v: string }) {
  return (
    <View style={s.premLine}>
      <Text style={s.premKey}>{k}</Text>
      <Text style={s.premVal}>{v}</Text>
    </View>
  );
}
