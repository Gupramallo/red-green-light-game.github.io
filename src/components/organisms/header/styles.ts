import { AppBar, Box, Toolbar as MuiToolbar, styled } from '@mui/material'

export const Container = styled(AppBar)`
  background-color: inherit;
  position: sticky;
`
export const Toolbar = styled(MuiToolbar)`
  justify-content: space-between;
`

export const IconsContainer = styled(Box)`
  display: flex;
  align-items: center;
`
