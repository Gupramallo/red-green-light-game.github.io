import type React from 'react'
import { Button } from '@mui/material'
import { useGameDataContext } from '../../../shared/game-data-provider/context'

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
