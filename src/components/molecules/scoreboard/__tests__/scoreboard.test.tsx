import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Scoreboard from '../scoreboard'

describe('Scoreboard', () => {
  describe('rendering', () => {
    it('should render the default label and score', () => {
      render(<Scoreboard currentGameScore={10} />)

      expect(
        screen.getByRole('heading', {
          level: 4,
          name: 'Score: 10',
        })
      ).toBeInTheDocument()
    })

    it('should render custom label', () => {
      const label = 'Your Score'

      render(<Scoreboard label={label} currentGameScore={25} />)

      expect(
        screen.getByRole('heading', {
          level: 4,
          name: `${label}: 25`,
        })
      ).toBeInTheDocument()
    })
  })
})
