import type React from 'react'
import { TRAFFIC_COLORS } from './constants'
import { Container, Light } from './styles'
import type { TrafficLightsProps } from './types'

const TrafficLight: React.FC<TrafficLightsProps> = ({ isGreenLight }) => (
  <Container>
    <Light isTrafficLightOn={!isGreenLight} color={TRAFFIC_COLORS.red} />
    <Light isTrafficLightOn={isGreenLight} color={TRAFFIC_COLORS.green} />
  </Container>
)

export default TrafficLight
