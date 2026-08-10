"use client";

import { motion } from "framer-motion";
import { sampleByTier, sampleCommittee, sampleFunnel } from "@/content/abm/measurement";

export function MeasurementDashboard() {
  const funnelMax = Math.max(...sampleFunnel.map((f) => f.value));
  const tierTotal = sampleByTier.reduce((s, t) => s + t.value, 0);

  return (
    <div className="surface-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <span className="eyebrow">Dashboard ilustrativo</span>
        <span className="chip chip-gray text-[11px]">dados de exemplo</span>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Funil */}
        <div>
          <h4 className="mb-3 font-display text-h4 font-semibold">Funil por estágio</h4>
          <div className="flex flex-col gap-2">
            {sampleFunnel.map((f, i) => (
              <div key={f.stage}>
                <div className="mb-0.5 flex justify-between text-[12px] text-fg-muted">
                  <span>{f.stage}</span>
                  <span className="mono">{f.value}</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-pill bg-bg-stage">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(f.value / funnelMax) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.06 }}
                    className="h-full rounded-pill bg-primary"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contas por tier */}
        <div>
          <h4 className="mb-3 font-display text-h4 font-semibold">Contas por tier</h4>
          <div className="flex items-end gap-3 pt-2" style={{ height: 140 }}>
            {sampleByTier.map((t, i) => (
              <div key={t.tier} className="flex flex-1 flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: `${(t.value / tierTotal) * 130}px` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="w-full rounded-t-m"
                  style={{ background: i === 0 ? "var(--bm-blue)" : "var(--bm-cyan)" }}
                />
                <span className="text-[12px] text-fg-muted">{t.tier}</span>
                <span className="mono text-[12px] font-semibold">{t.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Penetração de comitê */}
        <div>
          <h4 className="mb-3 font-display text-h4 font-semibold">Penetração de comitê</h4>
          <div className="flex flex-col gap-2.5">
            {sampleCommittee.map((c, i) => (
              <div key={c.role}>
                <div className="mb-0.5 flex justify-between text-[12px] text-fg-muted">
                  <span>{c.role}</span>
                  <span className="mono">{c.value}%</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-pill bg-bg-stage">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${c.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.06 }}
                    className="h-full rounded-pill bg-bm-purple"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-4 text-[12px] text-fg-hint">
        Ilustrativo. Na v1 não puxa dado vivo do HubSpot. Integração é fast-follow.
      </p>
    </div>
  );
}
