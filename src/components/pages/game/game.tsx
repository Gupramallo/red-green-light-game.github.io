import type React from 'react'
import { ButtonGroup } from '@mui/material'
import { StepButton } from '@/components/atoms/buttons'
import Scoreboard from '@/components/molecules/scoreboard/scoreboard'
import TrafficLight from '@/components/molecules/traffic-light'
import CenteredLayout from '@/components/templates/centered-layout'
import { STEP } from './constants'
import { useTrafficLight } from './use-traffic-light'

const Game: React.FC = () => {
  const { isGreenLight, handleStepClicked, currentGameScore } =
    useTrafficLight()

  return (
    <CenteredLayout>
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
    </CenteredLayout>
  )
}

export default Game
