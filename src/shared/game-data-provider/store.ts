import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { GameDataStore } from './types'

export const useGameDataStore = create<GameDataStore>()(
  persist(
    (set, get) => ({
      highestScores: [],
      currentUser: undefined,
      setCurrentUser: (userName: string) => {
        const { highestScores } = get()

        const existingUser = highestScores.find(
          (user) => user.name === userName
        )
        const currentUser = {
          name: userName,
          score: existingUser?.score ?? 0,
        }

        set({
          currentUser,
        })

        if (!existingUser) {
          set({
            highestScores: [...highestScores, currentUser],
          })
        }
      },
      clearCurrentUser: () => {
        set({
          currentUser: undefined,
        })
      },
    }),
    {
      name: 'game-data-storage',
      partialize: ({ currentUser, highestScores }) => ({
        currentUser,
        highestScores,
      }),
    }
  )
)
