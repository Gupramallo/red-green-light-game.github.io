import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { DEFAULT_PLAYBACK_RATE } from '../constants'
import { useAudio } from '../use-audio'
import * as utils from '../utils'

const unlockAudioSpy = vi.spyOn(utils, 'unlockAudio')

describe('useAudio', () => {
  const mockAudioElement = {
    muted: false,
    playbackRate: 1,
    play: vi.fn().mockResolvedValue(undefined),
    pause: vi.fn(),
  } as unknown as HTMLAudioElement

  beforeEach(() => vi.clearAllMocks())

  describe('toggleAudio', () => {
    it('should return early if audioRef.current is null', () => {
      const { result } = renderHook(() => useAudio())

      act(() => result.current.toggleAudio())

      expect(unlockAudioSpy).not.toHaveBeenCalled()
      expect(result.current.isPlayingAllowed).toBe(false)
    })

    it('should unlock audio on first call when audioRef exists', () => {
      const { result } = renderHook(() => useAudio())

      act(() => {
        result.current.audioRef.current = mockAudioElement
        result.current.toggleAudio()
      })

      const { audioRef, isPlayingAllowed } = result.current

      expect(unlockAudioSpy).toHaveBeenCalledWith(mockAudioElement)
      expect(mockAudioElement.playbackRate).toBe(DEFAULT_PLAYBACK_RATE)

      expect(audioRef.current?.play).toHaveBeenCalledTimes(1)
      expect(audioRef.current?.pause).toHaveBeenCalledTimes(1)
      expect(audioRef.current?.muted).toBe(false)
      expect(audioRef.current?.playbackRate).toBe(DEFAULT_PLAYBACK_RATE)
      expect(isPlayingAllowed).toBe(true)
    })

    it('should autoplay', () => {
      const { result } = renderHook(() => useAudio())

      act(() => {
        result.current.audioRef.current = mockAudioElement
        result.current.toggleAudio({
          autoPlay: true,
        })
      })

      const { audioRef, isPlayingAllowed, isAudioUnlocked } = result.current

      expect(unlockAudioSpy).toHaveBeenCalledWith(mockAudioElement)
      expect(mockAudioElement.playbackRate).toBe(DEFAULT_PLAYBACK_RATE)

      expect(audioRef.current?.play).toHaveBeenCalledTimes(2)
      expect(audioRef.current?.pause).toHaveBeenCalledTimes(1)
      expect(audioRef.current?.muted).toBe(false)
      expect(audioRef.current?.playbackRate).toBe(DEFAULT_PLAYBACK_RATE)
      expect(isAudioUnlocked).toBe(true)
      expect(isPlayingAllowed).toBe(true)
    })

    it('should toggle the audio (unmute/mute)', () => {
      const { result } = renderHook(() => useAudio())

      act(() => {
        result.current.audioRef.current = mockAudioElement
        result.current.toggleAudio()
      })

      const { audioRef, isPlayingAllowed } = result.current

      expect(audioRef.current?.muted).toBe(false)
      expect(isPlayingAllowed).toBe(true)

      act(() => result.current.toggleAudio())

      const {
        audioRef: audioRefAfterToggle,
        isPlayingAllowed: isPlayingAllowedAfterToggle,
      } = result.current

      expect(isPlayingAllowedAfterToggle).toBe(false)
      expect(audioRefAfterToggle.current?.muted).toBe(true)
    })

    it('should set custom playback rate when provided', () => {
      const customRate = 2.5
      const { result } = renderHook(() => useAudio())

      act(() => {
        result.current.audioRef.current = mockAudioElement
        result.current.toggleAudio({ audioPlaybackRate: customRate })
      })

      const { audioRef } = result.current

      expect(audioRef?.current?.playbackRate).toBe(customRate)
    })
  })
})
