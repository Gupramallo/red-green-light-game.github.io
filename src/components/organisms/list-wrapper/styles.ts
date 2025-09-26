import { Box, Card, styled } from '@mui/material'

export const EmptyContainer = styled(Box)`
  text-align: center;
  padding: ${({ theme }) => theme.spacing(4, 0)};
`

export const ListContainer = styled(Card)`
  width: 100%;
`
