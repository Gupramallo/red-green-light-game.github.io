import type React from 'react'
import { useGameDataContext } from '../../../shared/game-data-provider/context'
import { StepButton } from '../../atoms/buttons'

const Game: React.FC = () => {
  const { clearCurrentUser } = useGameDataContext()

  return (
    <>
      <StepButton label="Left" onClick={clearCurrentUser} />
      <StepButton label="Right" onClick={clearCurrentUser} />
    </>
  )
}

export default Game
