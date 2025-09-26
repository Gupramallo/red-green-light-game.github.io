import type { Dispatch, SetStateAction } from 'react'

export type HomeContentProps = {
  titleLabel: string
  subtitleLabel: string
  textFieldLabel?: string
  buttonLabel?: string
  userName: string
  setUserName: Dispatch<SetStateAction<string>>
  onClick: () => void
}
