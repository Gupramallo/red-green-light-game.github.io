import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { User } from '@/shared/game-data-provider/types'
import { mockUser } from '@/test/__mocks__/shared-mocks'
import { renderWithTheme } from '@/test/render-with-theme'
import RankingsContent from '../rankings-content'

const mockUsers: User[] = [
  { name: 'Player One', score: 0, highScore: 100 },
  { name: 'Player Two', score: 0, highScore: 85 },
  mockUser,
  { name: 'Player Four', score: 0, highScore: 10 },
]

describe('RankingsContent', () => {
  describe('rendering with users', () => {
    it('should render leaderboard with all users', () => {
      renderWithTheme(
        <RankingsContent users={mockUsers} currentUser={mockUser} />
      )

      expect(
        screen.getByRole('heading', { name: 'Leaderboard', level: 4 })
      ).toBeInTheDocument()
      expect(screen.getByTestId('EmojiEventsIcon')).toBeInTheDocument()

      mockUsers.forEach((user, index) => {
        if (user.name === mockUser.name) {
          const image = screen.getByRole('img')

          expect(image).toBeInTheDocument()
          expect(image).toHaveAttribute('src', 'https://cataas.com/cat')
          expect(screen.getByText(`${user.name} (You)`)).toBeInTheDocument()
        } else {
          expect(screen.getByText(user.name)).toBeInTheDocument()
        }

        expect(
          screen.getByText(`High Score: ${user.highScore}`)
        ).toBeInTheDocument()

        if (index < 2) {
          screen.getByRole('heading', { name: `#${index + 1}`, level: 5 })
        }
      })
    })

    it('should render empty state when users array is empty', () => {
      renderWithTheme(<RankingsContent currentUser={mockUser} />)

      expect(screen.getByText('No players yet')).toBeInTheDocument()
      expect(screen.queryByText('Leaderboard')).not.toBeInTheDocument()
    })
  })
})
