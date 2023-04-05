import { useCallback, useEffect, useRef, useState } from "react";
import { Lyric } from "./lyricData";

interface LyricPosition {
  id: number;
  length: number;
  fontSize: number;
  x: number;
  y: number;
}

function generateBiasedRandom(center: number, range: number, lower_bound: number, upper_bound: number, bias: number) {
  const rawRandom = Math.random(); // 生成0到1之间的随机数
  const deviation = Math.pow(rawRandom, bias) * (Math.random() < 0.5 ? -1 : 1); // 计算偏离值
  const biasedRandom = deviation > 0
    ? center + range + deviation * (upper_bound - center - range)
    : center + deviation * (center - lower_bound);

  console.log({ rawRandom, bias, deviation, center, biasedRandom });
  return biasedRandom;
}

/**
 * 
 * @param speed px per millisecond
 */
export function useLyricPosition(speed: number = 0.01) {
  const lyricPositionsRef = useRef<LyricPosition[]>([]);

  const getPosition = useCallback(({ text, time, fontSize, relative }: Lyric, id: number): {x: number, y: number} => {
    const length = text.length
    fontSize = fontSize ?? 1.5;
    const lyricPositions = lyricPositionsRef.current;
    const exists = lyricPositions.find(position => position.id === id);
    if (exists) return { x: exists.x, y: exists.y };

    let x: number, y: number, isOverlap: boolean, tryTimes: number = 0;
    const heightArea = window.innerHeight * 0.9 > length * (fontSize * 16 * 1.18) 
      ? (window.innerHeight * 0.9 - length * (fontSize * 16 * 1.18)) : 0;
    do {
      if (lyricPositions.length > 0 && relative) {
        x = generateBiasedRandom(
          lyricPositions[lyricPositions.length - 1].x, 
          lyricPositions[lyricPositions.length - 1].fontSize * 16,
          0 ,
          window.innerWidth - fontSize * 16, 
          relative - (relative - 1) / 1000 * tryTimes
        );
      } else x = Math.random() * (window.innerWidth - fontSize * 16);
      y = window.innerHeight * 0.1 + Math.random() * heightArea + speed * time;
      isOverlap = lyricPositions.some((position) => {
        const isXOverlap = position.x - x < (fontSize ?? 1.5) * 20 && x - position.x < position.fontSize * 20;
        const isYOverlap = (y - position.y - position.length * (position.fontSize * 16 * 1.18)) < 6 && (position.y - y - length * ((fontSize ?? 1.5) * 16 * 1.18)) < 6;
        return isXOverlap && isYOverlap;
      })
      ++tryTimes;
    } while(isOverlap && tryTimes < 1000);
    lyricPositions.push({ id, length, fontSize, x, y });
    console.log({ tryTimes, 
      relativeRate: relative ? (relative - 1.0 * (relative - 1) / 1000 * tryTimes) : undefined,
    x, y });
    return { x, y };
  }, []);

  return { getPosition };
}