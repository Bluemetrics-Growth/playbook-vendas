import type { Score } from "@/content/types";
import { scoreAbordagem, scorePrioridade } from "@/content/abm/scores";
import { kindMeta } from "@/components/ui/BandBadge";
import { Icon } from "@/components/ui/Icon";

/**
 * Explicação visual dos dois scores: como os sinais viram pontos (categorias
 * com teto) e como os pontos empurram a conta pela régua de bandas.
 */
export function ScoreAnatomy() {
  return (
    <div className="flex flex-col gap-10">
      <ScoreBlock score={scoreAbordagem} icon="Handshake" tierLabel="Tier 2 · relacionamento" />
      <ScoreBlock score={scorePrioridade} icon="Target" tierLabel="Tier 1 · oportunidade" />
    </div>
  );
}

function ScoreBlock({ score, icon, tierLabel }: { score: Score; icon: string; tierLabel: string }) {
  return (
    <section className="flex flex-col gap-4">
      {/* Cabeçalho do score */}
      <div className="flex items-start gap-3">
        <span className="flex h-11 w-11 flex-none items-center justify-center rounded-m bg-primary-soft text-primary">
          <Icon name={icon} size={22} />
        </span>
        <div>
          <span className="eyebrow text-[11px]">{tierLabel}</span>
          <h3 className="font-display text-h3 font-semibold tracking-tight">{score.title}</h3>
          <p className="text-body-sm text-fg-muted">{score.subtitle}</p>
        </div>
      </div>

      {/* Régua de bandas (0-100) */}
      <div>
        <span className="eyebrow text-[10px]">A régua de bandas</span>
        <div className="mt-2 flex overflow-hidden rounded-l border border-border">
          {score.bands.map((b) => {
            const width = ((b.max - b.min + 1) / 100) * 100;
            const meta = kindMeta[b.kind];
            return (
              <div
                key={b.label}
                className="flex min-w-0 flex-col gap-0.5 px-2.5 py-2"
                style={{ width: `${width}%`, background: meta.bg, borderLeft: `3px solid ${meta.color}` }}
                title={`${b.label} (${b.min}-${b.max})`}
              >
                <span className="mono text-[11px] font-semibold" style={{ color: meta.color }}>
                  {b.min}-{b.max}
                </span>
                <span className="truncate text-[12px] font-medium text-fg">{b.label}</span>
                {b.sla ? <span className="text-[10px] text-fg-hint">SLA {b.sla}</span> : null}
              </div>
            );
          })}
        </div>
        <p className="mt-1.5 text-[12px] text-fg-hint">
          Os pontos somam e empurram a conta para a direita. É a banda que diz a próxima ação.
        </p>
      </div>

      {/* Categorias que geram pontos */}
      <div>
        <span className="eyebrow text-[10px]">De onde vêm os pontos</span>
        <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {score.categories.map((cat) => (
            <div key={cat.id} className="surface-card p-4">
              <div className="mb-2 flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 font-medium text-fg">
                  {cat.name}
                  {cat.exclusive ? <span className="chip chip-gray text-[10px]">escolha 1</span> : null}
                </span>
                <span className="mono text-[12px] text-fg-muted">até {cat.cap} pts</span>
              </div>
              <div className="mb-3 h-1.5 w-full overflow-hidden rounded-pill bg-bg-stage">
                <div className="h-full rounded-pill bg-primary/70" style={{ width: `${cat.cap}%` }} />
              </div>
              <ul className="flex flex-col gap-1">
                {cat.increments.map((inc) => (
                  <li key={inc.id} className="flex items-start justify-between gap-2 text-[13px]">
                    <span className="text-fg-muted">{inc.event}</span>
                    <span className="mono flex-none font-medium text-primary">
                      +{inc.points}
                      {inc.repeatable ? `/${inc.unitLabel}` : ""}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Modificador (decaimento / penalidade) */}
      {score.decay ? (
        <p className="rounded-m border border-border bg-bg-soft px-4 py-2.5 text-[13px] text-fg-muted">
          <strong className="text-fg">Decaimento:</strong> sem nenhum sinal por {score.decay.days}, a conta perde {Math.abs(score.decay.points)} pontos e pode cair de banda.
        </p>
      ) : null}
      {score.penalty ? (
        <p className="rounded-m border border-border bg-bg-soft px-4 py-2.5 text-[13px] text-fg-muted">
          <strong className="text-fg">Penalidade por inatividade:</strong> dias sem atividade registrada derrubam o score e movem a conta entre bandas, sem trocar o tier.
        </p>
      ) : null}
    </section>
  );
}
