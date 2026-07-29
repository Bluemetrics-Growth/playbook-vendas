import { useState } from "react";
import {
  CENARIOS,
  CenarioId,
  EstadoCalculo,
  FatoresCenario,
  Resultado,
  getVertical,
} from "../config/roi-model";
import { inteiro, moeda, porcento } from "../lib/format";
import { ComparisonTable } from "./ComparisonTable";

// Tela 2 (Secao 4): premissas em linguagem de decisor + seletor de cenario
// explicado + custo de continuar manual ao vivo (ungated) + premio borrado.
export function Premissas({
  estado,
  setEstado,
  resultado,
  cenario,
  setCenario,
  onPremissaEdit,
  onVerRoi,
  onVoltar,
}: {
  estado: EstadoCalculo;
  setEstado: (e: EstadoCalculo) => void;
  resultado: Resultado; // do cenario selecionado
  cenario: CenarioId;
  setCenario: (c: CenarioId) => void;
  onPremissaEdit: (campo: string) => void;
  onVerRoi: () => void;
  onVoltar: () => void;
}) {
  const vertical = getVertical(estado.verticalId);
  const fatores = estado.fatores[cenario];
  const [avancado, setAvancado] = useState(false);

  // Edita uma entrada compartilhada (numero do cliente, igual nos 3 cenarios).
  function setEntrada<K extends keyof EstadoCalculo["entradas"]>(
    campo: K,
    valor: EstadoCalculo["entradas"][K]
  ) {
    onPremissaEdit(String(campo));
    setEstado({ ...estado, entradas: { ...estado.entradas, [campo]: valor } });
  }

  // Ajuste avancado: edita um fator do cenario exibido, clamp 0..1.
  function setFator(campo: keyof FatoresCenario, valor: number) {
    onPremissaEdit(campo);
    const v = Math.min(1, Math.max(0, valor));
    setEstado({
      ...estado,
      fatores: { ...estado.fatores, [cenario]: { ...fatores, [campo]: v } },
    });
  }

  const mostraD3 = vertical.entradas.editaisExtraMes > 0 || estado.entradas.d3Ligado;

  // Sanity: o volume cabe no time informado? (nao bloqueia, so orienta)
  const horasManuaisMes = (estado.entradas.docsMes * estado.entradas.minutosPorDoc) / 60;
  const capacidadeMes = estado.entradas.pessoas * 160;
  const volumeAcimaDoTime =
    estado.entradas.pessoas > 0 && horasManuaisMes > capacidadeMes * 1.15;

  return (
    <section className="section">
      <div className="bm-container">
        <button className="back-link" onClick={onVoltar}>
          ‹ Trocar vertical
        </button>
        <div className="lead-head">
          <span className="chip chip-blue">{vertical.nome}</span>
          <h2 className="mt-8">Conte como é a sua operação hoje.</h2>
          <p>
            Quatro números que você já conhece. O custo de continuar manual aparece na
            hora. Nada de cadastro ainda.
          </p>
        </div>

        <div className="calc-grid">
          {/* -------- coluna de edicao -------- */}
          <div className="panel">
            <div className="panel__head">
              <span className="panel__title">A sua operação</span>
              <span className="eyebrow">Editável</span>
            </div>

            <div className="grid-2">
              <NumberField
                label="Pessoas na análise hoje"
                hint="Quantas pessoas leem e conferem esses documentos."
                value={estado.entradas.pessoas}
                min={1}
                step={1}
                suffix="pessoas"
                onChange={(v) => setEntrada("pessoas", v)}
              />
              <NumberField
                label="Documentos por mês"
                hint="Contratos, cadastros, notas, editais... o que a equipe analisa."
                value={estado.entradas.docsMes}
                min={0}
                step={10}
                suffix="docs"
                onChange={(v) => setEntrada("docsMes", v)}
              />
              <NumberField
                label="Tempo por documento"
                hint="Em média, quanto tempo leva para ler e conferir um documento."
                value={estado.entradas.minutosPorDoc}
                min={1}
                step={5}
                suffix="min"
                onChange={(v) => setEntrada("minutosPorDoc", Math.round(v))}
              />
              <NumberField
                label="Custo mensal por analista"
                hint="Salário carregado (com encargos) de quem faz a análise."
                value={estado.entradas.custoMensalAnalista}
                min={0}
                step={500}
                prefix="R$"
                onChange={(v) => setEntrada("custoMensalAnalista", v)}
              />
            </div>

            {volumeAcimaDoTime && (
              <p className="field__hint" style={{ color: "var(--bm-orange)" }}>
                Esse volume exige mais horas do que {estado.entradas.pessoas}{" "}
                {estado.entradas.pessoas === 1 ? "pessoa consegue" : "pessoas conseguem"}{" "}
                por mês. Confira o tempo por documento ou o número de pessoas.
              </p>
            )}

            {/* seletor de cenario (ganho de eficiencia com IA) */}
            <div className="scenario-block">
              <div className="field__label" style={{ marginBottom: 10 }}>
                <span>Ganho de eficiência com IA</span>
                <span className="field__val">
                  {porcento(fatores.reducaoTempoIa)} menos tempo
                </span>
              </div>
              <div className="scenario scenario--full">
                {CENARIOS.map((c) => (
                  <button
                    key={c.id}
                    className={c.id === cenario ? "is-active" : ""}
                    onClick={() => setCenario(c.id)}
                  >
                    {c.nome}
                  </button>
                ))}
              </div>
              <p className="field__hint mt-8">
                {CENARIOS.find((c) => c.id === cenario)?.descricao}
              </p>
            </div>

            {/* ajustes avancados */}
            <button
              className="advanced-toggle"
              onClick={() => setAvancado((a) => !a)}
              aria-expanded={avancado}
            >
              {avancado ? "▾" : "▸"} Ajustes avançados (opcional)
            </button>
            {avancado && (
              <div className="advanced-body">
                <p className="field__hint">
                  Preenchemos com benchmarks do BlueDocs. Mexa só se quiser refinar.
                </p>
                <RangeField
                  label="Fator de captura (haircut)"
                  hint="Quanto do ganho teórico você assume de fato. Conservador de propósito."
                  value={fatores.captura}
                  display={porcento(fatores.captura)}
                  onChange={(v) => setFator("captura", v)}
                />
                <RangeField
                  label="Redução de erro com IA"
                  value={fatores.reducaoErro}
                  display={porcento(fatores.reducaoErro)}
                  onChange={(v) => setFator("reducaoErro", v)}
                />
                <RangeField
                  label="Taxa de erro atual"
                  hint="Parcela dos documentos que hoje geram retrabalho ou correção."
                  value={fatores.taxaErro}
                  max={0.2}
                  display={porcento(fatores.taxaErro)}
                  onChange={(v) => setFator("taxaErro", v)}
                />
                <NumberField
                  label="Custo médio por erro"
                  hint="Quanto custa, em média, corrigir um erro que passou."
                  value={estado.entradas.custoErro}
                  min={0}
                  step={100}
                  prefix="R$"
                  onChange={(v) => setEntrada("custoErro", v)}
                />
              </div>
            )}

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
                      suffix="editais"
                      onChange={(v) => setEntrada("editaisExtraMes", v)}
                    />
                    <NumberField
                      label="Ticket médio"
                      value={estado.entradas.ticketMedio}
                      min={0}
                      step={10000}
                      prefix="R$"
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
                {moeda(resultado.custoContinuarManualAno)}
              </div>
              <div className="dor-card__note">
                Cenário {cenarioNome(cenario)}, com os seus números. {inteiro(160)} horas
                por pessoa/mês de referência.
              </div>
            </div>

            <div className="panel">
              <div className="panel__head">
                <span className="panel__title">Hoje vs Com BlueDocs</span>
              </div>
              <ComparisonTable estado={estado} fatores={fatores} />

              {/* bloco premio gateado (borrado) */}
              <div className="locked">
                <div className="locked__blur" aria-hidden="true">
                  <div className="metric-grid" style={{ marginBottom: 0 }}>
                    <div className="metric">
                      <div className="metric__label">Valor recuperável / ano</div>
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

function cenarioNome(c: CenarioId): string {
  return CENARIOS.find((x) => x.id === c)?.nome ?? c;
}

/* ----------------------------------------------------------- subcampos --- */

function NumberField({
  label,
  hint,
  value,
  min,
  step,
  prefix,
  suffix,
  onChange,
}: {
  label: string;
  hint?: string;
  value: number;
  min?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="field">
      <label className="field__label">{label}</label>
      <div className={"input-wrap" + (prefix ? " has-prefix" : "")}>
        {prefix && <span className="input-affix">{prefix}</span>}
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
        {suffix && <span className="input-affix input-affix--suffix">{suffix}</span>}
      </div>
      {hint && <span className="field__hint">{hint}</span>}
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
