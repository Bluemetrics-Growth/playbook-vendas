import React from "react";
import {
  AbsoluteFill,
  Img,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { fontDisplay, fontBody } from "./fonts";
import type { Lesson } from "./lessons";

const BLACK = "#06060a";

export const LessonVideo: React.FC<{ lesson: Lesson }> = ({ lesson }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const appear = (delay: number) => {
    const s = spring({ frame: frame - delay, fps, config: { damping: 200, mass: 0.6 } });
    return { opacity: s, y: interpolate(s, [0, 1], [26, 0]) };
  };

  // Ken Burns lento na capa.
  const scale = interpolate(frame, [0, durationInFrames], [1.08, 1.18]);
  const coverOpacity = interpolate(frame, [0, 20], [0, 0.55], { extrapolateRight: "clamp" });

  // Barra de progresso.
  const progress = interpolate(frame, [0, durationInFrames], [0, 1]);

  // Outro CTA.
  const outroStart = durationInFrames - 70;
  const outro = spring({ frame: frame - outroStart, fps, config: { damping: 200 } });

  const eyebrow = appear(6);
  const title = appear(16);
  const subtitle = appear(26);

  return (
    <AbsoluteFill style={{ backgroundColor: BLACK, fontFamily: fontBody }}>
      {/* Capa */}
      <AbsoluteFill style={{ opacity: coverOpacity }}>
        <Img
          src={staticFile(`brand/${lesson.cover}`)}
          style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${scale})` }}
        />
      </AbsoluteFill>

      {/* Overlays de leitura */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(105deg, ${BLACK} 34%, rgba(6,6,10,0.72) 58%, rgba(6,6,10,0.35) 100%)`,
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(1100px 700px at 12% 8%, ${hexA(lesson.accent, 0.22)}, transparent 60%)`,
        }}
      />

      {/* Barra de acento à esquerda */}
      <div
        style={{
          position: "absolute",
          left: 90,
          top: 198,
          width: 6,
          height: 344,
          borderRadius: 6,
          background: lesson.accent,
          opacity: title.opacity,
        }}
      />

      {/* Logo */}
      <div style={{ position: "absolute", top: 64, left: 90, display: "flex", alignItems: "center", gap: 16 }}>
        <Img src={staticFile("brand/logo-white-horizontal.png")} style={{ height: 30 }} />
        <div style={{ width: 1, height: 22, background: "rgba(255,255,255,0.3)" }} />
        <span style={{ fontFamily: fontDisplay, fontWeight: 600, color: "#fff", fontSize: 22 }}>Playbook</span>
      </div>

      {/* Conteúdo */}
      <div style={{ position: "absolute", left: 118, top: 196, right: 90 }}>
        <div
          style={{
            opacity: eyebrow.opacity,
            transform: `translateY(${eyebrow.y}px)`,
            fontFamily: fontBody,
            fontWeight: 600,
            letterSpacing: 3,
            textTransform: "uppercase",
            fontSize: 20,
            color: hexA(lesson.accent, 1),
          }}
        >
          Módulo ABM · Aula {String(lesson.index).padStart(2, "0")} de {lesson.total}
        </div>

        <div
          style={{
            opacity: title.opacity,
            transform: `translateY(${title.y}px)`,
            fontFamily: fontDisplay,
            fontWeight: 700,
            color: "#fff",
            fontSize: 76,
            lineHeight: 1.02,
            letterSpacing: -1.5,
            marginTop: 12,
          }}
        >
          {lesson.title}
        </div>

        <div
          style={{
            opacity: subtitle.opacity,
            transform: `translateY(${subtitle.y}px)`,
            fontFamily: fontBody,
            color: "rgba(245,245,247,0.82)",
            fontSize: 31,
            marginTop: 8,
          }}
        >
          {lesson.subtitle}
        </div>

        {/* Bullets */}
        <div style={{ marginTop: 36, display: "flex", flexDirection: "column", gap: 18 }}>
          {lesson.bullets.map((b, i) => {
            const a = appear(64 + i * 34);
            return (
              <div
                key={i}
                style={{
                  opacity: a.opacity,
                  transform: `translateY(${a.y}px)`,
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 999,
                    flex: "none",
                    background: hexA(lesson.accent, 0.16),
                    border: `2px solid ${lesson.accent}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={lesson.accent} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <span style={{ color: "#fff", fontSize: 30, fontFamily: fontBody }}>{b}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Outro CTA */}
      <div
        style={{
          position: "absolute",
          left: 118,
          bottom: 128,
          opacity: outro,
          transform: `translateY(${interpolate(outro, [0, 1], [16, 0])}px)`,
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <div
          style={{
            background: lesson.accent,
            color: "#fff",
            fontFamily: fontBody,
            fontWeight: 600,
            fontSize: 26,
            padding: "12px 26px",
            borderRadius: 999,
          }}
        >
          Abra a aula para explorar
        </div>
      </div>

      {/* Rodapé + progresso */}
      <div style={{ position: "absolute", left: 90, right: 90, bottom: 56 }}>
        <div style={{ height: 5, width: "100%", background: "rgba(255,255,255,0.14)", borderRadius: 999, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progress * 100}%`, background: lesson.accent, borderRadius: 999 }} />
        </div>
        <div style={{ marginTop: 14, display: "flex", justifyContent: "space-between", color: "rgba(245,245,247,0.6)", fontSize: 20 }}>
          <span style={{ fontFamily: fontBody }}>bluemetrics playbook</span>
          <span style={{ fontFamily: fontBody }}>Trilha do ABM</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

function hexA(hex: string, a: number): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}
