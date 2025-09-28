import { useEffect, useState } from 'react'
import { useGameDataContext } from '@/shared/game-data-provider/context'
import useAudio from '@/shared/hooks/use-audio'
import { calculateAudioPlaybackRate } from '@/shared/hooks/use-audio/utils'
import type { StepT } from '@/shared/types'
import { RED_LIGHT_DURATION } from './constants'
import { calculateGreenLightDuration, handleAudioPlaying } from './utils'

export const useTrafficLight = () => {
  const { currentUser, finalizeGame, updateGameScore } = useGameDataContext()
  const [isGreenLight, setIsGreenLight] = useState(true)
  const [lastStepClicked, setLastStepClicked] = useState<StepT | undefined>()
  const { isPlayingAllowed, audioRef, setIsPlayingAllowed, toggleAudio } =
    useAudio()
  const currentGameScore = currentUser?.score ?? 0
  const highScore = currentUser?.highScore ?? 0
  const handleStepClicked = ({ step }: { step: StepT }) => {
    if (!isGreenLight) {
      finalizeGame()
      setLastStepClicked(undefined)

      return
    }

    if (lastStepClicked && lastStepClicked === step) {
      // TODO: extract into a function
      window?.navigator?.vibrate([200])
      updateGameScore(Math.max(currentGameScore - 1, 0))

      return
    }

    updateGameScore(currentGameScore + 1)
    setLastStepClicked(step)
  }
  const handleToggleAudio = () =>
    toggleAudio({
      audioPlaybackRate: calculateAudioPlaybackRate({
        targetDuration: calculateGreenLightDuration(currentUser?.score),
      }),
      autoPlay: isGreenLight,
    })

  useEffect(() => {
    const duration = isGreenLight
      ? calculateGreenLightDuration(currentUser?.score)
      : RED_LIGHT_DURATION

    // TODO: Improve readability
    handleAudioPlaying({
      isGreenLight,
      isPlayingAllowed,
      audioRef,
      duration,
    })

    const timeoutId = setTimeout(
      () => setIsGreenLight((prev) => !prev),
      duration
    )

    return () => clearTimeout(timeoutId)
    // if currentUser?.score is added it resets timer when user clicks on the step buttons
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGreenLight])

  return {
    currentUser,
    currentGameScore,
    highScore,
    isGreenLight,
    handleStepClicked,
    audioRef,
    setIsPlayingAllowed,
    isPlayingAllowed,
    toggleAudio,
    handleToggleAudio,
  }
}
