import { useState } from "react";
import LyricsShower from "./LyricsShower";
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
      </Wrapper>
      : selection == 1 ? <LyricsShower lyrics={ lyrics } audioSrc={inochiMp3} speed={ 0.035 } />
      : selection == 2 ? <LyricsShower lyrics={ chineseLyrics } audioSrc={inochiMp3} speed={ 0.035 } />
      : selection == 3 ? <LyricsShower lyrics={ jigokuLyrics } audioSrc={jigokuMp3} speed={ 0.04 } milliPerChar={30} />
      : <LyricsShower lyrics={ smkniLyrics } audioSrc={ smkniMp3 } speed={ 0.01 } gap={300} milliPerChar={100} />
  )
}