import { useState } from "react";
import LyricsShower from "./LyricsShower";
import { chineseLyrics, lyrics } from "./lyricData";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  width: fit-content;
  height: fit-content;
  inset: 0;
  margin: auto;
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

  :hover {
    color: pink;
  }
`

export function App() {
  const [selection, setSelection] = useState(0);

  return (
    selection == 0 ?
      <Wrapper>
        <Title>请选择语言哦：</Title>
        <div>
          <Button onClick={() => setSelection(1)}>日文歌词</Button>
          |
          <Button onClick={() => setSelection(2)}>中文歌词</Button>
        </div>
      </Wrapper>
      : selection == 1 ? <LyricsShower lyrics={ lyrics } speed={ 0.035 } />
      : <LyricsShower lyrics={ chineseLyrics } speed={ 0.035 } />
  )
}