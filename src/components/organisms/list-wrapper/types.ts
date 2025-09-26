import type { PropsWithChildren, ReactNode } from 'react'

export type ListWrapperProps = PropsWithChildren & {
  hasContent?: boolean
  noContentIcon?: ReactNode
  noContentText?: string
  listHeader?: ReactNode
}
