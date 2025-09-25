import type { PropsWithChildren } from 'react'
import type React from 'react'
import { DarkMode, Home, Leaderboard, Logout } from '@mui/icons-material'
import { AppBar, Box, IconButton, Toolbar } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Profile from '@/components/organisms/profile'
import { useGameDataStore } from '@/shared/game-data-provider/store'
import { ROUTES } from '@/shared/routes'
import { Container } from './styles'

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate()
  const { currentUser, clearCurrentUser } = useGameDataStore()

  const handleLogout = () => {
    clearCurrentUser()
    navigate(ROUTES.home)
  }
  const handleRankings = () => navigate(ROUTES.rankings)
  const handleHome = () => navigate(currentUser ? ROUTES.game : ROUTES.home)
  const handleThemeToggle = () => {
    // TODO: Implement theme toggle
  }

  return (
    <Container>
      <AppBar color="transparent" position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Profile currentUser={currentUser} />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={handleHome} title="Rankings">
              <Home />
            </IconButton>
            <IconButton onClick={handleRankings} title="Rankings">
              <Leaderboard />
            </IconButton>
            <IconButton onClick={handleThemeToggle} title="Toggle theme">
              <DarkMode />
            </IconButton>
            {currentUser && (
              <IconButton onClick={handleLogout} title="Logout">
                <Logout />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {children}
    </Container>
  )
}

export default Layout
