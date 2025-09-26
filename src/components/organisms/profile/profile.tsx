import type React from 'react'
import { Box } from '@mui/material'
import { Avatar, Container, HighScoreLabel, NameLabel } from './styles'
import type { ProfileProps } from './types'

const Profile: React.FC<ProfileProps> = ({ currentUser, profileSrc }) => {
  const name = currentUser?.name

  return (
    <Container>
      {currentUser && (
        <>
          <Avatar src={profileSrc} alt={name}>
            {name?.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <NameLabel variant="body1">{name}</NameLabel>
            <HighScoreLabel variant="body2">
              High Score: {currentUser.highScore}
            </HighScoreLabel>
          </Box>
        </>
      )}
    </Container>
  )
}
export default Profile
