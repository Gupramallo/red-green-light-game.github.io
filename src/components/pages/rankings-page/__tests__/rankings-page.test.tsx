import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { mockUser } from '@/test/__mocks__/shared-mocks'
import { renderWithTheme } from '@/test/render-with-theme'
import { mockUsers, sameScoreUsers } from '../__mocks__/ranking-page-mocks'
import RankingsPage from '../rankings-page'

const mockUseGameDataContext = vi.fn()
vi.mock('@/shared/game-data-provider/context', () => ({
  useGameDataContext: () => mockUseGameDataContext(),
}))

describe('RankingsPage', () => {
  it('should render with users sorted by highest points', () => {
    mockUseGameDataContext.mockReturnValue({
      usersScores: mockUsers,
      currentUser: mockUser,
    })

    renderWithTheme(<RankingsPage />)

    expect(
      screen.getByRole('heading', { name: 'Leaderboard', level: 4 })
    ).toBeInTheDocument()
    expect(screen.getByTestId('EmojiEventsIcon')).toBeInTheDocument()

    const listItems = screen.getAllByRole('listitem')

    expect(listItems[0]).toHaveTextContent('Bob')
    expect(listItems[0]).toHaveTextContent('High Score: 100')
    expect(listItems[0]).toHaveTextContent('#1')

    expect(listItems[1]).toHaveTextContent('Charlie')
    expect(listItems[1]).toHaveTextContent('High Score: 75')
    expect(listItems[1]).toHaveTextContent('#2')

    expect(listItems[2]).toHaveTextContent(`${mockUser.name} (You)`)
    expect(listItems[2]).toHaveTextContent(`High Score: ${mockUser.highScore}`)
    expect(listItems[2]).toHaveTextContent('#3')
  })

  it('should render with empty users array', () => {
    mockUseGameDataContext.mockReturnValue({
      usersScores: [],
      currentUser: mockUser,
    })

    renderWithTheme(<RankingsPage />)

    expect(
      screen.getByRole('heading', { name: 'No players yet', level: 6 })
    ).toBeInTheDocument()
    expect(screen.getByTestId('PersonIcon')).toBeInTheDocument()
  })

  it('should handle users with same high scores', () => {
    mockUseGameDataContext.mockReturnValue({
      usersScores: sameScoreUsers,
      currentUser: undefined,
    })

    renderWithTheme(<RankingsPage />)

    const listItems = screen.getAllByRole('listitem')

    expect(listItems[0]).toHaveTextContent('First')
    expect(listItems[0]).toHaveTextContent('High Score: 100')
    expect(listItems[0]).toHaveTextContent('#1')

    expect(listItems[1]).toHaveTextContent('Second')
    expect(listItems[1]).toHaveTextContent('High Score: 100')
    expect(listItems[1]).toHaveTextContent('#2')

    expect(listItems[2]).toHaveTextContent('Third')
    expect(listItems[2]).toHaveTextContent('High Score: 50')
    expect(listItems[2]).toHaveTextContent('#3')
  })
})
