import { useRef, useState } from 'react'
import { DEFAULT_AUDIO_DURATION } from './constants'
import type { CalculateAudioPlaybackRate } from './types'

export const useAudio = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlayingAllowed, setIsPlayingAllowed] = useState(false)
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false)

  const toggleAudio = () => {
    if (!hasPlayedOnce && audioRef.current) {
      audioRef.current.play()
      setHasPlayedOnce(true)
    }

    setIsPlayingAllowed((isPlayingPrevValue) => {
      if (audioRef.current) {
        audioRef.current.muted = isPlayingPrevValue
      }

      return !isPlayingPrevValue
    })
  }

  const calculateAudioPlaybackRate = ({
    targetDuration,
    audioDuration = DEFAULT_AUDIO_DURATION,
  }: CalculateAudioPlaybackRate): number => {
    const idealRate = audioDuration / targetDuration

    return Math.min(4.0, Math.max(1, idealRate))
  }

  return {
    calculateAudioPlaybackRate,
    setIsPlayingAllowed,
    audioRef,
    toggleAudio,
    isPlayingAllowed,
  }
}
