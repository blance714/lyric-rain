import styled from "styled-components";
import { LyricCharacter } from "./LyricCharacter";
import { useMemo, useState } from "react";
import { useLyricPosition } from "./useLyricPosition";

const LyricBlock = styled.div`
  position: absolute;
  writing-mode: vertical-rl;

  font-size: 1.5rem;
  line-height: 100%;
  letter-spacing: 0.27rem;
  font-family: serif;
  white-space: nowrap;
`;

const gap = 175;
export function LyricLine({
  nowTime,
  beginTime,
  getPosition,
  fontSize,
  children,
}: {
  nowTime: number;
  beginTime: number;
  getPosition: () => { x: number; y: number };
  fontSize?: number;
  children: string;
}) {
  const time = nowTime - beginTime;
  const position = useMemo(() => getPosition(), []);

  let endTime = beginTime + gap * children.length;
  return (
    <LyricBlock style={{
      left: position.x, top: position.y,
      fontSize: `${fontSize ?? 1.5}rem`,
      letterSpacing: `${(fontSize ?? 1.5) * 0.18}rem`,
      }}>
      {nowTime < beginTime
        ? ""
        : nowTime < endTime
        ? children.split("").map((character, index) => (
            <LyricCharacter
              nowTime={time}
              beginTime={index * gap}
              endTime={(index + 1) * gap}
              speed={40}
              key={index}
            >
              {character}
            </LyricCharacter>
          ))
        : children}
    </LyricBlock>
  );
}
