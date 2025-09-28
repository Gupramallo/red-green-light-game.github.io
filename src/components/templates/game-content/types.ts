import type { AudioButtonProps } from '@/components/atoms/audio-button/types'
import type { StepT } from '@/shared/game-data-provider/types'

export type GameContentProps = AudioButtonProps & {
  currentGameScore: number
  isGreenLight?: boolean
  handleStepClicked: ({ step }: { step: StepT }) => void
}
