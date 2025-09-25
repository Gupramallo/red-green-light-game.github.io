import React, { useMemo } from 'react'
import type { PropsWithChildren } from 'react'
import { GameDataContext } from './context'
import type { GameDataStore } from './types'
import { useGameDataStore } from './store'

const GameDataProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { currentUser, highestScores, setCurrentUser, clearCurrentUser } =
    useGameDataStore()

  const value: GameDataStore = useMemo(
    () => ({
      currentUser,
      highestScores,
      setCurrentUser,
      clearCurrentUser,
    }),
    [currentUser, setCurrentUser, clearCurrentUser]
  )

  return (
    <GameDataContext.Provider value={value}>
      {children}
    </GameDataContext.Provider>
  )
}

export default GameDataProvider
