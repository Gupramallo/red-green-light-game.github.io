import type { GameDataStore } from './types'

export const GAME_DATA_CONTEXT_DEFAULT_VALUES: GameDataStore = {
  currentUser: undefined,
  usersScores: [],
  setCurrentUser: () => {},
  clearCurrentUser: () => {},
  updateGameScore: () => {},
  finalizeGame: () => {},
  resetGameScore: () => {},
  updateUserHighScore: () => {},
}
