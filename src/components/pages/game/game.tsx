import type React from 'react'
import { Traffic } from '@mui/icons-material'
import { ButtonGroup, Typography } from '@mui/material'
import { StepButton } from '@/components/atoms/buttons'
import { STEP } from './constants'
import { Container } from './styles'
import { useTrafficLight } from './use-traffic-light'

const Game: React.FC = () => {
  const { isGreenLight, handleStepClicked, currentGameScore } =
    useTrafficLight()

  return (
    <Container>
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
    </Container>
  )
}

export default Game
