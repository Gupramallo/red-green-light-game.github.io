import {
  Box,
  Avatar as MuiAvatar,
  Typography,
  css,
  styled,
} from '@mui/material'

export const Container = styled(Box)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
`

export const Avatar = styled(MuiAvatar)`
  ${({ theme }) => css`
    width: ${theme.spacing(4)};
    height: ${theme.spacing(4)};
    border: ${theme.spacing(0.125)} solid;
  `}
`

export const NameLabel = styled(Typography)`
  font-weight: medium;
`

export const HighScoreLabel = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.secondary};
`
