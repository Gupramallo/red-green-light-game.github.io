import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { mockUser } from '@/test/__mocks__/shared-mocks'
import { renderWithTheme } from '@/test/render-with-theme'
import Profile from '../profile'
import type { ProfileProps } from '../types'

const mockProfileSrc = 'https://example.com/avatar.jpg'

describe('Profile', () => {
  it('should render user name and high score', () => {
    const props: ProfileProps = {
      currentUser: mockUser,
      profileSrc: mockProfileSrc,
    }

    renderWithTheme(<Profile {...props} />)

    expect(screen.getByText('Test User')).toBeInTheDocument()
    expect(screen.getByText('High Score: 25')).toBeInTheDocument()
    const avatar = screen.getByRole('img', { name: 'Test User' })
    expect(avatar).toBeInTheDocument()
    expect(avatar).toHaveAttribute('src', mockProfileSrc)
  })

  it('should render avatar fallback letter when no image provided', () => {
    const props: ProfileProps = {
      currentUser: mockUser,
    }

    renderWithTheme(<Profile {...props} />)

    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    expect(screen.getByText(mockUser.name.charAt(0))).toBeInTheDocument()
  })

  it('should render nothing when currentUser is undefined', () => {
    const props: ProfileProps = {
      currentUser: undefined,
      profileSrc: mockProfileSrc,
    }

    renderWithTheme(<Profile {...props} />)

    expect(screen.getByTestId('profile-container')).toBeInTheDocument()
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    expect(screen.queryByText(/High Score:/)).not.toBeInTheDocument()
  })
})
