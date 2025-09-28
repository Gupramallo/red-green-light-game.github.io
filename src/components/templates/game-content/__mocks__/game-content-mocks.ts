import { createRef } from 'react'
import { vi } from 'vitest'
import type { GameContentProps } from '../types'

export const gameContentProps: GameContentProps = {
  currentGameScore: 15,
  isGreenLight: false,
  handleStepClicked: vi.fn(),
  isPlayingAllowed: false,
  audioRef: createRef<HTMLAudioElement>(),
  audioSrc: '/test-audio.mp3',
  toggleAudio: vi.fn(),
}
