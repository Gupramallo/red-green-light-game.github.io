import type { StepT } from '@/shared/types'

export type StepButtonProps = {
  label: string
  onClick: () => void
  direction: StepT
}
