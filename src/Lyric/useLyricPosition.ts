import { useCallback, useEffect, useRef, useState } from "react";

export interface Lyric {
  time: number;
  text: string;
  fontSize?: number;
  relative?: number;
}

export interface LyricData {
  text: string,
  time: number;
  fontSize: number;
  x: number;
  y: number;
}

function generateBiasedRandom(
  center: number,
  range: number,
  lower_bound: number,
  upper_bound: number,
  bias: number
) {
  const rawRandom = Math.random(); // 生成0到1之间的随机数
  const deviation = Math.pow(rawRandom, bias) * (Math.random() < 0.5 ? -1 : 1); // 计算偏离值
  const biasedRandom =
    deviation > 0
      ? center + range + deviation * (upper_bound - center - range)
      : center + deviation * (center - lower_bound);

  console.log({ rawRandom, bias, deviation, center, biasedRandom });
  return biasedRandom;
}

function parseLrc(text: string, offset: number = 0) {
  return text
    .split("\n")
    .map((string) =>
      string.match(/\[(.*):(.*)\](?:<s:(.*?)>)?(?:<r:(.*?)>)?(.*)/)
    )
    .filter(Boolean)
    .map((match) => (console.log(match), match))
    .map(
      (match): Lyric => ({
        time:
          (parseFloat(match![1]) * 60 + parseFloat(match![2])) * 1000 + offset,
        text: match![5],
        fontSize: match![3] ? parseFloat(match![3]) : undefined,
        relative: match![4] ? parseFloat(match![4]) : undefined,
      })
    )
    .map((match) => (console.log(match), match));
}

const getLyricData = (
  { text, time, fontSize, relative }: Lyric,
  defaultSpeed: number,
  lyricDatas: LyricData[]
): LyricData => {
  const length = text.length;
  fontSize = fontSize ?? 1.5;

  let x: number,
    y: number,
    isOverlap: boolean,
    tryTimes: number = 0;
  const heightArea =
    window.innerHeight * 0.9 > length * (fontSize * 16 * 1.18)
      ? window.innerHeight * 0.9 - length * (fontSize * 16 * 1.18)
      : 0;
  do {
    if (lyricDatas.length > 0 && relative) {
      x = generateBiasedRandom(
        lyricDatas[lyricDatas.length - 1].x,
        lyricDatas[lyricDatas.length - 1].fontSize * 16,
        0,
        window.innerWidth - fontSize * 16,
        relative - ((relative - 1) / 1000) * tryTimes
      );
    } else x = Math.random() * (window.innerWidth - fontSize * 16);
    y =
      window.innerHeight * 0.1 +
      (1 - Math.pow(Math.random(), 5)) * heightArea +
      defaultSpeed * time;
    isOverlap = lyricDatas.some((position) => {
      const isXOverlap =
        position.x - x < (fontSize ?? 1.5) * 20 &&
        x - position.x < position.fontSize * 20;
      const isYOverlap =
        y - position.y - position.text.length * (position.fontSize * 16 * 1.18) <
          6 && position.y - y - length * ((fontSize ?? 1.5) * 16 * 1.18) < 6;
      return isXOverlap && isYOverlap;
    });
    ++tryTimes;
  } while (isOverlap && tryTimes < 1000);
  const lyricData = { text, fontSize, time, x, y };
  console.log(lyricData);
  return lyricData;
};

/**
 *
 * @param speed px per millisecond
 */
export function useLyrics(lyricStr: string, speed: number = 0.01, timeOffset?: number) {
  const [lyricDatas, setLyricDatas] = useState<LyricData[]>([]);

  useEffect(() => {
    setLyricDatas(lyricDatas => {
      if (lyricDatas.length === 0) {
        const lyrics = parseLrc(lyricStr, timeOffset);
        lyrics.forEach(lyric => {
          const data = getLyricData(lyric, speed, lyricDatas);
          lyricDatas.push(data);
        });
      }
      return lyricDatas;
    });
  }, []);

  return { lyricDatas };
}
