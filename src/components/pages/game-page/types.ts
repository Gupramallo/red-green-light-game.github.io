import type { RefObject } from 'react'

export type HandleAudioPlaying = {
  isPlayingAllowed: boolean
  isGreenLight: boolean
  audioRef: RefObject<HTMLAudioElement | null>
  duration: number
}
