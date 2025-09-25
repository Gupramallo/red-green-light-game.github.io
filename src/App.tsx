import { Navigate, Route, Routes } from 'react-router-dom'
import { GamePage, Home, Rankings } from './components/pages'
import Layout from './components/templates/layout'
import { AuthGuard, PublicGuard } from './shared/auth'
import { ROUTES } from './shared/routes'

function App() {
  return (
    <Layout>
      <Routes>
        <Route element={<PublicGuard />}>
          <Route path={ROUTES.home} element={<Home />} />
          <Route
            path={ROUTES.notFound}
            element={<Navigate to={ROUTES.home} replace />}
          />
        </Route>
        <Route element={<AuthGuard />}>
          <Route path={ROUTES.game} element={<GamePage />} />
        </Route>
        <Route path={ROUTES.rankings} element={<Rankings />} />
      </Routes>
    </Layout>
  )
}

export default App
