import { Routes, Route, Navigate } from 'react-router-dom'
import { Game, Home, Rankings } from './components/pages'
import { AuthGuard, PublicGuard } from './shared/auth'
import './App.css'

function App() {
  return (
    <div className="app">
      <main>
        <Routes>
          <Route element={<PublicGuard />}>
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Route>
          <Route element={<AuthGuard />}>
            <Route path="/game" element={<Game />} />
            <Route path="/rankings" element={<Rankings />} />
          </Route>
        </Routes>
      </main>
    </div>
  )
}

export default App
