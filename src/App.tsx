import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

import { Game, Home, Rankings } from './components/pages'

function App() {
  return (
    <div className="app">
      <main>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/rankings" element={<Rankings />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
