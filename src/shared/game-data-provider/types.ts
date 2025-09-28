export type User = {
  name: string
  score: number
  highScore: number
}

export type GameDataStore = {
  currentUser?: User
  usersScores: User[]
  setCurrentUser: (user: string) => void
  clearCurrentUser: () => void
  updateGameScore: (score: number) => void
  finalizeGame: () => void
  resetGameScore: () => void
}
