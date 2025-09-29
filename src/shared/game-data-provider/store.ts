import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { GameDataStore } from './types'

export const useGameDataStore = create<GameDataStore>()(
  persist(
    (set, get) => ({
      usersScores: [],
      currentUser: undefined,
      currentGameScore: 0,
      setCurrentUser: (userName: string) => {
        const { usersScores } = get()
        const existingUser = usersScores.find((user) => user.name === userName)
        const currentUser = {
          name: userName,
          score: existingUser?.score ?? 0,
          highScore: existingUser?.highScore ?? 0,
        }

        set({
          currentUser,
        })

        if (!existingUser) {
          set({
            usersScores: [...usersScores, currentUser],
          })
        }
      },

      clearCurrentUser: () => {
        const { usersScores, currentUser } = get()
        const updatedUsersScores = usersScores.map((user) =>
          user.name === currentUser?.name ? currentUser : user
        )

        set({
          currentUser: undefined,
          usersScores: updatedUsersScores,
        })
      },

      updateGameScore: (score: number) => {
        const { currentUser } = get()

        if (!currentUser) return

        set({
          currentUser: {
            ...currentUser,
            score,
            highScore: Math.max(currentUser.highScore, score),
          },
        })
      },

      resetGameScore: () => {
        const { currentUser } = get()

        if (!currentUser) return

        set({ currentUser: { ...currentUser, score: 0 } })
      },

      finalizeGame: () => {
        const { currentUser, usersScores } = get()

        if (!currentUser) return

        const updatedUser = {
          ...currentUser,
          score: 0,
        }

        const updatedUsersScores = usersScores.map((user) =>
          user.name === currentUser.name ? updatedUser : user
        )

        set({
          currentUser: updatedUser,
          usersScores: updatedUsersScores,
        })
      },
      updateUserHighScore: () => {
        const { currentUser, usersScores } = get()
        const updatedUsersScores = usersScores.map((user) =>
          user.name === currentUser?.name ? currentUser : user
        )

        set({
          usersScores: updatedUsersScores,
        })
      },
    }),
    {
      name: 'game-data-storage',
      partialize: ({ currentUser, usersScores }) => ({
        currentUser,
        usersScores,
      }),
    }
  )
)
