import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { handleAudioPlayingMockProps } from '../__mocks__/traffic-light-mocks'
import {
  MAXIMUM_GREEN_LIGHT_INTERVAL_DURATION,
  MINIMUM_GREEN_LIGHT_INTERVAL_DURATION,
  RANDOM_VARIATION_RANGE,
  SCORE_TIME_DECREASE_MULTIPLIER,
} from '../constants'
import { calculateGreenLightDuration, handleAudioPlaying } from '../utils'

describe('calculateGreenLightDuration', () => {
  const originalMathRandom = Math.random

  afterEach(() => {
    Math.random = originalMathRandom
  })

  it('should return maximum duration for score 0 with random variation', () => {
    Math.random = vi.fn(() => 0.5)

    const result = calculateGreenLightDuration(0)

    // With score 0: baseDuration = 10000, randomVariation = 0 (0.5 - 0.5) * 3000
    expect(result).toBe(MAXIMUM_GREEN_LIGHT_INTERVAL_DURATION)
  })

  it('should decrease duration based on score', () => {
    Math.random = vi.fn(() => 0.5)

    const score = 10
    const result = calculateGreenLightDuration(score)

    const expectedBaseDuration =
      MAXIMUM_GREEN_LIGHT_INTERVAL_DURATION -
      score * SCORE_TIME_DECREASE_MULTIPLIER
    expect(result).toBe(expectedBaseDuration)
  })

  it('should not go below minimum duration', () => {
    Math.random = vi.fn(() => 0.5)

    const score = 100
    const result = calculateGreenLightDuration(score)

    expect(result).toBe(MINIMUM_GREEN_LIGHT_INTERVAL_DURATION)
  })

  it('should add positive random variation', () => {
    Math.random = vi.fn(() => 1)

    const result = calculateGreenLightDuration(0)
    const expectedResult =
      MAXIMUM_GREEN_LIGHT_INTERVAL_DURATION + RANDOM_VARIATION_RANGE / 2

    expect(result).toBe(expectedResult)
  })

  it('should add negative random variation', () => {
    Math.random = vi.fn(() => 0)

    const result = calculateGreenLightDuration(0)
    const expectedResult =
      MAXIMUM_GREEN_LIGHT_INTERVAL_DURATION - RANDOM_VARIATION_RANGE / 2

    expect(result).toBe(expectedResult)
  })
})

describe('handleAudioPlaying', () => {
  const mockAudioElement = {
    play: vi.fn(),
    pause: vi.fn(),
    playbackRate: 1,
    currentTime: 0,
  } as unknown as HTMLAudioElement

  const mockAudioRef = {
    current: mockAudioElement,
  }

  beforeEach(() => {
    vi.clearAllMocks()
    mockAudioElement.playbackRate = 1
    mockAudioElement.currentTime = 0
  })

  it('should return early and not interact with audio if playing audio is not allowed', () => {
    handleAudioPlaying({
      ...handleAudioPlayingMockProps,
      audioRef: mockAudioRef,
    })

    expect(mockAudioElement.play).not.toHaveBeenCalled()
    expect(mockAudioElement.pause).not.toHaveBeenCalled()
  })

  it('should return early and not interact with audio if audio ref is null', () => {
    handleAudioPlaying({
      ...handleAudioPlayingMockProps,
      isPlayingAllowed: true,
    })

    expect(mockAudioElement.play).not.toHaveBeenCalled()
    expect(mockAudioElement.pause).not.toHaveBeenCalled()
  })

  it('should calculate correct playback rate and play audio', () => {
    // 11500 (Default playback time) / 5000 = 2.3
    const expectedRate = 2.3

    handleAudioPlaying({
      ...handleAudioPlayingMockProps,
      isPlayingAllowed: true,
      audioRef: mockAudioRef,
    })

    expect(mockAudioElement.playbackRate).toBe(expectedRate)
    expect(mockAudioElement.play).toHaveBeenCalledOnce()
    expect(mockAudioElement.pause).not.toHaveBeenCalled()
  })

  it('should handle different durations with correct calculations', () => {
    const targetDuration = 4000
    // 11500 (Default playback time) / 4000 = 2.875
    const expectedRate = 2.875

    handleAudioPlaying({
      ...handleAudioPlayingMockProps,
      isPlayingAllowed: true,
      audioRef: mockAudioRef,
      duration: targetDuration,
    })

    expect(mockAudioElement.playbackRate).toBe(expectedRate)
    expect(mockAudioElement.play).toHaveBeenCalledOnce()
    expect(mockAudioElement.pause).not.toHaveBeenCalled()
  })

  it('should pause audio and reset currentTime', () => {
    mockAudioElement.currentTime = 5.5

    handleAudioPlaying({
      ...handleAudioPlayingMockProps,
      isPlayingAllowed: true,
      isGreenLight: false,
      audioRef: mockAudioRef,
    })

    expect(mockAudioElement.pause).toHaveBeenCalledOnce()
    expect(mockAudioElement.currentTime).toBe(0)
    expect(mockAudioElement.play).not.toHaveBeenCalled()
  })
})
