import type React from 'react'
import { Typography } from '@mui/material'
import { Container } from './styles'
import type { ScoreboardProps } from './types'

const Scoreboard: React.FC<ScoreboardProps> = ({
  label = 'Score',
  currentGameScore,
}) => (
  <Container>
    <Typography variant="h4">{`${label}: ${currentGameScore}`}</Typography>
  </Container>
)

export default Scoreboard
