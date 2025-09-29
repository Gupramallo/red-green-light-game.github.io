import type { User } from '@/shared/game-data-provider/types'
import { mockUser } from '@/test/__mocks__/shared-mocks'

export const mockUsers: User[] = [
  mockUser,
  { name: 'Bob', score: 0, highScore: 100 },
  { name: 'Charlie', score: 0, highScore: 75 },
]

export const sameScoreUsers: User[] = [
  { name: 'First', score: 0, highScore: 100 },
  { name: 'Second', score: 0, highScore: 100 },
  { name: 'Third', score: 0, highScore: 50 },
]
