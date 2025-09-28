import React from 'react'
import { ThemeProvider } from '@mui/material'
import { render } from '@testing-library/react'
import theme from '@/styles/theme'

export const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
