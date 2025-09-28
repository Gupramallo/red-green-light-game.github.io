import type React from 'react'
import { DirectionsWalk } from '@mui/icons-material'
import { STEP } from '@/shared/constants'
import { Button } from './styles'
import type { StepButtonProps } from './types'

const StepButton: React.FC<StepButtonProps> = ({
  label,
  onClick,
  direction,
}) => {
  const StepIcon = <DirectionsWalk data-testid={`step-icon-${direction}`} />

  return (
    <Button
      size="large"
      variant="contained"
      color="info"
      onClick={onClick}
      startIcon={direction === STEP.left && StepIcon}
      endIcon={direction === STEP.right && StepIcon}
    >
      {label}
    </Button>
  )
}

export default StepButton
