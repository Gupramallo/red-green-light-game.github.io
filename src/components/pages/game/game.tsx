import type React from 'react'
import { Traffic } from '@mui/icons-material'
import { ButtonGroup, Typography } from '@mui/material'
import { StepButton } from '@/components/atoms/buttons'
import CenteredLayout from '@/components/templates/centered-layout'
import { STEP } from './constants'
import { useTrafficLight } from './use-traffic-light'

const Game: React.FC = () => {
  const { isGreenLight, handleStepClicked, currentGameScore } =
    useTrafficLight()

  return (
    <CenteredLayout>
      <Typography>Score: {currentGameScore}</Typography>
      <Traffic fontSize="large" color={isGreenLight ? 'success' : 'error'} />
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
