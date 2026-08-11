import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { fontBody, fontDisplay } from "./fonts";
import { C, useAppear } from "./kit";
import type { Lesson } from "./lessons";

/** Cena de abertura: número da aula, título e subtítulo. Faz fade-out no fim. */
export const TitleCard: React.FC<{ lesson: Lesson; outAt: number }> = ({ lesson, outAt }) => {
  const frame = useCurrentFrame();
  const eb = useAppear(4);
  const t = useAppear(12);
  const st = useAppear(22);
  const out = interpolate(frame, [outAt - 16, outAt], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ justifyContent: "center", opacity: out }}>
      <div style={{ position: "absolute", left: 90, top: 258, width: 6, height: 214, borderRadius: 6, background: lesson.accent, opacity: t }} />
      <div style={{ paddingLeft: 118, paddingRight: 90 }}>
        <div
          style={{
            opacity: eb,
            transform: `translateY(${(1 - eb) * 18}px)`,
            fontFamily: fontBody,
            fontWeight: 600,
            letterSpacing: 3,
            textTransform: "uppercase",
            fontSize: 20,
            color: lesson.accent,
          }}
        >
          Módulo ABM · Aula {String(lesson.index).padStart(2, "0")} de {lesson.total}
        </div>
        <div
          style={{
            opacity: t,
            transform: `translateY(${(1 - t) * 22}px)`,
            fontFamily: fontDisplay,
            fontWeight: 700,
            color: "#fff",
            fontSize: 88,
            lineHeight: 1.02,
            letterSpacing: -1.5,
            marginTop: 14,
          }}
        >
          {lesson.title}
        </div>
        <div
          style={{
            opacity: st,
            transform: `translateY(${(1 - st) * 18}px)`,
            fontFamily: fontBody,
            color: C.dim,
            fontSize: 34,
            marginTop: 10,
          }}
        >
          {lesson.subtitle}
        </div>
      </div>
    </AbsoluteFill>
  );
};
