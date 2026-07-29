import { useEffect, useMemo, useRef, useState } from "react";
import {
  CENARIO_PADRAO,
  CenarioId,
  EVENTOS,
  EstadoCalculo,
  LINKS,
  calcularCenarios,
  estadoInicial,
} from "./config/roi-model";
import { track } from "./lib/tracking";
import { garantirFirstTouch } from "./lib/firstTouch";
import { LeadForm, enviarLead } from "./lib/lead";
import { Hero } from "./components/Hero";
import { Premissas } from "./components/Premissas";
import { Gate } from "./components/Gate";
import { Resultado } from "./components/Resultado";
import { Step, Stepper } from "./components/Stepper";
import { baixarBusinessCasePdf } from "./pdf/download";

export function App() {
  const [step, setStep] = useState<Step>("hero");
  const [estado, setEstado] = useState<EstadoCalculo | null>(null);
  const [cenario, setCenario] = useState<CenarioId>(CENARIO_PADRAO);
  const [enviando, setEnviando] = useState(false);
  const [gerandoPdf, setGerandoPdf] = useState(false);
  const [leadEmpresa, setLeadEmpresa] = useState("");

  const editouRef = useRef(false); // dedupe do roi_premissa_edit (primeira edicao)

  // First-touch attribution assim que a pagina carrega (Secao 8.3).
  useEffect(() => {
    garantirFirstTouch();
  }, []);

  const resultados = useMemo(
    () => (estado ? calcularCenarios(estado) : null),
    [estado]
  );

  function iniciar(verticalId: string) {
    const novo = estadoInicial(verticalId);
    setEstado(novo);
    setCenario(CENARIO_PADRAO);
    editouRef.current = false;
    track(EVENTOS.start, { vertical: verticalId });

    // roi_resultado_parcial: render do custo ungated (Secao 8.1).
    const res = calcularCenarios(novo);
    track(EVENTOS.resultadoParcial, {
      vertical: verticalId,
      custo_manual_ano: Math.round(res.conservador.custoContinuarManualAno),
    });
    setStep("premissas");
  }

  function onPremissaEdit(campo: string) {
    if (editouRef.current) return;
    editouRef.current = true;
    track(EVENTOS.premissaEdit, { vertical: estado?.verticalId, campo });
  }

  function irParaGate() {
    if (!estado || !resultados) return;
    track(EVENTOS.gateView, {
      vertical: estado.verticalId,
      custo_manual_ano: Math.round(resultados.conservador.custoContinuarManualAno),
    });
    setStep("gate");
  }

  async function onSubmitLead(form: LeadForm) {
    if (!estado || !resultados) return;
    setEnviando(true);
    setLeadEmpresa(form.empresa);
    const r = resultados[cenario];

    // roi_lead_submit com o payload da Secao 8.1.
    track(EVENTOS.leadSubmit, {
      vertical: estado.verticalId,
      cenario,
      custo_manual_ano: Math.round(r.custoContinuarManualAno),
      valor_recuperavel_ano: Math.round(r.valorRecuperavelLiquidoAno),
      roi_12: Number(r.roi12.toFixed(2)),
      payback_meses: r.paybackMeses === null ? null : Number(r.paybackMeses.toFixed(1)),
    });

    // Grava no HubSpot com as 9 propriedades (Secao 8.2). Degrada com elegancia.
    await enviarLead(form, {
      roi_vertical: estado.verticalId,
      roi_cenario: cenario,
      roi_custo_manual_ano: Math.round(r.custoContinuarManualAno),
      roi_valor_recuperavel_ano: Math.round(r.valorRecuperavelLiquidoAno),
      roi_12m: Number(r.roi12.toFixed(2)),
      roi_24m: Number(r.roi24.toFixed(2)),
      roi_payback_meses: r.paybackMeses === null ? null : Number(r.paybackMeses.toFixed(1)),
      roi_docs_mes: estado.entradas.docsMes,
      roi_analistas_liberados: Number(r.analistasLiberados.toFixed(1)),
    });

    setEnviando(false);
    setStep("resultado");
    track(EVENTOS.resultadoCompleto, { vertical: estado.verticalId, cenario });
  }

  function trocarCenario(c: CenarioId) {
    setCenario(c);
    track(EVENTOS.cenarioToggle, { cenario: c });
  }

  async function onDownloadPdf() {
    if (!estado || !resultados) return;
    setGerandoPdf(true);
    track(EVENTOS.pdfDownload, { vertical: estado.verticalId, cenario });
    try {
      await baixarBusinessCasePdf({
        estado,
        resultado: resultados[cenario],
        cenario,
        empresa: leadEmpresa,
      });
    } finally {
      setGerandoPdf(false);
    }
  }

  function onCtaEspecialista() {
    track(EVENTOS.ctaEspecialista, { vertical: estado?.verticalId });
    window.open(LINKS.especialista, "_blank", "noopener");
  }

  return (
    <>
      <nav className="bm-nav">
        <div className="bm-nav__inner">
          <img
            className="bm-nav__logo"
            src="/design-system/assets/logo-blue-horizontal.png"
            alt="bluemetrics"
          />
          <span className="bm-nav__spacer" />
          <span className="bm-nav__tag">Calculadora de ROI · BlueDocs</span>
        </div>
      </nav>

      {step !== "hero" && (
        <div className="bm-container" style={{ paddingTop: 28 }}>
          <Stepper current={step} />
        </div>
      )}

      {step === "hero" && <Hero onSelect={iniciar} />}

      {step === "premissas" && estado && resultados && (
        <Premissas
          estado={estado}
          setEstado={setEstado}
          resultadoConservador={resultados.conservador}
          onPremissaEdit={onPremissaEdit}
          onVerRoi={irParaGate}
          onVoltar={() => setStep("hero")}
        />
      )}

      {step === "gate" && (
        <Gate
          enviando={enviando}
          onSubmit={onSubmitLead}
          onVoltar={() => setStep("premissas")}
        />
      )}

      {step === "resultado" && estado && resultados && (
        <Resultado
          estado={estado}
          resultados={resultados}
          cenario={cenario}
          setCenario={trocarCenario}
          gerandoPdf={gerandoPdf}
          onDownloadPdf={onDownloadPdf}
          onCtaEspecialista={onCtaEspecialista}
        />
      )}

      <footer className="footer">
        <div>
          © 2026 bluemetrics · <a href={LINKS.lpBluedocs}>BlueDocs</a> · Estimativa
          conservadora, editável, com os seus números.
        </div>
      </footer>
    </>
  );
}
