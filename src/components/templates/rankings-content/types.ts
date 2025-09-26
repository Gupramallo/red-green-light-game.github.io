import type { User } from '@/shared/game-data-provider/types'

export type RankingsContentProps = {
  users: User[]
  currentUser?: User
}
