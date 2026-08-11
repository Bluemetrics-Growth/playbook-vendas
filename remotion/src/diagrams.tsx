import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { fontBody, fontDisplay } from "./fonts";
import { C, hexA, useAppear, alongPoints, Wire, Chip, Caption, DiagramTitle, fadeIn, Box } from "./kit";
import type { Lesson } from "./lessons";

// ---------------------------------------------------------------- helpers
const Svg: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg width={1280} height={720} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>{children}</svg>
);

const NodePill: React.FC<{
  cx: number;
  cy: number;
  w: number;
  line1: string;
  line2?: string;
  color: string;
  delay: number;
  active?: boolean;
}> = ({ cx, cy, w, line1, line2, color, delay, active }) => {
  const s = useAppear(delay);
  return (
    <div
      style={{
        position: "absolute",
        left: cx - w / 2,
        top: cy - 34,
        width: w,
        height: 68,
        opacity: s,
        transform: `translateY(${(1 - s) * 12}px)`,
        background: hexA(color, 0.16),
        border: `2px solid ${color}`,
        borderRadius: 14,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: active ? `0 0 22px ${hexA(color, 0.6)}` : "none",
      }}
    >
      <span style={{ color: "#fff", fontFamily: fontDisplay, fontWeight: 600, fontSize: 20, lineHeight: 1.1 }}>{line1}</span>
      {line2 ? <span style={{ color: C.dim, fontSize: 15, fontFamily: fontBody }}>{line2}</span> : null}
    </div>
  );
};

const BandBar: React.FC<{
  top: number;
  label: string;
  segs: { w: number; color: string; label: string }[];
  markerFrom: number;
  markerTo: number;
  delay: number;
}> = ({ top, label, segs, markerFrom, markerTo, delay }) => {
  const frame = useCurrentFrame();
  const s = useAppear(delay);
  const left = 118;
  const width = 1044;
  const marker = interpolate(frame, [delay + 18, delay + 70], [markerFrom, markerTo], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  let acc = 0;
  return (
    <div style={{ position: "absolute", left, top, width, opacity: s }}>
      <div style={{ color: C.white, fontFamily: fontBody, fontWeight: 600, fontSize: 20, marginBottom: 10 }}>{label}</div>
      <div style={{ position: "relative", display: "flex", width: "100%", height: 30, gap: 3 }}>
        {segs.map((seg, i) => (
          <div key={i} style={{ width: `${seg.w}%`, background: hexA(seg.color, 0.9), borderRadius: 6 }} />
        ))}
        {/* marcador */}
        <div style={{ position: "absolute", left: `${marker}%`, top: -8, transform: "translateX(-50%)" }}>
          <div style={{ width: 0, height: 0, borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: `10px solid #fff` }} />
        </div>
      </div>
      <div style={{ display: "flex", width: "100%", marginTop: 8 }}>
        {segs.map((seg, i) => {
          const l = acc;
          acc += seg.w;
          return (
            <div key={i} style={{ width: `${seg.w}%`, color: C.faint, fontSize: 14, fontFamily: fontBody, textAlign: "center" }}>
              {seg.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Wrap: React.FC<{ lesson: Lesson; caption: string; children: React.ReactNode }> = ({ lesson, caption, children }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ opacity: fadeIn(frame) }}>
      <DiagramTitle index={lesson.index} total={lesson.total} title={lesson.title} sub={lesson.subtitle} accent={lesson.accent} />
      {children}
      <Caption text={caption} delay={70} accent={lesson.accent} />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- 1. Tese
const DOTS: [number, number][] = [
  [40, 30], [120, 70], [200, 40], [90, 120], [170, 150], [250, 110], [60, 190], [150, 220],
  [230, 200], [300, 60], [310, 160], [40, 250], [130, 280], [220, 260], [290, 240], [180, 90],
];
const TeseDiagram: React.FC<{ lesson: Lesson }> = ({ lesson }) => {
  const frame = useCurrentFrame();
  const spear = interpolate(frame, [46, 78], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const impact = useAppear(80);
  const bx = 700;
  const by = 380; // alvo
  return (
    <Wrap lesson={lesson} caption="A conta é a unidade de trabalho. Foco nas contas certas em vez de volume.">
      <Box left={118} top={215} width={470} height={320} delay={6} style={{ justifyContent: "flex-start" }}>
        <div style={{ color: C.dim, fontFamily: fontBody, fontWeight: 600, fontSize: 18 }}>Demand gen · rede</div>
        <div style={{ color: "#fff", fontFamily: fontDisplay, fontSize: 26, fontWeight: 600, marginBottom: 8 }}>Muitos leads, pouco foco</div>
        <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
          {DOTS.map(([x, y], i) => {
            const s = useAppear(10 + i * 2);
            return <div key={i} style={{ position: "absolute", left: x + 20, top: 6 + y * 0.64, width: 12, height: 12, borderRadius: 999, background: hexA(C.gray, 0.9), opacity: s * 0.7 }} />;
          })}
        </div>
      </Box>

      <Box left={660} top={215} width={470} height={320} delay={16} accent={hexA(lesson.accent, 0.6)} style={{ justifyContent: "flex-start" }}>
        <div style={{ color: lesson.accent, fontFamily: fontBody, fontWeight: 600, fontSize: 18 }}>ABM · lança</div>
        <div style={{ color: "#fff", fontFamily: fontDisplay, fontSize: 26, fontWeight: 600 }}>Contas certas</div>
      </Box>
      {/* alvos */}
      {[0, 1, 2].map((i) => {
        const s = useAppear(26 + i * 8);
        const cx = 760 + i * 120;
        const cy = 400;
        const isMain = i === 1;
        return (
          <div key={i} style={{ position: "absolute", left: cx - 34, top: cy - 34, width: 68, height: 68, opacity: s }}>
            {[34, 22, 10].map((r, j) => (
              <div key={j} style={{ position: "absolute", left: 34 - r, top: 34 - r, width: r * 2, height: r * 2, borderRadius: 999, border: `2px solid ${isMain ? lesson.accent : hexA(C.white, 0.5)}` }} />
            ))}
            <div style={{ position: "absolute", left: 28, top: 28, width: 12, height: 12, borderRadius: 999, background: isMain ? lesson.accent : hexA(C.white, 0.6) }} />
          </div>
        );
      })}
      {/* lança */}
      <Svg>
        <Wire d={`M 600 300 L ${600 + (bx + 60 - 600) * spear} ${300 + (by + 20 - 300) * spear}`} delay={46} color={lesson.accent} width={4} />
      </Svg>
      {impact > 0.01 ? (
        <div style={{ position: "absolute", left: 880 - 30, top: 400 - 30, width: 60, height: 60, borderRadius: 999, border: `3px solid ${lesson.accent}`, opacity: (1 - impact) * 0.9, transform: `scale(${0.4 + impact * 1.4})` }} />
      ) : null}
    </Wrap>
  );
};

// ---------------------------------------------------------------- 2. Modelo
const ModeloDiagram: React.FC<{ lesson: Lesson }> = ({ lesson }) => {
  return (
    <Wrap lesson={lesson} caption="Tier define roteamento e cadência. A/B/C define o esforço. Eixos diferentes.">
      <BandBar
        top={225}
        label="Tier 2 · Score de Abordagem"
        delay={8}
        markerFrom={10}
        markerTo={86}
        segs={[
          { w: 40, color: C.gray, label: "0-39 nutrição" },
          { w: 20, color: C.cyan, label: "40-59" },
          { w: 15, color: C.purple, label: "60-74" },
          { w: 25, color: C.orange, label: "75+ gatilho" },
        ]}
      />
      <BandBar
        top={350}
        label="Tier 1 · Score de Prioridade"
        delay={20}
        markerFrom={20}
        markerTo={90}
        segs={[
          { w: 59, color: C.gray, label: "0-59 reengajar" },
          { w: 20, color: C.purple, label: "60-79 ativação" },
          { w: 21, color: C.orange, label: "80+ fechamento" },
        ]}
      />
      <div style={{ position: "absolute", left: 118, top: 470, color: C.dim, fontFamily: fontBody, fontWeight: 600, fontSize: 18 }}>Eixo A/B/C · esforço</div>
      <Chip left={118} top={500} label="A · Strategic 1:1" color={lesson.accent} delay={40} fontSize={20} />
      <Chip left={340} top={500} label="B · Lite 1:poucos" color={C.cyan} delay={48} fontSize={20} />
      <Chip left={560} top={500} label="C · Programmatic 1:muitos" color={C.purple} delay={56} fontSize={20} />
    </Wrap>
  );
};

// ---------------------------------------------------------------- 3. Simulador
const SimuladorDiagram: React.FC<{ lesson: Lesson }> = ({ lesson }) => {
  const frame = useCurrentFrame();
  const left = 118;
  const width = 1044;
  const fill = interpolate(frame, [24, 70], [0, 84], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const drop = interpolate(frame, [130, 165], [0, 10], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const value = fill - drop;
  const band = value >= 80 ? "Fechamento 80+" : value >= 60 ? "Nutrição 60-79" : "Reengajamento";
  const bandColor = value >= 80 ? C.orange : value >= 60 ? C.purple : C.faint;
  const penaltyOn = frame >= 128;
  return (
    <Wrap lesson={lesson} caption="A penalidade por inatividade move a conta entre bandas, sem rebaixar de tier.">
      {/* gauge */}
      <div style={{ position: "absolute", left, top: 270, width }}>
        <div style={{ position: "relative", height: 56, borderRadius: 12, overflow: "hidden", background: "rgba(255,255,255,0.08)", display: "flex" }}>
          <div style={{ width: "60%", background: hexA(C.faint, 0.25) }} />
          <div style={{ width: "20%", background: hexA(C.purple, 0.3) }} />
          <div style={{ width: "20%", background: hexA(C.orange, 0.32) }} />
          {/* preenchimento */}
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${value}%`, background: `linear-gradient(90deg, ${hexA(bandColor, 0.5)}, ${bandColor})`, borderRadius: 12, transition: "none" }} />
          {/* marcador de valor */}
          <div style={{ position: "absolute", left: `${value}%`, top: -6, bottom: -6, width: 3, background: "#fff", transform: "translateX(-1px)" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, color: C.faint, fontSize: 16 }}>
          <span>0</span><span>60</span><span>80</span><span>100</span>
        </div>
      </div>

      {/* valor grande */}
      <div style={{ position: "absolute", left, top: 360, display: "flex", alignItems: "baseline", gap: 18 }}>
        <span style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 92, color: bandColor, lineHeight: 1 }}>{Math.round(value)}</span>
        <span style={{ fontFamily: fontBody, fontSize: 30, color: "#fff", fontWeight: 600 }}>{band}</span>
      </div>

      {penaltyOn ? (
        <Chip left={left + 360} top={392} label="14 dias mudo · -10" color={C.orange} delay={128} fontSize={22} />
      ) : null}
    </Wrap>
  );
};

// ---------------------------------------------------------------- 4. Esteiras
const CAD = [
  { day: "D0", ch: "LINKEDIN", color: "#0a66c2" },
  { day: "D+3", ch: "EMAIL 1:1", color: C.blue },
  { day: "D+5", ch: "LINKEDIN", color: "#0a66c2" },
  { day: "D+7", ch: "WHATSAPP", color: C.green },
  { day: "D+14", ch: "EMAIL 1:1", color: C.blue },
];
const EsteirasDiagram: React.FC<{ lesson: Lesson }> = ({ lesson }) => {
  const frame = useCurrentFrame();
  const y = 380;
  const x0 = 170;
  const step = 210;
  const travel = interpolate(frame, [30, 150], [0, CAD.length - 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <Wrap lesson={lesson} caption="Um workflow por banda. Sequência de tasks por canal, com gatilhos e SLA de 24h.">
      <Svg>
        <Wire d={`M ${x0} ${y} L ${x0 + step * (CAD.length - 1)} ${y}`} delay={12} color={C.line} width={3} />
      </Svg>
      {CAD.map((t, i) => {
        const s = useAppear(20 + i * 14);
        const cx = x0 + i * step;
        const reached = travel >= i - 0.15;
        return (
          <div key={i} style={{ position: "absolute", left: cx - 70, top: y - 78, width: 140, opacity: s, textAlign: "center" }}>
            <div style={{ color: C.faint, fontFamily: "monospace", fontSize: 16, marginBottom: 6 }}>{t.day}</div>
            <div style={{ margin: "0 auto", width: 140, height: 44, borderRadius: 10, border: `2px solid ${t.color}`, background: hexA(t.color, reached ? 0.28 : 0.12), display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: fontBody, fontWeight: 600, fontSize: 15, boxShadow: reached ? `0 0 16px ${hexA(t.color, 0.5)}` : "none" }}>
              {t.ch}
            </div>
          </div>
        );
      })}
      {/* token */}
      <div style={{ position: "absolute", left: x0 + travel * step - 11, top: y - 11, width: 22, height: 22, borderRadius: 999, background: "#fff", boxShadow: `0 0 16px ${hexA(lesson.accent, 0.9)}` }} />
      <Chip left={170} top={470} label="T2-3 · gatilho 75 · SLA 24h" color={C.orange} delay={90} fontSize={20} />
    </Wrap>
  );
};

// ---------------------------------------------------------------- 5. Jornada
const JNODES = [
  { line1: "Nutrição", line2: "Tier 2", color: C.gray },
  { line1: "Observação", line2: "60-74", color: C.purple },
  { line1: "Gatilho 75", line2: "SQL", color: C.orange },
  { line1: "Promoção", line2: "→ Tier 1", color: C.blue },
  { line1: "Ativação", line2: "60-79", color: C.purple },
  { line1: "Fechamento", line2: "80+", color: C.orange },
];
const JornadaDiagram: React.FC<{ lesson: Lesson }> = ({ lesson }) => {
  const frame = useCurrentFrame();
  const y = 320;
  const xs = [175, 360, 545, 730, 915, 1100];
  const travel = interpolate(frame, [40, 300], [0, xs.length - 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const [tx] = [alongPoints(xs.map((x) => [x, y]) as [number, number][], travel / (xs.length - 1))];
  const pulse = 0.5 + 0.5 * Math.sin(frame / 7);
  return (
    <Wrap lesson={lesson} caption="Tier 1 nunca volta ao Tier 2. A conta só sai no fechamento do deal.">
      <Svg>
        {xs.slice(0, -1).map((x, i) => (
          <Wire key={i} d={`M ${x + 78} ${y} L ${xs[i + 1] - 78} ${y}`} delay={30 + i * 10} color={C.line} width={2.5} />
        ))}
      </Svg>
      {JNODES.map((n, i) => (
        <NodePill key={i} cx={xs[i]} cy={y} w={150} line1={n.line1} line2={n.line2} color={n.color} delay={24 + i * 12} active={Math.abs(travel - i) < 0.5} />
      ))}
      {/* token */}
      <div style={{ position: "absolute", left: tx[0] - 9, top: y - 9, width: 18, height: 18, borderRadius: 999, background: "#fff", boxShadow: `0 0 18px ${hexA(lesson.accent, 1)}`, zIndex: 5 }} />
      {/* always-on */}
      <div style={{ position: "absolute", left: 118, top: 430, width: 1044, height: 52, borderRadius: 12, border: `2px dashed ${hexA(C.purple, 0.7)}`, background: hexA(C.purple, 0.08 + pulse * 0.06), display: "flex", alignItems: "center", justifyContent: "center", color: C.white, fontFamily: fontBody, fontWeight: 600, fontSize: 18 }}>
        air cover always-on · ads no comitê em todas as etapas
      </div>
    </Wrap>
  );
};

// ---------------------------------------------------------------- 6. Orquestração
const STAGES = [
  { t: "Paid", d: "aquece", color: C.cyan },
  { t: "Toque humano", d: "dá lift", color: C.blue },
  { t: "Email", d: "amplifica", color: C.purple },
  { t: "Evento", d: "captura intenção", color: C.orange },
];
const OrquestracaoDiagram: React.FC<{ lesson: Lesson }> = ({ lesson }) => {
  const y = 340;
  const x0 = 190;
  const step = 300;
  return (
    <Wrap lesson={lesson} caption="Sinal quente exige ação em até 24h. Registrar toda atividade.">
      <Svg>
        {STAGES.slice(0, -1).map((_, i) => (
          <Wire key={i} d={`M ${x0 + i * step + 110} ${y} L ${x0 + (i + 1) * step - 110} ${y}`} delay={40 + i * 14} color={lesson.accent} width={3} />
        ))}
      </Svg>
      {STAGES.map((s, i) => {
        const ap = useAppear(20 + i * 16);
        const cx = x0 + i * step;
        return (
          <div key={i} style={{ position: "absolute", left: cx - 110, top: y - 55, width: 220, height: 110, opacity: ap, transform: `translateY(${(1 - ap) * 14}px)`, borderRadius: 16, border: `2px solid ${s.color}`, background: hexA(s.color, 0.14), display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <span style={{ position: "absolute", top: 10, left: 14, color: s.color, fontFamily: "monospace", fontSize: 15 }}>{i + 1}</span>
            <span style={{ color: "#fff", fontFamily: fontDisplay, fontWeight: 600, fontSize: 26 }}>{s.t}</span>
            <span style={{ color: C.dim, fontFamily: fontBody, fontSize: 18 }}>{s.d}</span>
          </div>
        );
      })}
      <Chip left={190} top={470} label="SE cruza 75  ENTÃO  SLA 24h" color={C.orange} delay={92} fontSize={20} />
    </Wrap>
  );
};

// ---------------------------------------------------------------- 7. HubSpot
const HubspotDiagram: React.FC<{ lesson: Lesson }> = ({ lesson }) => {
  const empresaProps = [
    { t: "Score de Abordagem", y: 226 },
    { t: "Score de Prioridade", y: 272 },
    { t: "ICP Tier", y: 318 },
    { t: "Target Account", y: 364 },
  ];
  const contatoProps = [
    { t: "Buying Role", y: 452 },
    { t: "Data última atividade", y: 498 },
  ];
  const eEdge = { x: 322, y: 300 }; // borda direita do card Empresa
  const cEdge = { x: 322, y: 470 };
  const chipX = 372;
  return (
    <Wrap lesson={lesson} caption="O app é espelho do CRM. Nomes de propriedades e workflows batem com o HubSpot.">
      <Svg>
        {empresaProps.map((p, i) => (
          <Wire key={`e${i}`} d={`M ${eEdge.x} ${eEdge.y} L ${chipX} ${p.y + 16}`} delay={30 + i * 7} color={hexA(lesson.accent, 0.6)} width={2} />
        ))}
        {contatoProps.map((p, i) => (
          <Wire key={`c${i}`} d={`M ${cEdge.x} ${cEdge.y} L ${chipX} ${p.y + 16}`} delay={42 + i * 7} color={hexA(C.cyan, 0.6)} width={2} />
        ))}
        {/* Target Account + Buying Role alimentam o público always-on */}
        <Wire d={`M 700 380 C 800 380, 800 350, 872 350`} delay={72} color={hexA(C.purple, 0.6)} width={2} />
        <Wire d={`M 700 468 C 800 468, 800 380, 872 372`} delay={78} color={hexA(C.purple, 0.6)} width={2} />
      </Svg>

      <NodePill cx={230} cy={300} w={184} line1="Empresa" line2="objeto" color={lesson.accent} delay={8} />
      <NodePill cx={230} cy={470} w={184} line1="Contato" line2="objeto" color={C.cyan} delay={16} />

      {empresaProps.map((p, i) => (
        <Chip key={p.t} left={chipX} top={p.y} label={p.t} color={lesson.accent} delay={34 + i * 7} fontSize={18} />
      ))}
      {contatoProps.map((p, i) => (
        <Chip key={p.t} left={chipX} top={p.y} label={p.t} color={C.cyan} delay={44 + i * 7} fontSize={18} />
      ))}

      <Box left={872} top={312} width={288} height={104} delay={70} accent={hexA(C.purple, 0.7)}>
        <div style={{ color: "#fff", fontFamily: fontBody, fontWeight: 600, fontSize: 20 }}>Público always-on</div>
        <div style={{ color: C.dim, fontSize: 16, marginTop: 6 }}>Lista de ads sincronizada com o LinkedIn, no comitê inteiro.</div>
      </Box>
    </Wrap>
  );
};

// ---------------------------------------------------------------- 8. Medição
const FUNNEL = [
  { label: "Contas-alvo", v: 120, w: 100 },
  { label: "Engajadas", v: 74, w: 78 },
  { label: "Reuniões", v: 28, w: 56 },
  { label: "Oportunidades", v: 16, w: 40 },
  { label: "Fechamento", v: 6, w: 26 },
];
const MedicaoDiagram: React.FC<{ lesson: Lesson }> = ({ lesson }) => {
  const frame = useCurrentFrame();
  return (
    <Wrap lesson={lesson} caption="Aposentar o MQL. Medir penetração de conta e pipeline criado, influenciado e acelerado.">
      {/* funil */}
      <div style={{ position: "absolute", left: 118, top: 220, width: 620 }}>
        {FUNNEL.map((f, i) => {
          const s = useAppear(14 + i * 10);
          const grow = interpolate(frame, [14 + i * 10, 44 + i * 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div key={f.label} style={{ height: 54, marginBottom: 8, display: "flex", justifyContent: "center", opacity: s }}>
              <div style={{ width: `${f.w * grow}%`, background: `linear-gradient(90deg, ${C.deep}, ${lesson.accent})`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", minWidth: 120 }}>
                <span style={{ color: "#fff", fontFamily: fontBody, fontWeight: 600, fontSize: 17 }}>{f.label}</span>
                <span style={{ color: "#fff", fontFamily: "monospace", fontSize: 17 }}>{f.v}</span>
              </div>
            </div>
          );
        })}
      </div>
      {/* antes/depois */}
      <Box left={790} top={240} width={370} height={130} delay={40}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ textDecoration: "line-through", color: C.faint, fontSize: 22, fontFamily: fontBody }}>MQL</span>
          <span style={{ color: lesson.accent, fontSize: 26 }}>→</span>
          <span style={{ color: "#fff", fontSize: 22, fontFamily: fontBody, fontWeight: 600 }}>Conta e pipeline</span>
        </div>
        <div style={{ color: C.dim, fontSize: 17, marginTop: 8, fontFamily: fontBody }}>MQA disparada pelos gatilhos de banda.</div>
      </Box>
      <Chip left={790} top={392} label="Relacionamento" color={C.cyan} delay={58} fontSize={18} />
      <Chip left={982} top={392} label="Reputação" color={C.purple} delay={64} fontSize={18} />
      <Chip left={790} top={440} label="Receita" color={lesson.accent} delay={70} fontSize={18} />
    </Wrap>
  );
};

// ---------------------------------------------------------------- 9. Piloto
const PHASES = [
  { name: "Fase 0 · Fundação", weeks: "sem. 1-2", w: 2, color: C.gray },
  { name: "Fase 1 · Ativação", weeks: "sem. 3-8", w: 6, color: C.purple },
  { name: "Fase 2 · Conversão", weeks: "sem. 9-12", w: 4, color: C.orange },
];
const PilotoDiagram: React.FC<{ lesson: Lesson }> = ({ lesson }) => {
  const frame = useCurrentFrame();
  const left = 118;
  const width = 1044;
  let acc = 0;
  return (
    <Wrap lesson={lesson} caption="Meta de 5 a 8 novas reuniões com contas-alvo em 90 dias. Ritual semanal com dono por conta.">
      {/* semanas */}
      <div style={{ position: "absolute", left, top: 250, width, display: "flex", justifyContent: "space-between", color: C.faint, fontSize: 15, fontFamily: "monospace" }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i}>S{i + 1}</span>
        ))}
      </div>
      {/* faixas de fase */}
      {PHASES.map((p, i) => {
        const s = useAppear(16 + i * 14);
        const grow = interpolate(frame, [16 + i * 14, 52 + i * 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const x = left + (acc / 12) * width;
        const w = (p.w / 12) * width - 8;
        acc += p.w;
        return (
          <div key={p.name} style={{ position: "absolute", left: x, top: 288, width: w * grow, height: 92, opacity: s, borderRadius: 12, border: `2px solid ${p.color}`, background: hexA(p.color, 0.16), display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 18px", overflow: "hidden" }}>
            <span style={{ color: "#fff", fontFamily: fontDisplay, fontWeight: 600, fontSize: 22, whiteSpace: "nowrap" }}>{p.name}</span>
            <span style={{ color: C.dim, fontFamily: fontBody, fontSize: 16 }}>{p.weeks}</span>
          </div>
        );
      })}
      <Chip left={left} top={430} label="Ritual semanal · sales + marketing" color={lesson.accent} delay={72} fontSize={20} />
    </Wrap>
  );
};

// ---------------------------------------------------------------- 10. Glossário
// Hub central + termos em duas colunas (evita colidir com título e legenda).
const TERMS = [
  { t: "Tier 1 / Tier 2", col: 0, y: 236, color: C.blue },
  { t: "Score de Abordagem/Prioridade", col: 0, y: 316, color: C.cyan },
  { t: "MQA", col: 0, y: 396, color: C.purple },
  { t: "Penetração de conta", col: 0, y: 476, color: C.blue },
  { t: "Buying Role", col: 1, y: 236, color: C.orange },
  { t: "Air cover / always-on", col: 1, y: 316, color: C.cyan },
  { t: "Gatilho / SLA", col: 1, y: 396, color: C.orange },
  { t: "Penalidade por inatividade", col: 1, y: 476, color: C.purple },
];
const GlossarioDiagram: React.FC<{ lesson: Lesson }> = ({ lesson }) => {
  const hub = { x: 250, y: 370 };
  const colX = [470, 830];
  return (
    <Wrap lesson={lesson} caption="Um vocabulário só entre sales e marketing. Cada termo aparece em ação no playbook.">
      <Svg>
        {TERMS.map((t, i) => (
          <Wire key={i} d={`M ${hub.x + 66} ${hub.y} L ${colX[t.col] - 6} ${t.y + 18}`} delay={26 + i * 6} color={hexA(t.color, 0.55)} width={2} />
        ))}
      </Svg>
      {/* hub central */}
      <div style={{ position: "absolute", left: hub.x - 66, top: hub.y - 66, width: 132, height: 132, borderRadius: 999, background: hexA(lesson.accent, 0.2), border: `3px solid ${lesson.accent}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ color: "#fff", fontFamily: fontDisplay, fontWeight: 700, fontSize: 34 }}>ABM</span>
      </div>
      {TERMS.map((t, i) => (
        <Chip key={t.t} left={colX[t.col]} top={t.y} label={t.t} color={t.color} delay={30 + i * 6} fontSize={19} />
      ))}
    </Wrap>
  );
};

// ---------------------------------------------------------------- registry
export const diagrams: Record<string, React.FC<{ lesson: Lesson }>> = {
  tese: TeseDiagram,
  modelo: ModeloDiagram,
  simulador: SimuladorDiagram,
  esteiras: EsteirasDiagram,
  jornada: JornadaDiagram,
  orquestracao: OrquestracaoDiagram,
  hubspot: HubspotDiagram,
  medicao: MedicaoDiagram,
  piloto: PilotoDiagram,
  glossario: GlossarioDiagram,
};
