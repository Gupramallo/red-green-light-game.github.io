import { EmojiEvents } from '@mui/icons-material'
import { Box, Typography, styled } from '@mui/material'

export const Container = styled(Box)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`
export const LeaderboardIcon = styled(EmojiEvents)`
  color: ${({ theme }) => theme.palette.warning.main};
  font-size: ${({ theme }) => theme.spacing(5)};
`

export const Label = styled(Typography)`
  font-weight: bold;
`
