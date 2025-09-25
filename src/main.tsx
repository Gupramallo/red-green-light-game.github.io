import { StrictMode } from 'react'
import { ThemeProvider } from '@mui/material'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import GameDataProvider from './shared/game-data-provider'
import theme from './styles/theme.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameDataProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </GameDataProvider>
  </StrictMode>
)
