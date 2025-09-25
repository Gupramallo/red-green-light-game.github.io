import {
  MAXIMUM_GREEN_LIGHT_INTERVAL_DURATION,
  MINIMUM_GREEN_LIGHT_INTERVAL_DURATION,
  RANDOM_VARIATION_RANGE,
  SCORE_TIME_DECREASE_MULTIPLIER,
} from './constants'

export const calculateGreenLightDuration = (score = 0): number => {
  const scorePenalty = score * SCORE_TIME_DECREASE_MULTIPLIER
  const baseDuration = Math.max(
    MAXIMUM_GREEN_LIGHT_INTERVAL_DURATION - scorePenalty,
    MINIMUM_GREEN_LIGHT_INTERVAL_DURATION
  )
  const randomVariation = (Math.random() - 0.5) * RANDOM_VARIATION_RANGE

  return baseDuration + randomVariation
}
