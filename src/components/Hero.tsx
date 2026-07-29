import { VERTICAIS } from "../config/roi-model";

// Tela 1 (Secao 4): hero + seletor de vertical + prova.
export function Hero({ onSelect }: { onSelect: (verticalId: string) => void }) {
  return (
    <section className="section">
      <div className="bm-container">
        <div className="hero">
          <div className="hero__eyebrow">Calculadora de ROI · BlueDocs</div>
          <h1 className="hero__title">
            Quanto sua operação recupera por ano trocando leitura manual por IA?
          </h1>
          <p className="hero__sub">
            Coloque o volume e o custo da sua análise manual de documentos. Você vê na
            hora quanto isso pesa por ano. O ROI completo, o payback e o business case
            para a diretoria ficam a um clique.
          </p>

          <div className="hero__proof">
            <span className="chip">AWS Advanced Partner</span>
            <span className="chip">Anthropic Partner</span>
            <span className="chip">+200 projetos entregues</span>
          </div>

          <div className="vert-label">Escolha a sua área para começar</div>
          <div className="vert-grid">
            {VERTICAIS.map((v) => (
              <button
                key={v.id}
                className="vert-card"
                onClick={() => onSelect(v.id)}
              >
                <span className="vert-card__name">{v.nome}</span>
                <span className="vert-card__desc">{v.resumo}</span>
                <span className="vert-card__cta">
                  Calcular <span aria-hidden="true">›</span>
                </span>
              </button>
            ))}
          </div>

          <p className="hero__micro">
            Sem cadastro para começar. Cenário conservador por padrão.
          </p>
        </div>
      </div>
    </section>
  );
}
