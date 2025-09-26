import { Box, styled } from '@mui/material'

export const Container = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
  align-items: center;
`

export const ButtonsContainer = styled(Box)`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
`
