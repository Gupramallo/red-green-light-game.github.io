import type React from 'react'
import { StepButton } from '@/components/atoms/buttons'
import Scoreboard from '@/components/molecules/scoreboard'
import TrafficLight from '@/components/molecules/traffic-light'
import { STEP } from '@/components/pages/game-page/constants'
import CenteredLayout from '../centered-layout'
import { ButtonsContainer, Container } from './styles'
import type { GameContentProps } from './types'

const GameContent: React.FC<GameContentProps> = ({
  currentGameScore,
  isGreenLight,
  handleStepClicked,
}) => (
  <CenteredLayout>
    <Container>
      <Scoreboard currentGameScore={currentGameScore} />
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
