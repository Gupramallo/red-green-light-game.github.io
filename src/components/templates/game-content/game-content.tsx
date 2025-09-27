import type React from 'react'
import { StepButton } from '@/components/atoms/buttons'
import AudioButton from '@/components/atoms/buttons/audio-button'
import Scoreboard from '@/components/molecules/scoreboard'
import TrafficLight from '@/components/molecules/traffic-light'
import { STEP } from '@/components/pages/game-page/constants'
import CenteredLayout from '../centered-layout'
import { ButtonsContainer, Container, ScoreAndAudioContainer } from './styles'
import type { GameContentProps } from './types'

const GameContent: React.FC<GameContentProps> = ({
  currentGameScore,
  isGreenLight,
  handleStepClicked,
  isPlayingAllowed,
  audioRef,
  audioSrc,
  toggleAudio,
}) => (
  <CenteredLayout>
    <Container>
      <ScoreAndAudioContainer>
        <Scoreboard currentGameScore={currentGameScore} />
        <AudioButton
          isPlayingAllowed={isPlayingAllowed}
          audioRef={audioRef}
          audioSrc={audioSrc}
          toggleAudio={toggleAudio}
        />
      </ScoreAndAudioContainer>
      <TrafficLight isGreenLight={isGreenLight} />
      <ButtonsContainer>
        <StepButton
          direction={STEP.left}
          label="Left"
          onClick={() => handleStepClicked({ step: STEP.left })}
        />
        <StepButton
          direction={STEP.right}
          label="Right"
          onClick={() => handleStepClicked({ step: STEP.right })}
        />
      </ButtonsContainer>
    </Container>
  </CenteredLayout>
)

export default GameContent
