import type React from 'react'
import { Box } from '@mui/material'
import { Avatar, Container, HighScoreLabel, NameLabel } from './styles'
import type { ProfileProps } from './types'

const Profile: React.FC<ProfileProps> = ({ currentUser }) => {
  const name = currentUser?.name

  return (
    <Container>
      {currentUser && (
        <>
          <Avatar
            src="https://cataas.com/cat" // TODO: Placeholder
            alt={name}
            title={name?.charAt(0).toUpperCase()}
          />
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
