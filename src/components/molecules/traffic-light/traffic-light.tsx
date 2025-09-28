import type React from 'react'
import { TRAFFIC_COLORS } from './constants'
import { Container, Light } from './styles'
import type { TrafficLightsProps } from './types'

const TrafficLight: React.FC<TrafficLightsProps> = ({ isGreenLight }) => (
  <Container>
    <Light
      data-testid="traffic-red-light"
      isTrafficLightOn={!isGreenLight}
      color={TRAFFIC_COLORS.red}
    />
    <Light
      data-testid="traffic-green-light"
      isTrafficLightOn={isGreenLight}
      color={TRAFFIC_COLORS.green}
    />
  </Container>
)

export default TrafficLight
