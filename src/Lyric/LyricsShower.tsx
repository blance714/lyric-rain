import { useEffect, useRef, useState } from "react";
import { LyricLine } from "./LyricLine";
import { useLyrics } from "./useLyricPosition";
import styled from "styled-components";

const LyricsWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`

const LyricsContainer = styled.div`
  position: relative;
  width: 100%;
`

const AudioContainer = styled.div`
  position: absolute;
  width: fit-content;
  inset: auto 0 10%;
  margin: 0 auto;
  opacity: 0.2;

  transition: opacity 0.3s;

  :hover {
    opacity: 1;
  }
`

function LyricsShower({ lyricStr, audioSrc, speed, gap, milliPerChar, timeOffset }: {
  lyricStr: string,
  audioSrc: string,
  speed: number,
  gap?: number,
  milliPerChar?: number,
  timeOffset?: number
}) {
  const { lyricDatas } = useLyrics(lyricStr, speed, timeOffset);
  const beginTimeRef = useRef(0);
  const [nowTime, setNowTime] = useState(0);
  const isPlayingRef = useRef(false);

  const update: FrameRequestCallback = () => {
    if (isPlayingRef.current) {
      setNowTime(new Date().getTime());
      requestAnimationFrame(update);
    }
  };

  const audioRef = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    audioRef.current?.addEventListener('play', function(ev) {
      beginTimeRef.current = new Date().getTime() - this.currentTime * 1000;
      setNowTime(new Date().getTime());
      isPlayingRef.current = true;
      requestAnimationFrame(update);
    });
    audioRef.current?.addEventListener('pause', function(ev) {
      isPlayingRef.current = false;
    });
    audioRef.current?.addEventListener('seeking', function(ev) {
      beginTimeRef.current = new Date().getTime() - this.currentTime * 1000;
      setNowTime(new Date().getTime());
    });
  }, [audioRef.current])

  let time = nowTime - beginTimeRef.current;
  return (
    <LyricsWrapper>
      <LyricsContainer style={{ top: -time * speed }}>
        {lyricDatas.map(lyric => (
          <LyricLine
            audioTime={time} lyricData={lyric}
            gap={gap} milliPerChar={milliPerChar}
          />
        ))}
      </LyricsContainer>
      <AudioContainer>
        <audio ref={audioRef} src={audioSrc} controls />
      </AudioContainer>
    </LyricsWrapper>
  );
}

export default LyricsShower;
