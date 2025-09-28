import { fireEvent, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { renderWithTheme } from '@/test/render-with-theme'
import HomeContent from '../home-content'
import type { HomeContentProps } from '../types'

const mockSetUserName = vi.fn()
const mockOnClick = vi.fn()

const defaultProps: HomeContentProps = {
  titleLabel: 'Welcome to Red Light Green Light',
  subtitleLabel: 'Enter your name to start playing',
  textFieldLabel: 'Player Name',
  buttonLabel: 'Start Game',
  userName: '',
  setUserName: mockSetUserName,
  onClick: mockOnClick,
}

describe('HomeContent', () => {
  it('should render all content elements', () => {
    renderWithTheme(<HomeContent {...defaultProps} />)

    expect(
      screen.getByRole('heading', { level: 5, name: defaultProps.titleLabel })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 6,
        name: defaultProps.subtitleLabel,
      })
    ).toBeInTheDocument()
    expect(
      screen.getByLabelText(defaultProps.textFieldLabel ?? '')
    ).toBeInTheDocument()

    const button = screen.getByRole('button', { name: 'Start Game' })

    expect(button).toBeInTheDocument()
    expect(button).toBeDisabled()

    expect(
      screen.getByRole('img', { name: 'Traffic Light' })
    ).toBeInTheDocument()
  })

  it('should call setUserName when text input changes', () => {
    renderWithTheme(
      <HomeContent {...defaultProps} setUserName={mockSetUserName} />
    )

    const textField = screen.getByLabelText(defaultProps.textFieldLabel ?? '')

    fireEvent.change(textField, { target: { value: 'New Name' } })

    expect(mockSetUserName).toHaveBeenCalledWith('New Name')
  })

  it('should call onClick when button is clicked', () => {
    renderWithTheme(
      <HomeContent
        {...defaultProps}
        userName="Test User"
        onClick={mockOnClick}
      />
    )

    const button = screen.getByRole('button', { name: 'Start Game' })

    expect(button).toBeEnabled()

    fireEvent.click(button)

    expect(mockOnClick).toHaveBeenCalledOnce()
  })
})
