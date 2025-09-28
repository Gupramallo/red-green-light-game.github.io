import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mockUser } from '@/test/__mocks__/shared-mocks'
import AuthGuard from '../auth-guard'

const mockUseGameDataContext = vi.fn()
vi.mock('../../game-data-provider/context', () => ({
  useGameDataContext: () => mockUseGameDataContext(),
}))

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')

  return {
    ...actual,
    Navigate: ({ to, replace }: { to: string; replace?: boolean }) => {
      mockNavigate({ to, replace })

      return <div data-testid="navigate-component">Navigate to {to}</div>
    },
    Outlet: () => <div data-testid="outlet-component">Outlet Content</div>,
  }
})

describe('AuthGuard', () => {
  beforeEach(() => vi.clearAllMocks())

  it('should render /home when currentUser is undefined', () => {
    mockUseGameDataContext.mockReturnValue({
      currentUser: undefined,
    })

    render(
      <MemoryRouter>
        <AuthGuard />
      </MemoryRouter>
    )

    expect(screen.queryByTestId('outlet-component')).not.toBeInTheDocument()
    expect(screen.getByTestId('navigate-component')).toBeInTheDocument()
    expect(mockNavigate).toHaveBeenCalledWith({ to: '/home', replace: true })
  })

  it('should navigate to /home when currentUser exists', () => {
    mockUseGameDataContext.mockReturnValue({
      currentUser: mockUser,
    })

    render(
      <MemoryRouter>
        <AuthGuard />
      </MemoryRouter>
    )

    expect(screen.queryByTestId('navigate-component')).not.toBeInTheDocument()
    expect(screen.getByTestId('outlet-component')).toBeInTheDocument()
    expect(mockNavigate).not.toHaveBeenCalled()
  })
})
