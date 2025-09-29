import { fireEvent, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mockUser } from '@/test/__mocks__/shared-mocks'
import { renderWithTheme } from '@/test/render-with-theme'
import { HEADER_ICONS } from '../constants'
import Layout from '../layout'

const mockUseGameDataStore = vi.fn()
vi.mock('@/shared/game-data-provider/store', () => ({
  useGameDataStore: () => mockUseGameDataStore(),
}))

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

const mockClearCurrentUser = vi.fn()
const mockupdateUserHighScore = vi.fn()

describe('Layout', () => {
  beforeEach(() => vi.clearAllMocks())

  it('should render layout in the document with header and buttons', () => {
    mockUseGameDataStore.mockReturnValue({
      currentUser: mockUser,
      clearCurrentUser: mockClearCurrentUser,
      updateUserHighScore: mockupdateUserHighScore,
    })

    renderWithTheme(
      <MemoryRouter>
        <Layout>
          <div data-testid="test-content">Page Content</div>
        </Layout>
      </MemoryRouter>
    )

    expect(screen.getByText(mockUser.name)).toBeInTheDocument()
    expect(
      screen.getByText(`High Score: ${mockUser.highScore}`)
    ).toBeInTheDocument()
    expect(screen.getByRole('img', { name: mockUser.name })).toBeInTheDocument()
    expect(screen.getByText('Page Content')).toBeInTheDocument()

    HEADER_ICONS.forEach((icon) => {
      const button = screen.getByRole('button', { name: icon.title })

      expect(button).toBeInTheDocument()

      fireEvent.click(button)

      expect(mockupdateUserHighScore).toHaveBeenCalled()
      expect(mockNavigate).toHaveBeenCalledWith(icon.route)
      if (icon.id === 'logout') {
        expect(mockClearCurrentUser).toHaveBeenCalled()
      }
    })
  })

  it('should render layout without header when no user', () => {
    mockUseGameDataStore.mockReturnValue({
      currentUser: undefined,
      clearCurrentUser: vi.fn(),
    })

    renderWithTheme(
      <MemoryRouter>
        <Layout>
          <div data-testid="test-content">Content without user</div>
        </Layout>
      </MemoryRouter>
    )

    expect(screen.queryByTestId('header-component')).not.toBeInTheDocument()
    expect(screen.getByTestId('test-content')).toBeInTheDocument()
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })
})
