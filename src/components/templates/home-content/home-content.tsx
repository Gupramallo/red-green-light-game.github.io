import type React from 'react'
import { Button, Card, TextField, Typography } from '@mui/material'
import {
  CardContainer,
  Container,
  ImageContainer,
  Subtitle,
  TrafficImage,
} from './styles'
import type { HomeContentProps } from './types'

const HomeContent: React.FC<HomeContentProps> = ({
  titleLabel,
  subtitleLabel,
  userName,
  setUserName,
  onClick,
  textFieldLabel,
  buttonLabel,
}) => (
  <Container>
    <Card>
      <CardContainer>
        <ImageContainer>
          <TrafficImage src="/traffic-light.png" alt="Traffic Light" />
        </ImageContainer>
        <Typography variant="h5">{titleLabel}</Typography>
        <Subtitle variant="h6">{subtitleLabel}</Subtitle>
        <TextField
          label={textFieldLabel}
          fullWidth
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={onClick}
          disabled={!userName.trim()}
          fullWidth
        >
          {buttonLabel}
        </Button>
      </CardContainer>
    </Card>
  </Container>
)

export default HomeContent
