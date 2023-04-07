import { useState } from "react";
import LyricsShower from "./Lyric/LyricsShower";
import { chineseLyrics, jigokuLyrics, lyrics, smkniLyrics } from "./lyricData";
import styled from "styled-components";

import inochiMp3 from "./assets/inochi.mp3"
import jigokuMp3 from "./assets/jigoku.mp3"
import smkniMp3 from "./assets/smkni.mp3"

const Wrapper = styled.div`
  position: absolute;
  width: fit-content;
  height: fit-content;
  inset: 0;
  margin: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.div`
  width: fit-content;
  margin: 0 auto;
`

const Button = styled.button`
  border: none;
  margin: 10px;
  transition: color 0.3s;
  cursor: pointer;
  font-size: medium;

  :hover {
    color: pink;
  }
`

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ccc;
`

export function App() {
  const [selection, setSelection] = useState(0);
  const [selectedAudio, setSelectedAudio] = useState<File | null>(null);
  const [selectedLyric, setSelectedLyric] = useState<string | null>(null);
  const [speed, setSpeed] = useState(0.035);
  const [milliPerChar, setMilliPerChar] = useState(30);
  const [gap, setGap] = useState(175);
  const [timeOffset, setTimeOffset] = useState(0);

  return (
    selection == 0 ?
      <Wrapper>
        <div>！音量警告！</div>
        <div>宽屏幕体验更佳哦</div>
        <h3>请选择歌曲:</h3>
        <div>「命に嫌われている」</div>
        <div>
          <Button onClick={() => setSelection(1)}>日文歌词</Button>
          |
          <Button onClick={() => setSelection(2)}>中文歌词</Button>
        </div>
        <Divider />
        <div>
          <Button onClick={() => setSelection(3)}>「地獄に落ちる」（什么都没有弄（肝不动了……</Button>
        </div>
        <div>
          <Button onClick={() => setSelection(4)}>「死ぬにはいい日だった」</Button>
        </div>
        <Divider />
        <div>
          或者，选择自己的歌曲：
          <div>mp3: <input type="file" onChange={e => setSelectedAudio(e.target.files?.item(0) ?? null)} /></div>
          <div>lrc: <input type="file" onChange={e => e.target.files?.item(0)?.text().then(str => setSelectedLyric(str))} /></div>
          <div>speed: <input type="number" step="0.005" value={speed} onChange={e => setSpeed(parseFloat(e.target.value))} /></div>
          <div>milliPerChar: <input type="number" value={milliPerChar} onChange={e => setMilliPerChar(parseInt(e.target.value))} /></div>
          <div>gap: <input type="number" value={gap} onChange={e => setGap(parseInt(e.target.value))} /></div>
          <div>timeOffset: <input type="number" value={timeOffset} onChange={e => setTimeOffset(parseInt(e.target.value))} /></div>
          关于lrc文件的格式，可以参考lyricData.ts中的格式。<br />其中，s代表字体大小，r代表与上句歌词空间上的相关度。
        </div>
        <Button onClick={() => { if (selectedAudio && selectedLyric) setSelection(5) }}>开始</Button>
      </Wrapper>
      : selection == 1 ? <LyricsShower lyricStr={ lyrics } audioSrc={inochiMp3} speed={ 0.035 } />
      : selection == 2 ? <LyricsShower lyricStr={ chineseLyrics } audioSrc={inochiMp3} speed={ 0.035 } />
      : selection == 3 ? <LyricsShower lyricStr={ jigokuLyrics } audioSrc={jigokuMp3} speed={ 0.04 } milliPerChar={30} timeOffset={1200} />
      : selection == 4 ? <LyricsShower lyricStr={ smkniLyrics } audioSrc={ smkniMp3 } speed={ 0.01 } gap={300} milliPerChar={100} />
      : <LyricsShower lyricStr={ selectedLyric! } audioSrc={ URL.createObjectURL(selectedAudio!) } speed={ speed } milliPerChar={milliPerChar} gap={gap} timeOffset={timeOffset} />
  )
}