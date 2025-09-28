import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderWithTheme } from '@/test/render-with-theme'
import CenteredLayout from '../centered-layout'

describe('CenteredLayout', () => {
  it('renders', () => {
    renderWithTheme(
      <CenteredLayout>
        <div data-testid="test-child">Test Content</div>
      </CenteredLayout>
    )

    expect(screen.getByTestId('centered-layout')).toBeInTheDocument()
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })
})
