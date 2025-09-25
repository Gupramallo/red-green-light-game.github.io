import type React from 'react'
import GameContent from '@/components/templates/game-content/game-content'
import { useTrafficLight } from './use-traffic-light'

const GamePage: React.FC = () => {
  const { isGreenLight, handleStepClicked, currentGameScore } =
    useTrafficLight()

  return (
    <GameContent
      currentGameScore={currentGameScore}
      isGreenLight={isGreenLight}
      handleStepClicked={handleStepClicked}
    />
  )
}

export default GamePage
