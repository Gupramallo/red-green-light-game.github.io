import type React from 'react'
import GameContent from '@/components/templates/game-content/game-content'
import { useTrafficLight } from './use-traffic-light'
import gameAudio from '/game-audio.mp3'

const GamePage: React.FC = () => {
  const {
    isGreenLight,
    handleStepClicked,
    currentGameScore,
    audioRef,
    isPlayingAllowed,
    toggleAudio,
  } = useTrafficLight()

  return (
    <GameContent
      currentGameScore={currentGameScore}
      isGreenLight={isGreenLight}
      handleStepClicked={handleStepClicked}
      audioRef={audioRef}
      audioSrc={gameAudio}
      isPlayingAllowed={isPlayingAllowed}
      toggleAudio={toggleAudio}
    />
  )
}

export default GamePage
