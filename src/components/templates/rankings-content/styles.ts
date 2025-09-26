import { Person } from '@mui/icons-material'
import { Box, ListItem, type Theme, Typography, styled } from '@mui/material'

const getBackgroundColor = ({
  index,
  theme,
}: {
  theme: Theme
  index: number
}) => {
  const { palette } = theme

  switch (index) {
    case 0:
      return palette.common.gold
    case 1:
      return palette.common.silver
    case 2:
      return palette.common.bronze

    default:
      return palette.common.white
  }
}

export const PersonIcon = styled(Person)`
  font-size: ${({ theme }) => theme.spacing(4)};
  color: ${({ theme }) => theme.palette.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`

export const ScoreContainer = styled(Box)`
  text-align: right;
`

export const PositionLabel = styled(Typography)`
  font-weight: bold;
  color: ${({ theme }) => theme.palette.primary.main};
`

export const RankingsList = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== 'index',
})<{ index: number }>`
  background-color: ${({ theme, index }) =>
    getBackgroundColor({ theme, index })};
  justify-content: space-between;
`
