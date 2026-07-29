import {
  EstadoCalculo,
  Resultado,
  getVertical,
  porCenarioClamp,
} from "../config/roi-model";
import { moeda, porcento } from "../lib/format";
import { ComparisonTable } from "./ComparisonTable";

// Tela 2 (Secao 4): premissas editaveis + custo de continuar manual ao vivo
// (ungated) + bloco premio borrado com selo de gate.
export function Premissas({
  estado,
  setEstado,
  resultadoConservador,
  onPremissaEdit,
  onVerRoi,
  onVoltar,
}: {
  estado: EstadoCalculo;
  setEstado: (e: EstadoCalculo) => void;
  resultadoConservador: Resultado;
  onPremissaEdit: (campo: string) => void;
  onVerRoi: () => void;
  onVoltar: () => void;
}) {
  const vertical = getVertical(estado.verticalId);
  const fatoresCons = estado.fatores.conservador;

  // Edita uma entrada compartilhada (numero do cliente, igual nos 3 cenarios).
  function setEntrada<K extends keyof EstadoCalculo["entradas"]>(
    campo: K,
    valor: EstadoCalculo["entradas"][K]
  ) {
    onPremissaEdit(String(campo));
    setEstado({ ...estado, entradas: { ...estado.entradas, [campo]: valor } });
  }

  // Edita um fator: aplica o delta aos tres cenarios, preservando o spread
  // (Conservador continua abaixo de Base/Otimista). Clamp em 0..1.
  function setFator(
    campo: "reducaoTempoIa" | "captura" | "taxaErro" | "reducaoErro",
    novoConservador: number
  ) {
    onPremissaEdit(campo);
    setEstado({ ...estado, fatores: porCenarioClamp(estado.fatores, campo, novoConservador) });
  }

  const mostraD3 = vertical.entradas.editaisExtraMes > 0 || estado.entradas.d3Ligado;

  return (
    <section className="section">
      <div className="bm-container">
        <button className="back-link" onClick={onVoltar}>
          ‹ Trocar vertical
        </button>
        <div className="lead-head">
          <span className="chip chip-blue">{vertical.nome}</span>
          <h2 className="mt-8">Ajuste as premissas com os seus números.</h2>
          <p>
            Começamos com um preset conservador da sua vertical. Edite tudo. O custo de
            continuar manual atualiza ao vivo.
          </p>
        </div>

        <div className="calc-grid">
          {/* -------- coluna de edicao -------- */}
          <div className="panel">
            <div className="panel__head">
              <span className="panel__title">Suas premissas</span>
              <span className="eyebrow">Editável</span>
            </div>

            <div className="grid-2">
              <NumberField
                label="Documentos por mês"
                value={estado.entradas.docsMes}
                min={0}
                step={1}
                onChange={(v) => setEntrada("docsMes", v)}
              />
              <NumberField
                label="Horas por documento"
                value={estado.entradas.horasPorDoc}
                min={0}
                step={0.5}
                onChange={(v) => setEntrada("horasPorDoc", v)}
              />
              <NumberField
                label="Custo por hora (R$)"
                value={estado.entradas.custoHora}
                min={0}
                step={10}
                onChange={(v) => setEntrada("custoHora", v)}
              />
              <NumberField
                label="Custo médio por erro (R$)"
                value={estado.entradas.custoErro}
                min={0}
                step={100}
                onChange={(v) => setEntrada("custoErro", v)}
              />
            </div>

            <div className="mt-16" />

            <RangeField
              label="Redução de tempo com IA"
              value={fatoresCons.reducaoTempoIa}
              display={porcento(fatoresCons.reducaoTempoIa)}
              onChange={(v) => setFator("reducaoTempoIa", v)}
            />
            <RangeField
              label="Fator de captura (haircut)"
              hint="Quanto do ganho teórico você assume de fato. Conservador de propósito."
              value={fatoresCons.captura}
              display={porcento(fatoresCons.captura)}
              onChange={(v) => setFator("captura", v)}
            />
            <RangeField
              label="Taxa de erro atual"
              value={fatoresCons.taxaErro}
              max={0.2}
              display={porcento(fatoresCons.taxaErro)}
              onChange={(v) => setFator("taxaErro", v)}
            />
            <RangeField
              label="Redução de erro com IA"
              value={fatoresCons.reducaoErro}
              display={porcento(fatoresCons.reducaoErro)}
              onChange={(v) => setFator("reducaoErro", v)}
            />

            {mostraD3 && (
              <>
                <div className="toggle-row">
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 15 }}>
                      Upside de cobertura (editais)
                    </div>
                    <div className="field__hint">
                      Responder mais editais e ganhar mais. Alta variância, fica fora do
                      número principal.
                    </div>
                  </div>
                  <button
                    className={"toggle" + (estado.entradas.d3Ligado ? " is-on" : "")}
                    aria-label="Ligar upside de cobertura"
                    onClick={() => setEntrada("d3Ligado", !estado.entradas.d3Ligado)}
                  />
                </div>
                {estado.entradas.d3Ligado && (
                  <div className="grid-2">
                    <NumberField
                      label="Editais extras por mês"
                      value={estado.entradas.editaisExtraMes}
                      min={0}
                      step={1}
                      onChange={(v) => setEntrada("editaisExtraMes", v)}
                    />
                    <NumberField
                      label="Ticket médio (R$)"
                      value={estado.entradas.ticketMedio}
                      min={0}
                      step={10000}
                      onChange={(v) => setEntrada("ticketMedio", v)}
                    />
                    <RangeField
                      label="Taxa de vitória"
                      value={estado.entradas.taxaVitoria}
                      display={porcento(estado.entradas.taxaVitoria)}
                      onChange={(v) => setEntrada("taxaVitoria", v)}
                    />
                    <RangeField
                      label="Margem"
                      value={estado.entradas.margem}
                      display={porcento(estado.entradas.margem)}
                      onChange={(v) => setEntrada("margem", v)}
                    />
                  </div>
                )}
              </>
            )}
          </div>

          {/* -------- coluna do resultado parcial -------- */}
          <div>
            <div className="dor-card">
              <div className="dor-card__label">Custo de continuar manual (ano)</div>
              <div className="dor-card__num">
                {moeda(resultadoConservador.custoContinuarManualAno)}
              </div>
              <div className="dor-card__note">
                Cenário conservador, com os seus números. Editável ao lado.
              </div>
            </div>

            <div className="panel">
              <div className="panel__head">
                <span className="panel__title">Hoje vs Com BlueDocs</span>
              </div>
              <ComparisonTable estado={estado} fatores={fatoresCons} />

              {/* bloco premio gateado (borrado) */}
              <div className="locked">
                <div className="locked__blur" aria-hidden="true">
                  <div className="metric-grid" style={{ marginBottom: 0 }}>
                    <div className="metric">
                      <div className="metric__label">Valor recuperavel / ano</div>
                      <div className="metric__num">R$ ••••••</div>
                    </div>
                    <div className="metric">
                      <div className="metric__label">ROI em 12 meses</div>
                      <div className="metric__num">•••%</div>
                    </div>
                    <div className="metric">
                      <div className="metric__label">Payback</div>
                      <div className="metric__num">•• meses</div>
                    </div>
                  </div>
                </div>
                <div className="locked__overlay">
                  <div className="locked__seal">
                    Desbloqueie o ROI completo, o payback e o business case para a
                    diretoria.
                  </div>
                  <button className="bm-btn bm-btn--primary bm-btn--lg" onClick={onVerRoi}>
                    Ver o ROI completo e o business case
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- subcampos --- */

function NumberField({
  label,
  value,
  min,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min?: number;
  step?: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="field">
      <label className="field__label">{label}</label>
      <input
        type="number"
        value={Number.isFinite(value) ? value : 0}
        min={min}
        step={step}
        onChange={(e) => {
          const v = parseFloat(e.target.value);
          onChange(Number.isFinite(v) ? v : 0);
        }}
      />
    </div>
  );
}

function RangeField({
  label,
  value,
  display,
  hint,
  max = 1,
  onChange,
}: {
  label: string;
  value: number;
  display: string;
  hint?: string;
  max?: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="field">
      <label className="field__label">
        <span>{label}</span>
        <span className="field__val">{display}</span>
      </label>
      <input
        type="range"
        min={0}
        max={max}
        step={0.01}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
      {hint && <span className="field__hint">{hint}</span>}
    </div>
  );
}
