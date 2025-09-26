import type React from 'react'
import type { User } from '@/shared/game-data-provider/types'

export type HeaderIcons = {
  icon: React.ComponentType
  title: string
  onClick: () => void
  id: string
}

export type HeaderProps = {
  headerIcons: HeaderIcons[]
  currentUser: User
}
