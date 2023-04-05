import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import LyricsShower from './LyricsShower'
import { chineseLyrics } from './lyricData'
import { App } from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
