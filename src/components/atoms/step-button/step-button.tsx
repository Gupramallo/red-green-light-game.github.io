import type React from 'react'
import { DirectionsWalk } from '@mui/icons-material'
import { STEP } from '@/shared/constants'
import { Button } from './styles'
import type { StepButtonProps } from './types'

const StepButton: React.FC<StepButtonProps> = ({
  label,
  onClick,
  direction,
}) => (
  <Button
    size="large"
    variant="contained"
    color="info"
    onClick={onClick}
    startIcon={direction === STEP.left && <DirectionsWalk />}
    endIcon={direction === STEP.right && <DirectionsWalk />}
  >
    {label}
  </Button>
)

export default StepButton
