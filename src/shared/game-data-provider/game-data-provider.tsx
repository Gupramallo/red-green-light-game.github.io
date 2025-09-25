import React, { useMemo } from 'react'
import type { PropsWithChildren } from 'react'
import { GameDataContext } from './context'
import { useGameDataStore } from './store'
import type { GameDataStore } from './types'

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
    [currentUser, highestScores, setCurrentUser, clearCurrentUser]
  )

  return (
    <GameDataContext.Provider value={value}>
      {children}
    </GameDataContext.Provider>
  )
}

export default GameDataProvider
