import { createContext, useContext } from 'react'
import { GAME_DATA_CONTEXT_DEFAULT_VALUES } from './constants'
import type { GameDataStore } from './types'

export const GameDataContext = createContext<GameDataStore>(
  GAME_DATA_CONTEXT_DEFAULT_VALUES
)

export const useGameDataContext = () => useContext(GameDataContext)
