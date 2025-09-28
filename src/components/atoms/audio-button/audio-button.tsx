import type React from 'react'
import { VolumeOff, VolumeUp } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'
import type { AudioButtonProps } from './types'

const AudioButton: React.FC<AudioButtonProps> = ({
  audioRef,
  audioSrc,
  toggleAudio,
  isPlayingAllowed,
}) => (
  <Box>
    <audio ref={audioRef} src={audioSrc}></audio>
    <IconButton onClick={toggleAudio}>
      {isPlayingAllowed ? <VolumeUp /> : <VolumeOff />}
    </IconButton>
  </Box>
)

export default AudioButton
