import type { StepT } from '@/shared/game-data-provider/types'

export type StepButtonProps = {
  label: string
  onClick: () => void
  direction: StepT
}
