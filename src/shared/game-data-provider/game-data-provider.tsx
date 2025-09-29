import React, { useMemo } from 'react'
import type { PropsWithChildren } from 'react'
import { GameDataContext } from './context'
import { useGameDataStore } from './store'
import type { GameDataStore } from './types'

const GameDataProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const {
    currentUser,
    usersScores,
    setCurrentUser,
    clearCurrentUser,
    updateGameScore,
    finalizeGame,
    resetGameScore,
    updateUserHighScore,
  } = useGameDataStore()

  const value: GameDataStore = useMemo(
    () => ({
      currentUser,
      finalizeGame,
      usersScores,
      setCurrentUser,
      clearCurrentUser,
      updateGameScore,
      resetGameScore,
      updateUserHighScore,
    }),
    [
      currentUser,
      finalizeGame,
      usersScores,
      setCurrentUser,
      clearCurrentUser,
      updateGameScore,
      resetGameScore,
      updateUserHighScore,
    ]
  )

  return (
    <GameDataContext.Provider value={value}>
      {children}
    </GameDataContext.Provider>
  )
}

export default GameDataProvider
