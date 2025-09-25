import type React from 'react'
import { Traffic } from '@mui/icons-material'
import { ButtonGroup } from '@mui/material'
import { useTrafficLight } from './use-traffic-light'
import { StepButton } from '@/components/atoms/buttons'

const Game: React.FC = () => {
  const { isGreenLight } = useTrafficLight()

  return (
    <>
      <Traffic fontSize="large" color={isGreenLight ? 'success' : 'error'} />
      <ButtonGroup fullWidth variant="contained">
        <StepButton label="Left" onClick={() => {}} />
        <StepButton label="Right" onClick={() => {}} />
      </ButtonGroup>
    </>
  )
}

export default Game
