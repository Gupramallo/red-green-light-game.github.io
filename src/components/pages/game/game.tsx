import type React from 'react'
import { ButtonGroup, Card, Typography } from '@mui/material'
import { StepButton } from '@/components/atoms/buttons'
import TrafficLight from '@/components/molecules/traffic-light'
import CenteredLayout from '@/components/templates/centered-layout'
import { STEP } from './constants'
import { useTrafficLight } from './use-traffic-light'

const Game: React.FC = () => {
  const { isGreenLight, handleStepClicked, currentGameScore } =
    useTrafficLight()

  return (
    <CenteredLayout>
      <Card
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          mb: 3,
          p: 2,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h4"
          component="div"
          sx={{
            fontWeight: 'bold',
            letterSpacing: '0.1em',
          }}
        >
          Score: {currentGameScore}
        </Typography>
      </Card>
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
