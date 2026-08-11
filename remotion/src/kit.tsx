import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { fontBody } from "./fonts";

export const BLACK = "#06060a";

export const C = {
  blue: "#0c27e8",
  deep: "#030a8b",
  cyan: "#00bbff",
  purple: "#7b00dc",
  orange: "#ff4400",
  green: "#00d100",
  magenta: "#f100a0",
  white: "#ffffff",
  gray: "#8a8a92",
  dim: "rgba(245,245,247,0.74)",
  faint: "rgba(245,245,247,0.5)",
  line: "rgba(255,255,255,0.22)",
  panel: "rgba(255,255,255,0.055)",
  panelBorder: "rgba(255,255,255,0.14)",
};

export function hexA(hex: string, a: number): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

/** Retorna 0..1 com mola, começando em `delay` frames. */
export function useAppear(delay: number, damping = 200): number {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping, mass: 0.7 } });
}

/** Posição ao longo de uma polilinha, t em 0..1. */
export function alongPoints(points: [number, number][], t: number): [number, number] {
  const clamped = Math.max(0, Math.min(1, t));
  const seg = clamped * (points.length - 1);
  const i = Math.min(points.length - 2, Math.floor(seg));
  const f = seg - i;
  const [x1, y1] = points[i];
  const [x2, y2] = points[i + 1];
  return [x1 + (x2 - x1) * f, y1 + (y2 - y1) * f];
}

export const Box: React.FC<{
  left: number;
  top: number;
  width: number;
  height?: number;
  delay?: number;
  accent?: string;
  fill?: string;
  radius?: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ left, top, width, height, delay = 0, accent, fill, radius = 16, children, style }) => {
  const s = useAppear(delay);
  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        width,
        height,
        opacity: s,
        transform: `translateY(${(1 - s) * 16}px)`,
        background: fill ?? C.panel,
        border: `1.5px solid ${accent ?? C.panelBorder}`,
        borderRadius: radius,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "14px 18px",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** Fio SVG desenhado progressivamente (usar dentro de <svg>). */
export const Wire: React.FC<{
  d: string;
  delay: number;
  color?: string;
  width?: number;
  dash?: boolean;
}> = ({ d, delay, color = C.line, width = 2, dash }) => {
  const s = useAppear(delay, 120);
  return (
    <path
      d={d}
      stroke={color}
      strokeWidth={width}
      fill="none"
      strokeLinecap="round"
      pathLength={1}
      strokeDasharray={dash ? "0.02 0.03" : 1}
      strokeDashoffset={dash ? 0 : 1 - s}
      style={{ opacity: s > 0.02 ? 1 : 0 }}
    />
  );
};

export const Chip: React.FC<{
  left: number;
  top: number;
  label: string;
  color: string;
  delay?: number;
  fontSize?: number;
}> = ({ left, top, label, color, delay = 0, fontSize = 22 }) => {
  const s = useAppear(delay);
  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        opacity: s,
        transform: `scale(${0.9 + s * 0.1})`,
        transformOrigin: "left center",
        background: hexA(color, 0.16),
        border: `1.5px solid ${color}`,
        color: C.white,
        borderRadius: 999,
        padding: "7px 16px",
        fontSize,
        fontFamily: fontBody,
        fontWeight: 600,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </div>
  );
};

export const Caption: React.FC<{ text: string; delay: number; accent: string }> = ({ text, delay, accent }) => {
  const s = useAppear(delay);
  return (
    <div
      style={{
        position: "absolute",
        left: 118,
        bottom: 118,
        right: 118,
        opacity: s,
        transform: `translateY(${(1 - s) * 12}px)`,
        display: "flex",
        alignItems: "center",
        gap: 14,
      }}
    >
      <div style={{ width: 4, height: 30, borderRadius: 4, background: accent }} />
      <span style={{ color: C.white, fontSize: 27, fontFamily: fontBody }}>{text}</span>
    </div>
  );
};

/** Título pequeno da cena de diagrama (abaixo do header). */
export const DiagramTitle: React.FC<{ index: number; total: number; title: string; sub: string; accent: string }> = ({
  index,
  total,
  title,
  sub,
  accent,
}) => {
  const s = useAppear(2);
  return (
    <div style={{ position: "absolute", left: 118, top: 128, opacity: s, transform: `translateY(${(1 - s) * 10}px)` }}>
      <div style={{ color: accent, fontFamily: fontBody, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", fontSize: 16 }}>
        Aula {String(index).padStart(2, "0")} de {total}
      </div>
      <div style={{ color: C.white, fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 40, marginTop: 4 }}>
        {title} <span style={{ color: C.dim, fontWeight: 500, fontSize: 26 }}>· {sub}</span>
      </div>
    </div>
  );
};

export function fadeIn(frame: number, dur = 16): number {
  return interpolate(frame, [0, dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
}
