import { fireEvent, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { User } from '@/shared/game-data-provider/types'
import { mockUser } from '@/test/__mocks__/shared-mocks'
import { renderWithTheme } from '@/test/render-with-theme'
import { headerIcons } from '../__mocks__/header-mocks'
import Header from '../header'
import type { HeaderProps } from '../types'

const expectedProfileValues = (user = mockUser) => {
  expect(screen.getByText(user.name)).toBeInTheDocument()
  expect(screen.getByText(`High Score: ${user.highScore}`)).toBeInTheDocument()
  expect(screen.getByRole('img', { name: user.name })).toBeInTheDocument()
}

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render correctly with icons', () => {
    const props: HeaderProps = {
      headerIcons,
      currentUser: mockUser,
    }

    renderWithTheme(<Header {...props} />)

    expectedProfileValues()
    expect(screen.getByTestId('LeaderboardIcon')).toBeInTheDocument()
    expect(screen.getByTestId('VideogameAssetIcon')).toBeInTheDocument()

    const firstButton = screen.getByRole('button', { name: 'First Icon' })
    const secondButton = screen.getByRole('button', { name: 'Second Icon' })

    expect(firstButton).toBeInTheDocument()
    expect(secondButton).toBeInTheDocument()

    fireEvent.click(firstButton)

    expect(headerIcons[0].onClick).toHaveBeenCalled()

    fireEvent.click(secondButton)

    expect(headerIcons[1].onClick).toHaveBeenCalled()
  })

  it('should render correctly without icons', () => {
    const props: HeaderProps = {
      headerIcons: [],
      currentUser: mockUser,
    }

    renderWithTheme(<Header {...props} />)

    expectedProfileValues()

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('should render with different user data', () => {
    const differentUser: User = {
      name: 'Another User',
      score: 50,
      highScore: 100,
    }

    const props: HeaderProps = {
      headerIcons: [],
      currentUser: differentUser,
    }

    renderWithTheme(<Header {...props} />)

    expectedProfileValues(differentUser)
  })
})
