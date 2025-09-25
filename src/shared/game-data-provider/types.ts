export type User = {
  name: string
  score: number
}

export type GameDataStore = {
  currentUser?: User
  highestScores: User[]
  setCurrentUser: (user: string) => void
  clearCurrentUser: () => void
}
