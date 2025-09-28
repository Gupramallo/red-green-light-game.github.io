import { describe, expect, it, vi } from 'vitest'
import {
  calculateAudioPlaybackRate,
  unlockAudio,
} from '@/shared/hooks/use-audio/utils'
import {
  DEFAULT_AUDIO_DURATION,
  DEFAULT_PLAYBACK_RATE,
  MAXIMUM_PLAYBACK_RATE,
} from '../constants'

describe('calculateAudioPlaybackRate', () => {
  it('should return regular speed for equal durations', () => {
    const result = calculateAudioPlaybackRate({
      targetDuration: DEFAULT_AUDIO_DURATION,
      audioDuration: DEFAULT_AUDIO_DURATION,
    })

    expect(result).toBe(1.0)
  })

  it('should return double the speed for half target duration', () => {
    const result = calculateAudioPlaybackRate({
      targetDuration: DEFAULT_AUDIO_DURATION / 2,
      audioDuration: DEFAULT_AUDIO_DURATION,
    })

    expect(result).toBe(2.0)
  })

  it('should get max speed (no more than max playback rate)', () => {
    const result = calculateAudioPlaybackRate({
      targetDuration: 500,
      audioDuration: DEFAULT_AUDIO_DURATION,
    })

    expect(result).toBe(MAXIMUM_PLAYBACK_RATE)
  })

  it('should get minimum speed (no lest than default playback rate)', () => {
    const result = calculateAudioPlaybackRate({
      targetDuration: 50000,
      audioDuration: DEFAULT_AUDIO_DURATION,
    })

    expect(result).toBe(DEFAULT_PLAYBACK_RATE)
  })
})

describe('unlockAudio', () => {
  const mockAudioElement = {
    muted: false,
    play: vi.fn().mockResolvedValue(undefined),
    pause: vi.fn(),
  } as unknown as HTMLAudioElement

  it('should unlock audio by playing and pausing while muted', () => {
    unlockAudio(mockAudioElement)

    expect(mockAudioElement.play).toHaveBeenCalledTimes(1)
    expect(mockAudioElement.pause).toHaveBeenCalledTimes(1)
    expect(mockAudioElement.muted).toBe(false)
  })

  it('should not trigger any changes when ref is null', () => {
    expect(() => unlockAudio(null)).not.toThrow()
  })
})
