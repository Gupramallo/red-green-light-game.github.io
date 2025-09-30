import type React from 'react'
import GameContent from '@/components/templates/game-content/game-content'
import useTrafficLight from '@/shared/hooks/use-traffic-light'
import gameAudio from '/game-audio.mp3'

const GamePage: React.FC = () => {
  const {
    isGreenLight,
    handleStepClicked,
    currentGameScore,
    audioRef,
    isPlayingAllowed,
    handleToggleAudio,
    lastStepClicked,
  } = useTrafficLight()

  return (
    <GameContent
      currentGameScore={currentGameScore}
      isGreenLight={isGreenLight}
      handleStepClicked={handleStepClicked}
      audioRef={audioRef}
      audioSrc={gameAudio}
      isPlayingAllowed={isPlayingAllowed}
      toggleAudio={handleToggleAudio}
      lastStepClicked={lastStepClicked}
    />
  )
}

export default GamePage
