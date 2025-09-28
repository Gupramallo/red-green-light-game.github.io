import { fireEvent, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { STEP } from '@/shared/constants'
import { renderWithTheme } from '@/test/render-with-theme'
import { gameContentProps } from '../__mocks__/game-content-mocks'
import GameContent from '../game-content'

const mockToggleAudio = vi.fn()
const mockHandleStepClicked = vi.fn()

describe('GameContent', () => {
  it('should render all game components', () => {
    renderWithTheme(<GameContent {...gameContentProps} />)

    expect(screen.getByTestId('centered-layout')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 4, name: 'Score: 15' })
    ).toBeInTheDocument()
    expect(screen.getByTestId('audio-test-id')).toBeInTheDocument()
    expect(screen.getByTestId('traffic-red-light')).toBeInTheDocument()
    expect(screen.getByTestId('traffic-green-light')).toBeInTheDocument()
    expect(screen.getByTestId('VolumeOffIcon')).toBeInTheDocument()
    expect(screen.getByTestId('step-icon-left')).toBeInTheDocument()
    expect(screen.getByTestId('step-icon-right')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Left' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Right' })).toBeInTheDocument()

    const redLight = screen.getByTestId('traffic-red-light')
    const greenLight = screen.getByTestId('traffic-green-light')

    expect(redLight).toHaveStyle('opacity: 1')
    expect(greenLight).toHaveStyle('opacity: 0.1')
  })

  it('should render with  green light turned on', () => {
    renderWithTheme(<GameContent {...gameContentProps} isGreenLight />)

    const redLight = screen.getByTestId('traffic-red-light')
    const greenLight = screen.getByTestId('traffic-green-light')

    expect(redLight).toHaveStyle('opacity: 0.1')
    expect(greenLight).toHaveStyle('opacity: 1')
  })

  it('should render with audio enabled', () => {
    renderWithTheme(<GameContent {...gameContentProps} isPlayingAllowed />)

    expect(screen.getByTestId('VolumeUpIcon')).toBeInTheDocument()
  })

  it('should call handleStepClicked when pressing the step buttons', () => {
    renderWithTheme(
      <GameContent
        {...gameContentProps}
        handleStepClicked={mockHandleStepClicked}
      />
    )

    const leftButton = screen.getByRole('button', { name: 'Left' })

    fireEvent.click(leftButton)

    expect(mockHandleStepClicked).toHaveBeenCalledWith({ step: STEP.left })

    const rightButton = screen.getByRole('button', { name: 'Right' })

    fireEvent.click(rightButton)

    expect(mockHandleStepClicked).toHaveBeenCalledWith({ step: STEP.right })
  })

  it('should call toggleAudio when audio button clicked', () => {
    renderWithTheme(
      <GameContent {...gameContentProps} toggleAudio={mockToggleAudio} />
    )

    const audioButton = screen.getByTestId('VolumeOffIcon')

    fireEvent.click(audioButton)

    expect(mockToggleAudio).toHaveBeenCalledOnce()
  })
})
