import React from "react";
import { Sequence } from "remotion";
import { Frame } from "./Frame";
import { TitleCard } from "./TitleCard";
import { diagrams } from "./diagrams";
import type { Lesson } from "./lessons";

const TITLE_OUT = 90;
const DIAGRAM_FROM = 84;

export const LessonVideo: React.FC<{ lesson: Lesson }> = ({ lesson }) => {
  const Diagram = diagrams[lesson.slug];
  return (
    <Frame lesson={lesson}>
      <Sequence durationInFrames={TITLE_OUT + 2} name="titulo">
        <TitleCard lesson={lesson} outAt={TITLE_OUT} />
      </Sequence>
      <Sequence from={DIAGRAM_FROM} name="diagrama">
        {Diagram ? <Diagram lesson={lesson} /> : null}
      </Sequence>
    </Frame>
  );
};
