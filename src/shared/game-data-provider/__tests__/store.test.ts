import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mockUser } from '@/test/__mocks__/shared-mocks'
import { localStorageMock, secondUser } from '../__mocks__/store-mocks'
import { useGameDataStore } from '../store'
import type { User } from '../types'

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

describe('useGameDataStore', () => {
  beforeEach(() => {
    useGameDataStore.setState({
      usersScores: [],
      currentUser: undefined,
    })

    vi.clearAllMocks()
  })

  describe('setCurrentUser', () => {
    it('should set current user for new user', () => {
      const expectedResult = {
        name: mockUser.name,
        score: 0,
        highScore: 0,
      }
      const { setCurrentUser } = useGameDataStore.getState()

      setCurrentUser(mockUser.name)

      const state = useGameDataStore.getState()

      expect(state.currentUser).toEqual(expectedResult)
      expect(state.usersScores).toEqual([expectedResult])
    })

    it('should not duplicate user in usersScores when setting existing user', () => {
      useGameDataStore.setState({
        usersScores: [mockUser],
      })

      const { setCurrentUser } = useGameDataStore.getState()

      setCurrentUser(mockUser.name)

      const state = useGameDataStore.getState()

      expect(state.currentUser).toEqual(mockUser)
      expect(state.usersScores).toEqual([mockUser])
    })
  })

  describe('clearCurrentUser', () => {
    it('should clear current user and update usersScores', () => {
      const currentUser = {
        name: mockUser.name,
        score: mockUser.score + 50,
        highScore: mockUser.highScore + 80,
      }

      useGameDataStore.setState({
        currentUser,
        usersScores: [mockUser, secondUser],
      })

      const { clearCurrentUser } = useGameDataStore.getState()

      clearCurrentUser()

      const state = useGameDataStore.getState()

      expect(state.currentUser).toBeUndefined()
      expect(state.usersScores).toEqual([currentUser, secondUser])
    })
  })

  describe('updateGameScore', () => {
    it('should update current user score and high score', () => {
      const highScore = mockUser.highScore + 100

      useGameDataStore.setState({ currentUser: mockUser })

      const { updateGameScore } = useGameDataStore.getState()

      updateGameScore(highScore)

      const state = useGameDataStore.getState()

      expect(state.currentUser?.score).toBe(highScore)
      expect(state.currentUser?.highScore).toBe(highScore)
    })

    it('should not update high score if new score is lower', () => {
      const score = mockUser.highScore - 10

      useGameDataStore.setState({ currentUser: mockUser })

      const { updateGameScore } = useGameDataStore.getState()

      updateGameScore(score)

      const state = useGameDataStore.getState()

      expect(state.currentUser?.score).toBe(score)
      expect(state.currentUser?.highScore).toBe(mockUser.highScore)
    })

    it('should return early when no current user exists', () => {
      const { updateGameScore } = useGameDataStore.getState()

      updateGameScore(10)

      const state = useGameDataStore.getState()

      expect(state.currentUser).toBeUndefined()
    })
  })

  describe('resetGameScore', () => {
    it('should reset current score to 0 but keep high score', () => {
      useGameDataStore.setState({ currentUser: mockUser })

      const { resetGameScore } = useGameDataStore.getState()

      resetGameScore()

      const state = useGameDataStore.getState()

      expect(state.currentUser?.score).toBe(0)
      expect(state.currentUser?.highScore).toBe(mockUser.highScore)
    })

    it('should return early when no current user exists', () => {
      const { resetGameScore } = useGameDataStore.getState()

      resetGameScore()

      const state = useGameDataStore.getState()

      expect(state.currentUser).toBeUndefined()
    })
  })

  describe('finalizeGame', () => {
    it('should reset current user score and update usersScores', () => {
      const currentUser: User = {
        name: mockUser.name,
        score: 200,
        highScore: 250,
      }

      useGameDataStore.setState({
        currentUser,
        usersScores: [
          secondUser,
          { name: mockUser.name, score: 150, highScore: 200 },
        ],
      })

      const { finalizeGame } = useGameDataStore.getState()

      finalizeGame()

      const state = useGameDataStore.getState()

      expect(state.currentUser?.score).toBe(0)
      expect(state.currentUser?.highScore).toBe(250)

      const updatedUser = state.usersScores.find(
        (user) => user.name === mockUser.name
      )

      expect(updatedUser?.score).toBe(0)
      expect(updatedUser?.highScore).toBe(250)

      const otherUserInArray = state.usersScores.find(
        (user) => user.name === secondUser.name
      )

      expect(otherUserInArray).toEqual(secondUser)
    })

    it('should return early when no current user exists', () => {
      useGameDataStore.setState({
        currentUser: undefined,
        usersScores: [secondUser],
      })

      const { finalizeGame } = useGameDataStore.getState()
      finalizeGame()

      const state = useGameDataStore.getState()
      expect(state.currentUser).toBeUndefined()
      expect(state.usersScores).toEqual([secondUser])
    })
  })
})
