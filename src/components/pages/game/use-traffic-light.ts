import { useReducer, useEffect } from 'react'
import {
  INITIAL_STATE,
  RED_LIGHT_DURATION,
  TRAFFIC_COLOR_ACTIONS,
  TRAFFIC_COLORS,
} from './constants'
import { trafficReducer } from './reducer'
import { calculateGreenLightDuration } from './utils'
import { useGameDataContext } from '@/shared/game-data-provider/context'

export const useTrafficLight = () => {
  const { currentUser } = useGameDataContext()
  const [trafficColor, dispatch] = useReducer(trafficReducer, INITIAL_STATE)
  const isGreenLight = trafficColor === TRAFFIC_COLORS.green

  useEffect(() => {
    const duration = isGreenLight
      ? calculateGreenLightDuration(currentUser?.score)
      : RED_LIGHT_DURATION

    const nextActionType = isGreenLight
      ? TRAFFIC_COLOR_ACTIONS.switchToRed
      : TRAFFIC_COLOR_ACTIONS.switchToGreen

    const timeoutId = setTimeout(
      () => dispatch({ type: nextActionType }),
      duration
    )

    return () => clearTimeout(timeoutId)
  }, [trafficColor, currentUser?.score, isGreenLight])

  return {
    isGreenLight,
  }
}
