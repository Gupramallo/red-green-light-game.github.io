import type { AudioButtonProps } from '@/components/atoms/audio-button/types'
import type { StepT } from '@/shared/types'

export type GameContentProps = AudioButtonProps & {
  currentGameScore: number
  isGreenLight?: boolean
  handleStepClicked: ({ step }: { step: StepT }) => void
  lastStepClicked?: StepT
}
