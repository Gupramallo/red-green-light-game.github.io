import { useRef, useState } from 'react'
import { DEFAULT_PLAYBACK_RATE } from '@/components/pages/game-page/constants'
import type { ToggleAudio } from './types'
import { unlockAudio } from './utils'

export const useAudio = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlayingAllowed, setIsPlayingAllowed] = useState(false)
  const [isAudioUnlocked, setIsAudioUnlocked] = useState(false)

  const toggleAudio = ({
    audioPlaybackRate = DEFAULT_PLAYBACK_RATE,
    autoPlay,
  }: ToggleAudio = {}) => {
    if (!audioRef.current) return

    if (!isAudioUnlocked) {
      unlockAudio(audioRef.current)
      audioRef.current.playbackRate = audioPlaybackRate
      setIsAudioUnlocked(true)
    }

    if (autoPlay) {
      audioRef.current.play()
    }

    setIsPlayingAllowed((isPlayingPrevValue) => {
      if (audioRef.current) {
        audioRef.current.muted = isPlayingPrevValue
      }

      return !isPlayingPrevValue
    })
  }

  return {
    setIsPlayingAllowed,
    audioRef,
    toggleAudio,
    isPlayingAllowed,
  }
}
