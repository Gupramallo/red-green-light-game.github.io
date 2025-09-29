import { vi } from 'vitest'

export const useTrafficLightDefaultProps = {
  isGreenLight: true,
  handleStepClicked: vi.fn(),
  currentGameScore: 85,
  audioRef: { current: null },
  isPlayingAllowed: true,
  handleToggleAudio: vi.fn(),
}
