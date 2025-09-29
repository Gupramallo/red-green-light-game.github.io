import { vi } from 'vitest'

export const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}

export const secondUser = {
  name: 'Second Player',
  score: 35,
  highScore: 88,
}
