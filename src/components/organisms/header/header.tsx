import type React from 'react'
import { IconButton } from '@mui/material'
import Profile from '../profile'
import { Container, IconsContainer, Toolbar } from './styles'
import type { HeaderProps } from './types'

const Header: React.FC<HeaderProps> = ({ headerIcons, currentUser }) => (
  <Container position="sticky">
    <Toolbar>
      <Profile currentUser={currentUser} profileSrc="https://cataas.com/cat" />
      <IconsContainer>
        {headerIcons.map(({ icon: Icon, title, onClick, id }) => (
          <IconButton key={id} onClick={onClick} title={title}>
            <Icon />
          </IconButton>
        ))}
      </IconsContainer>
    </Toolbar>
  </Container>
)

export default Header
