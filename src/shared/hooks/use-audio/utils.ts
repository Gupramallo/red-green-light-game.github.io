import {
  DEFAULT_AUDIO_DURATION,
  DEFAULT_PLAYBACK_RATE,
  MAXIMUM_PLAYBACK_RATE,
} from './constants'
import type { CalculateAudioPlaybackRate } from './types'

export const calculateAudioPlaybackRate = ({
  targetDuration,
  audioDuration = DEFAULT_AUDIO_DURATION,
}: CalculateAudioPlaybackRate): number => {
  const idealRate = audioDuration / targetDuration

  return Math.min(
    MAXIMUM_PLAYBACK_RATE,
    Math.max(DEFAULT_PLAYBACK_RATE, idealRate)
  )
}

export const unlockAudio = (audioRef: HTMLAudioElement | null) => {
  if (!audioRef) return

  audioRef.muted = true
  audioRef.play()
  audioRef.pause()
  audioRef.muted = false
}
