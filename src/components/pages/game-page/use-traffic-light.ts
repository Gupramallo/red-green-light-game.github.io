import { useEffect, useReducer, useState } from 'react'
import { useGameDataContext } from '@/shared/game-data-provider/context'
import type { StepT } from '@/shared/game-data-provider/types'
import {
  INITIAL_STATE,
  RED_LIGHT_DURATION,
  TRAFFIC_COLORS,
  TRAFFIC_COLOR_ACTIONS,
} from './constants'
import { trafficReducer } from './reducer'
import { calculateGreenLightDuration } from './utils'

export const useTrafficLight = () => {
  const { currentUser, finalizeGame, updateGameScore } = useGameDataContext()
  const [trafficColor, dispatch] = useReducer(trafficReducer, INITIAL_STATE)
  const [lastStepClicked, setLastStepClicked] = useState<StepT | undefined>()
  const isGreenLight = trafficColor === TRAFFIC_COLORS.green
  const currentGameScore = currentUser?.score ?? 0
  const highScore = currentUser?.highScore ?? 0
  const handleStepClicked = ({ step }: { step: StepT }) => {
    if (!isGreenLight) {
      finalizeGame()
      setLastStepClicked(undefined)

      return
    }

    if (lastStepClicked && lastStepClicked === step) {
      updateGameScore(Math.max(currentGameScore - 1, 0))

      return
    }

    updateGameScore(currentGameScore + 1)
    setLastStepClicked(step)
  }

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
    // if currentUser?.score is added it resets timer when user clicks on the step buttons
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trafficColor, isGreenLight])

  return {
    currentUser,
    currentGameScore,
    highScore,
    isGreenLight,
    handleStepClicked,
  }
}
