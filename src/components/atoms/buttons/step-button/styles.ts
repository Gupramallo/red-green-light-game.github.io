import { Button as MuiButton, styled } from '@mui/material'

export const Button = styled(MuiButton)`
  padding: ${({ theme }) => theme.spacing(5)};
  border-radius: ${({ theme }) => theme.spacing(1.25)};
`
