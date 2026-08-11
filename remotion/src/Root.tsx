import React from "react";
import { Composition } from "remotion";
import { LessonVideo } from "./LessonVideo";
import { lessons } from "./lessons";
import "./fonts";

const FPS = 30;
const DURATION = 18 * FPS; // 18s: título + esquema visual animado
const WIDTH = 1280;
const HEIGHT = 720;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {lessons.map((lesson) => (
        <Composition
          key={lesson.slug}
          id={`lesson-${lesson.slug}`}
          component={LessonVideo}
          durationInFrames={DURATION}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
          defaultProps={{ lesson }}
        />
      ))}
    </>
  );
};
