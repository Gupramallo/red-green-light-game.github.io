import { Box, styled } from '@mui/material'

export const Layout = styled(Box)`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: ${({ theme }) => theme.spacing(2.5)};
  background-color: ${({ theme }) => theme.palette.grey[200]};
`
