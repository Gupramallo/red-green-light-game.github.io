import { act, renderHook, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { STEP } from '@/shared/constants'
import { useGameDataContext } from '@/shared/game-data-provider/context'
import useAudio from '@/shared/hooks/use-audio'
import { vibrateMobileDevice } from '@/shared/utils'
import { RED_LIGHT_DURATION } from '../constants'
import { useTrafficLight } from '../use-traffic-light'

const mockGreenLightDuration = 5000
const mockScore = 5

vi.mock('@/shared/utils')
vi.mock('@/shared/game-data-provider/context')
vi.mock('@/shared/hooks/use-audio')
vi.mock('../utils', () => ({
  calculateGreenLightDuration: vi.fn(() => mockGreenLightDuration),
  handleAudioPlaying: vi.fn(),
}))

const mockUseGameDataContext = vi.mocked(useGameDataContext)
const mockUseAudio = vi.mocked(useAudio)
const scoreState = { current: mockScore }
const mockCurrentUser = {
  name: 'Test User',
  get score() {
    return scoreState.current
  },
  highScore: 10,
}

const mockUpdateGameScore = vi.fn((newScore: number) => {
  scoreState.current = newScore
})

const mockGameDataContext = {
  currentUser: mockCurrentUser,
  finalizeGame: vi.fn(),
  updateGameScore: mockUpdateGameScore,
  usersScores: [],
  setCurrentUser: vi.fn(),
  clearCurrentUser: vi.fn(),
  resetGameScore: vi.fn(),
  updateUserHighScore: vi.fn(),
}

const mockAudioContext = {
  isPlayingAllowed: true,
  audioRef: { current: null },
  setIsPlayingAllowed: vi.fn(),
  toggleAudio: vi.fn(),
  isAudioUnlocked: false,
}

describe('useTrafficLight', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()

    scoreState.current = mockScore

    mockUseGameDataContext.mockReturnValue(mockGameDataContext)
    mockUseAudio.mockReturnValue(mockAudioContext)
  })

  afterEach(() => vi.useRealTimers())

  it('should initialize with default props', () => {
    const { result } = renderHook(() => useTrafficLight())

    expect(result.current.isGreenLight).toBe(true)
    expect(result.current.currentUser).toBe(mockCurrentUser)
    expect(result.current.currentGameScore).toBe(5)
    expect(result.current.highScore).toBe(10)
    expect(result.current.audioRef).toBe(mockAudioContext.audioRef)
    expect(result.current.isPlayingAllowed).toBe(true)
  })

  it('should handle missing current user gracefully', () => {
    mockUseGameDataContext.mockReturnValue({
      ...mockGameDataContext,
      currentUser: undefined,
    })

    const { result } = renderHook(() => useTrafficLight())

    expect(result.current.currentGameScore).toBe(0)
    expect(result.current.highScore).toBe(0)
  })

  it('should toggle from green to red', () => {
    const { result } = renderHook(() => useTrafficLight())

    expect(result.current.isGreenLight).toBe(true)

    act(() => vi.advanceTimersByTime(mockGreenLightDuration))

    waitFor(() => expect(result.current.isGreenLight).toBe(false))

    act(() => vi.advanceTimersByTime(RED_LIGHT_DURATION))

    waitFor(() => expect(result.current.isGreenLight).toBe(true))
  })

  it('should increase score when clicking on left step for the first time', () => {
    const { result } = renderHook(() => useTrafficLight())

    act(() => result.current.handleStepClicked({ step: STEP.left }))

    expect(mockGameDataContext.updateGameScore).toHaveBeenCalledWith(
      mockScore + 1
    )
  })

  it('should increase score when clicking on right step for the first time', () => {
    const { result } = renderHook(() => useTrafficLight())

    act(() => result.current.handleStepClicked({ step: STEP.right }))

    expect(mockGameDataContext.updateGameScore).toHaveBeenCalledWith(
      mockScore + 1
    )
  })

  it('should decrease score and vibrate when clicking same step twice', () => {
    const { result } = renderHook(() => useTrafficLight())

    act(() => result.current.handleStepClicked({ step: STEP.left }))

    act(() => result.current.handleStepClicked({ step: STEP.left }))

    const [firstCall, secondCall] =
      mockGameDataContext.updateGameScore.mock.calls

    const updatedScore = mockScore + 1

    expect(firstCall).toEqual([updatedScore])
    expect(secondCall).toEqual([updatedScore - 1])
    expect(vibrateMobileDevice).toHaveBeenCalled()
  })

  it('should allow alternating between different steps', () => {
    const { result } = renderHook(() => useTrafficLight())

    act(() => result.current.handleStepClicked({ step: STEP.left }))
    act(() => result.current.handleStepClicked({ step: STEP.right }))
    act(() => result.current.handleStepClicked({ step: STEP.left }))

    expect(mockGameDataContext.updateGameScore).toHaveBeenCalledTimes(3)

    const [firstCall, secondCall, thirdCall] =
      mockGameDataContext.updateGameScore.mock.calls

    expect(firstCall).toEqual([mockScore + 1])
    expect(secondCall).toEqual([mockScore + 2])
    expect(thirdCall).toEqual([mockScore + 3])
  })

  it('should not allow score to go below 0', () => {
    mockUseGameDataContext.mockReturnValue({
      ...mockGameDataContext,
      currentUser: { ...mockCurrentUser, score: 0 },
    })

    const { result } = renderHook(() => useTrafficLight())

    act(() => result.current.handleStepClicked({ step: STEP.left }))
    act(() => result.current.handleStepClicked({ step: STEP.left }))
    act(() => result.current.handleStepClicked({ step: STEP.left }))

    const [firstCall, secondCall, thirdCall] =
      mockGameDataContext.updateGameScore.mock.calls

    expect(firstCall).toEqual([1])
    expect(secondCall).toEqual([0])
    expect(thirdCall).toEqual([0])
  })

  it('should finalize the game if user clicks when light is not green', () => {
    const { result } = renderHook(() => useTrafficLight())

    act(() => vi.advanceTimersByTime(mockGreenLightDuration))

    act(() => result.current.handleStepClicked({ step: STEP.right }))

    expect(mockGameDataContext.finalizeGame).toHaveBeenCalled()
  })

  it('should call toggleAudio with correct parameters', () => {
    const { result } = renderHook(() => useTrafficLight())

    act(() => result.current.handleToggleAudio())

    expect(mockAudioContext.toggleAudio).toHaveBeenCalledWith({
      audioPlaybackRate: 2.3, // Always 2.3 since calculateGreenLightDuration is a fixed value
      autoPlay: true,
    })
  })

  it('should pass autoPlay as false when in red light', () => {
    const { result } = renderHook(() => useTrafficLight())

    act(() => vi.advanceTimersByTime(mockGreenLightDuration))

    waitFor(() => expect(result.current.isGreenLight).toBe(false))

    act(() => result.current.handleToggleAudio())

    expect(mockAudioContext.toggleAudio).toHaveBeenCalledWith({
      audioPlaybackRate: 2.3,
      autoPlay: false,
    })
  })
})
