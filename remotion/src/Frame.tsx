import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { fontBody, fontDisplay } from "./fonts";
import { BLACK, C, hexA } from "./kit";
import type { Lesson } from "./lessons";

/** Moldura persistente da marca: fundo, logo e rodapé com progresso. */
export const Frame: React.FC<{ lesson: Lesson; children: React.ReactNode }> = ({ lesson, children }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const progress = interpolate(frame, [0, durationInFrames], [0, 1]);
  const coverOpacity = interpolate(frame, [0, 24], [0, 0.4], { extrapolateRight: "clamp" });
  const scale = interpolate(frame, [0, durationInFrames], [1.06, 1.14]);

  return (
    <AbsoluteFill style={{ backgroundColor: BLACK, fontFamily: fontBody }}>
      <AbsoluteFill style={{ opacity: coverOpacity }}>
        <Img src={staticFile(`brand/${lesson.cover}`)} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${scale})` }} />
      </AbsoluteFill>
      <AbsoluteFill style={{ background: `linear-gradient(160deg, ${BLACK} 30%, rgba(6,6,10,0.7) 70%, rgba(6,6,10,0.45) 100%)` }} />
      <AbsoluteFill style={{ background: `radial-gradient(1200px 720px at 82% 92%, ${hexA(lesson.accent, 0.16)}, transparent 62%)` }} />

      {children}

      {/* Header */}
      <div style={{ position: "absolute", top: 60, left: 90, display: "flex", alignItems: "center", gap: 15 }}>
        <Img src={staticFile("brand/logo-white-horizontal.png")} style={{ height: 28 }} />
        <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.3)" }} />
        <span style={{ fontFamily: fontDisplay, fontWeight: 600, color: "#fff", fontSize: 20 }}>Playbook</span>
      </div>

      {/* Footer */}
      <div style={{ position: "absolute", left: 90, right: 90, bottom: 54 }}>
        <div style={{ height: 4, width: "100%", background: "rgba(255,255,255,0.14)", borderRadius: 999, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progress * 100}%`, background: lesson.accent, borderRadius: 999 }} />
        </div>
        <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", color: C.faint, fontSize: 18 }}>
          <span>bluemetrics playbook</span>
          <span>Trilha do ABM</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
