import { Box, styled } from '@mui/material'

export const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  background-color: ${({ theme }) => theme.palette.grey[200]};
`
