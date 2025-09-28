import { calculateAudioPlaybackRate } from '@/shared/hooks/use-audio/utils'
import {
  MAXIMUM_GREEN_LIGHT_INTERVAL_DURATION,
  MINIMUM_GREEN_LIGHT_INTERVAL_DURATION,
  RANDOM_VARIATION_OFFSET,
  RANDOM_VARIATION_RANGE,
  SCORE_TIME_DECREASE_MULTIPLIER,
} from './constants'
import type { HandleAudioPlaying } from './types'

export const calculateGreenLightDuration = (score = 0): number => {
  const scorePenalty = score * SCORE_TIME_DECREASE_MULTIPLIER
  const baseDuration = Math.max(
    MAXIMUM_GREEN_LIGHT_INTERVAL_DURATION - scorePenalty,
    MINIMUM_GREEN_LIGHT_INTERVAL_DURATION
  )
  const randomVariation =
    (Math.random() - RANDOM_VARIATION_OFFSET) * RANDOM_VARIATION_RANGE

  return baseDuration + randomVariation
}

export const handleAudioPlaying = ({
  isPlayingAllowed,
  isGreenLight,
  audioRef,
  duration,
}: HandleAudioPlaying) => {
  if (!isPlayingAllowed) return

  if (!audioRef?.current) return

  if (isGreenLight) {
    audioRef.current.playbackRate = calculateAudioPlaybackRate({
      targetDuration: duration,
    })

    audioRef.current.play()
  } else {
    audioRef.current.pause()
    audioRef.current.currentTime = 0
  }
}
