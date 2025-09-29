import { fireEvent, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderWithTheme } from '@/test/render-with-theme'
import { useTrafficLightDefaultProps } from '../__mocks__/game-page-mocks'
import GamePage from '../game-page'

const mockUseTrafficLight = vi.fn()

vi.mock('@/shared/hooks/use-traffic-light', () => ({
  default: () => mockUseTrafficLight(),
}))

const expectedValues = ({
  isAudioAllowed,
}: {
  isAudioAllowed?: boolean
} = {}) => {
  expect(screen.getByText('Score: 85')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Left' })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Right' })).toBeInTheDocument()
  expect(screen.getByTestId('traffic-red-light')).toBeInTheDocument()
  expect(screen.getByTestId('traffic-green-light')).toBeInTheDocument()
  expect(
    screen.getByTestId(isAudioAllowed ? 'VolumeUpIcon' : 'VolumeOffIcon')
  ).toBeInTheDocument()
}

describe('GamePage', () => {
  beforeEach(() => vi.clearAllMocks())

  it('should render GameContent with score when green light is on', () => {
    mockUseTrafficLight.mockReturnValue(useTrafficLightDefaultProps)

    renderWithTheme(<GamePage />)

    expectedValues({ isAudioAllowed: true })
    expect(screen.getByTestId('traffic-green-light')).toHaveStyle({
      opacity: '1',
    })
    expect(screen.getByTestId('traffic-red-light')).toHaveStyle({
      opacity: '0.1',
    })
  })

  it('should render GameContent with red light when isGreenLight is false', () => {
    mockUseTrafficLight.mockReturnValue({
      ...useTrafficLightDefaultProps,
      isGreenLight: false,
    })

    renderWithTheme(<GamePage />)

    expectedValues({ isAudioAllowed: true })
    expect(screen.getByTestId('traffic-red-light')).toHaveStyle({
      opacity: '1',
    })
    expect(screen.getByTestId('traffic-green-light')).toHaveStyle({
      opacity: '0.1',
    })
  })

  it('should display correct audio icon when playing is allowed', () => {
    mockUseTrafficLight.mockReturnValue({
      ...useTrafficLightDefaultProps,
      isPlayingAllowed: true,
    })

    renderWithTheme(<GamePage />)

    const volumeOfIcon = screen.getByTestId('VolumeUpIcon')

    fireEvent.click(volumeOfIcon)

    expect(useTrafficLightDefaultProps.handleToggleAudio).toHaveBeenCalledTimes(
      1
    )
  })

  it('should display correct audio icon when playing is not allowed', () => {
    mockUseTrafficLight.mockReturnValue({
      ...useTrafficLightDefaultProps,
      isPlayingAllowed: false,
    })

    renderWithTheme(<GamePage />)

    expectedValues()

    const volumeOfIcon = screen.getByTestId('VolumeOffIcon')

    fireEvent.click(volumeOfIcon)

    expect(useTrafficLightDefaultProps.handleToggleAudio).toHaveBeenCalledTimes(
      1
    )
  })
})
