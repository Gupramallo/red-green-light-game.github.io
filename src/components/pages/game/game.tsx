import type React from 'react'
import { useGameDataContext } from '../../../shared/game-data-provider/context'
import { Button } from '@mui/material'

const Game: React.FC = () => {
  const { clearCurrentUser } = useGameDataContext()

  return (
    <>
      <Button variant="contained" color="primary" onClick={clearCurrentUser}>
        Logout
      </Button>
    </>
  )
}

export default Game
