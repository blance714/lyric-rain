import styled from "styled-components";
import { LyricCharacter } from "./LyricCharacter";
import { useMemo, useState } from "react";
import { LyricData, useLyrics } from "./useLyricPosition";

const LyricBlock = styled.div`
  position: absolute;
  writing-mode: vertical-rl;

  font-size: 1.5rem;
  line-height: 100%;
  letter-spacing: 0.27rem;
  font-family: serif;
  white-space: nowrap;
`;

export function LyricLine({
  audioTime,
  lyricData,
  gap,
  milliPerChar,
}: {
  audioTime: number;
  lyricData: LyricData;
  gap?: number;
  milliPerChar?: number;
}) {
  const { time, text, fontSize, x, y } = lyricData;
  const localTime = audioTime - time;
  gap = gap ?? 175;

  let endTime = time + gap * text.length;
  return (
    <LyricBlock style={{
      left: x, top: y,
      fontSize: `${fontSize ?? 1.5}rem`,
      letterSpacing: `${(fontSize ?? 1.5) * 0.18}rem`,
      }}>
      {audioTime < time ? ""
        : audioTime < endTime
        ? text.split("").map((character, index) => (
            <LyricCharacter
              nowTime={localTime}
              beginTime={index * (gap ?? 175)}
              endTime={(index + 1) * (gap ?? 175)}
              speed={milliPerChar ?? 40}
              key={index}
            >
              {character}
            </LyricCharacter>
          ))
        : text}
    </LyricBlock>
  );
}
