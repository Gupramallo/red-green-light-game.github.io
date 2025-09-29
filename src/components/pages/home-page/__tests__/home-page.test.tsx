import { fireEvent, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderWithTheme } from '@/test/render-with-theme'
import HomePage from '../home-page'

const mockSetCurrentUser = vi.fn()
const mockUseGameDataContext = vi.fn()

vi.mock('@/shared/game-data-provider/context', () => ({
  useGameDataContext: () => mockUseGameDataContext(),
}))

describe('HomePage', () => {
  beforeEach(() => {
    mockUseGameDataContext.mockReturnValue({
      setCurrentUser: mockSetCurrentUser,
    })
    mockSetCurrentUser.mockClear()
  })

  it('should render with correct labels and content', () => {
    renderWithTheme(<HomePage />)

    expect(
      screen.getByRole('heading', { name: 'Red Green Light Game', level: 5 })
    ).toBeInTheDocument()
    expect(
      screen.getByText('Enter your name to start playing!')
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Start Playing' })
    ).toBeInTheDocument()
    expect(screen.getByLabelText('Your Name')).toBeInTheDocument()
    expect(
      screen.getByRole('img', { name: 'Traffic Light' })
    ).toBeInTheDocument()
  })

  it('should do the register process', () => {
    const expectedValue = 'John Doe'

    renderWithTheme(<HomePage />)

    const textField = screen.getByLabelText('Your Name')
    const button = screen.getByRole('button', { name: 'Start Playing' })

    expect(button).toBeDisabled()
    expect(textField).toHaveValue('')

    fireEvent.change(textField, { target: { value: expectedValue } })

    expect(textField).toHaveValue(expectedValue)
    expect(button).toBeEnabled()

    fireEvent.click(button)

    expect(mockSetCurrentUser).toHaveBeenCalledWith(expectedValue)
    expect(mockSetCurrentUser).toHaveBeenCalledTimes(1)
  })

  it('should trim whitespace from userName when button is clicked', () => {
    renderWithTheme(<HomePage />)

    const textField = screen.getByLabelText('Your Name')
    const button = screen.getByRole('button', { name: 'Start Playing' })

    fireEvent.change(textField, { target: { value: '  John Doe  ' } })
    fireEvent.click(button)

    expect(mockSetCurrentUser).toHaveBeenCalledWith('John Doe')
  })
})
