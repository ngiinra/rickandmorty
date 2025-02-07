import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { MainCharacterEpisodesProvider } from './context/MainCharacterEpisodes.jsx'
import { MainCharacterProvider } from './context/MainCharacter.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MainCharacterEpisodesProvider>
      <MainCharacterProvider>
          <App />
      </MainCharacterProvider>
    </MainCharacterEpisodesProvider>
  </React.StrictMode>,
)
