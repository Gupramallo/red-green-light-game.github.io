import type React from 'react'
import { Container, Label, LeaderboardIcon } from './styles'
import type { LeaderboardTitleProps } from './types'

const LeaderboardTitle: React.FC<LeaderboardTitleProps> = ({
  label = 'Leaderboard',
}) => (
  <Container>
    <LeaderboardIcon />
    <Label variant="h4">{label}</Label>
  </Container>
)

export default LeaderboardTitle
