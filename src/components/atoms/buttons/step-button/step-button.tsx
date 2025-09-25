import type React from 'react'
import { Button } from '@mui/material'
import type { StepButtonProps } from './types'

const StepButton: React.FC<StepButtonProps> = ({ label, onClick }) => (
  <Button
    size="large"
    fullWidth
    variant="contained"
    color="info"
    onClick={onClick}
  >
    {label}
  </Button>
)

export default StepButton
