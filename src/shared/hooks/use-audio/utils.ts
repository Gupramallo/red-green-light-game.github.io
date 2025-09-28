import { DEFAULT_PLAYBACK_RATE } from '@/components/pages/game-page/constants'
import { DEFAULT_AUDIO_DURATION } from './constants'
import type { CalculateAudioPlaybackRate } from './types'

export const calculateAudioPlaybackRate = ({
  targetDuration,
  audioDuration = DEFAULT_AUDIO_DURATION,
}: CalculateAudioPlaybackRate): number => {
  const idealRate = audioDuration / targetDuration

  return Math.min(4.0, Math.max(DEFAULT_PLAYBACK_RATE, idealRate))
}

export const unlockAudio = (audioRef: HTMLAudioElement) => {
  if (!audioRef) return

  audioRef.muted = true
  audioRef.play()
  audioRef.pause()
  audioRef.muted = false
}
