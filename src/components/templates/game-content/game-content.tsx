import type React from 'react'
import { ButtonGroup } from '@mui/material'
import { StepButton } from '@/components/atoms/buttons'
import Scoreboard from '@/components/molecules/scoreboard'
import TrafficLight from '@/components/molecules/traffic-light'
import { STEP } from '@/components/pages/game-page/constants'
import CenteredLayout from '../centered-layout'
import { Container } from './styles'
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
      <ButtonGroup fullWidth variant="contained">
        <StepButton
          label="Left"
          onClick={() => handleStepClicked({ step: STEP.left })}
        />
        <StepButton
          label="Right"
          onClick={() => handleStepClicked({ step: STEP.right })}
        />
      </ButtonGroup>
    </Container>
  </CenteredLayout>
)

export default GameContent
