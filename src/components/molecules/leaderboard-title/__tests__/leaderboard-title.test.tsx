import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import LeaderboardTitle from '../leaderboard-title'

describe('LeaderboardTitle', () => {
  describe('rendering', () => {
    it('should render the default label', () => {
      render(<LeaderboardTitle />)

      expect(
        screen.getByRole('heading', {
          level: 4,
          name: 'Leaderboard',
        })
      ).toBeInTheDocument()
      expect(screen.getByTestId('EmojiEventsIcon')).toBeInTheDocument()
    })

    it('should render custom label when provided', () => {
      const label = 'Top Players'

      render(<LeaderboardTitle label={label} />)

      expect(
        screen.getByRole('heading', {
          level: 4,
          name: label,
        })
      ).toBeInTheDocument()
    })
  })
})
