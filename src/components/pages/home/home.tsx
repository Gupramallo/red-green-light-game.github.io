import React, { useState } from 'react'
import { Typography, TextField, Button, Box, Paper } from '@mui/material'
import { useGameDataContext } from '../../../shared/game-data-provider/context'

const Home: React.FC = () => {
  const { setCurrentUser } = useGameDataContext()
  const [userName, setUserName] = useState('')

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
      <Typography variant="h3" component="h1">
        Red Green Light Game
      </Typography>
      <Typography variant="h6" color="text.secondary">
        Enter your name to start playing!
      </Typography>

      <Paper elevation={3} sx={{ p: 3, minWidth: 300 }}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Your Name"
            variant="outlined"
            fullWidth
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => setCurrentUser(userName.trim())}
            disabled={!userName.trim()}
          >
            Start Playing
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}

export default Home
