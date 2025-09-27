import type { RefObject } from 'react'

export type AudioButtonProps = {
  audioRef?: RefObject<HTMLAudioElement | null>
  isPlayingAllowed?: boolean
  audioSrc?: string
  toggleAudio?: () => void
}
