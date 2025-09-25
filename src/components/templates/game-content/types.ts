import type { StepT } from '@/shared/game-data-provider/types'

export type GameContentProps = {
  currentGameScore: number
  isGreenLight?: boolean
  handleStepClicked: ({ step }: { step: StepT }) => void
}
