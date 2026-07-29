import {
  CENARIOS,
  CenarioId,
  EstadoCalculo,
  FAIXA_INVESTIMENTO,
  NOTA_FUNDING_AWS,
  Resultado as ResultadoModel,
  exibirInvestimentoPublico,
  getVertical,
} from "../config/roi-model";
import { inteiro, moeda, payback, roiPorReal, roiPorcento, umaCasa } from "../lib/format";
import { ComparisonTable } from "./ComparisonTable";

// Tela 4 (Secao 4 / 5): resultado completo pos-gate. Herói = valor recuperavel
// liquido/ano. Cards de ROI 12m, payback, analistas. Toggle de cenario.
export function Resultado({
  estado,
  resultados,
  cenario,
  setCenario,
  gerandoPdf,
  onDownloadPdf,
  onCtaEspecialista,
}: {
  estado: EstadoCalculo;
  resultados: Record<CenarioId, ResultadoModel>;
  cenario: CenarioId;
  setCenario: (c: CenarioId) => void;
  gerandoPdf: boolean;
  onDownloadPdf: () => void;
  onCtaEspecialista: () => void;
}) {
  const vertical = getVertical(estado.verticalId);
  const r = resultados[cenario];
  const fatores = estado.fatores[cenario];

  return (
    <section className="section">
      <div className="bm-container bm-container--narrow">
        <div className="lead-head">
          <span className="chip chip-green">
            <span className="dot" style={{ background: "var(--bm-green)" }} />
            Business case liberado
          </span>
          <h2 className="mt-8">O business case de IA documental da sua operação.</h2>
          <p>{vertical.nome}. Ajuste o cenário abaixo, tudo recalcula na hora.</p>
        </div>

        {/* toggle de cenario */}
        <div className="center" style={{ marginBottom: 20 }}>
          <div className="scenario" role="tablist">
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
        </div>

        {/* metrica-heroi */}
        <div className="result-hero">
          <div className="result-hero__label">Valor recuperável líquido / ano</div>
          <div className="result-hero__num">{moeda(r.valorRecuperavelLiquidoAno)}</div>
          <div className="result-hero__note">
            Já descontado o custo do BlueDocs. Cenário {cenarioNome(cenario)}, com os seus
            números.
          </div>
        </div>

        {/* cards */}
        <div className="metric-grid">
          <div className="metric">
            <div className="metric__label">ROI em 12 meses</div>
            <div className="metric__num">{roiPorcento(r.roi12)}</div>
            <div className="metric__note">
              Cada R$ 1 investido vira {roiPorReal(r.roi12)}. Em 24 meses:{" "}
              {roiPorcento(r.roi24)}.
            </div>
          </div>
          <div className="metric">
            <div className="metric__label">Payback</div>
            <div className="metric__num">{payback(r.paybackMeses)}</div>
            <div className="metric__note">Tempo até o investimento se pagar.</div>
          </div>
          <div className="metric">
            <div className="metric__label">Analistas liberados</div>
            <div className="metric__num">{umaCasa(r.analistasLiberados)}</div>
            <div className="metric__note">
              FTEs equivalentes devolvidos ao trabalho de maior valor.
            </div>
          </div>
        </div>

        {/* tabela completa */}
        <div className="panel" style={{ marginBottom: 20 }}>
          <div className="panel__head">
            <span className="panel__title">Hoje vs Com BlueDocs</span>
            <span className="eyebrow">Cenário {cenarioNome(cenario)}</span>
          </div>
          <ComparisonTable estado={estado} fatores={fatores} />
        </div>

        {/* qualitativo */}
        <div className="quali">
          <svg
            className="quali__icon"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
          </svg>
          <div className="quali__text">
            Decisões que hoje levam dias passam a levar horas.
          </div>
        </div>

        {/* faixa de investimento (conforme flag) */}
        {exibirInvestimentoPublico && (
          <div className="invest">
            <div className="invest__label">Investimento do piloto</div>
            <div className="invest__num">
              {moeda(FAIXA_INVESTIMENTO.min)} a {moeda(FAIXA_INVESTIMENTO.max)}
            </div>
            <div className="invest__note">{NOTA_FUNDING_AWS}</div>
          </div>
        )}

        {/* acoes */}
        <div className="actions">
          <button
            className="bm-btn bm-btn--secondary bm-btn--lg"
            onClick={onDownloadPdf}
            disabled={gerandoPdf}
          >
            {gerandoPdf ? "Gerando PDF..." : "Baixar o business case (PDF)"}
          </button>
        </div>

        {/* CTA final */}
        <div className="cta-final">
          <h3 className="cta-final__title">Ver isso rodando nos meus documentos.</h3>
          <p className="cta-final__sub">
            Um especialista mostra o BlueDocs lendo os seus documentos e valida essas
            premissas com você. ROI comprovado em menos de 30 dias.
          </p>
          <a
            className="bm-btn bm-btn--primary bm-btn--lg"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onCtaEspecialista();
            }}
          >
            Falar com um especialista
          </a>
        </div>

        <p className="center field__hint mt-24">
          Analista liberado calculado sobre {inteiro(160)} horas úteis/mês por FTE.
          Números conservadores por padrão. Editáveis nas premissas.
        </p>
      </div>
    </section>
  );
}

function cenarioNome(c: CenarioId): string {
  return CENARIOS.find((x) => x.id === c)?.nome ?? c;
}
