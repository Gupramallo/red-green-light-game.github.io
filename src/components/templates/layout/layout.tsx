import { type PropsWithChildren, useMemo } from 'react'
import type React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '@/components/organisms/header'
import type { HeaderIcons } from '@/components/organisms/header/types'
import { useGameDataStore } from '@/shared/game-data-provider/store'
import { HEADER_ICONS } from './constants'
import { Container } from './styles'

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate()
  const { currentUser, clearCurrentUser } = useGameDataStore()
  const headerIcons: HeaderIcons[] = useMemo(
    () =>
      HEADER_ICONS.map(({ title, id, route, icon }) => ({
        title,
        id,
        icon,
        onClick: () => {
          if (id === 'logout') {
            clearCurrentUser()
          }

          navigate(route)
        },
      })),
    [clearCurrentUser, navigate]
  )

  return (
    <Container>
      {currentUser && (
        <Header headerIcons={headerIcons} currentUser={currentUser} />
      )}

      {children}
    </Container>
  )
}

export default Layout
