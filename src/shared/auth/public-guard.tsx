import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useGameDataContext } from '../game-data-provider/context'

const PublicGuard: React.FC = () => {
  const { currentUser } = useGameDataContext()

  return currentUser ? <Navigate to="/game" replace /> : <Outlet />
}

export default PublicGuard
