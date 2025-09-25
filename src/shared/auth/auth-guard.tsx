import { Navigate, Outlet } from 'react-router-dom'
import { useGameDataContext } from '../game-data-provider/context'

const AuthGuard: React.FC = () => {
  const { currentUser } = useGameDataContext()

  return currentUser ? <Outlet /> : <Navigate to="/home" replace />
}

export default AuthGuard
