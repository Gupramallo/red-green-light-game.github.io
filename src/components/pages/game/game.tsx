import type React from 'react'
import { Traffic } from '@mui/icons-material'
import { ButtonGroup, Typography } from '@mui/material'
import { StepButton } from '@/components/atoms/buttons'
import { STEP } from './constants'
import { useTrafficLight } from './use-traffic-light'

const Game: React.FC = () => {
  const {
    isGreenLight,
    currentUser,
    handleStepClicked,
    currentGameScore,
    highScore,
  } = useTrafficLight()

  return (
    <>
      <Typography>
        {currentUser?.name} Score: {currentGameScore} HighScore: {highScore}
      </Typography>

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
    </>
  )
}

export default Game
