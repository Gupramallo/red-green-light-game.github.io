import type { TRAFFIC_COLOR_ACTIONS, TRAFFIC_COLORS } from './constants'

export type TrafficColor = keyof typeof TRAFFIC_COLORS

export type TrafficAction = {
  type: (typeof TRAFFIC_COLOR_ACTIONS)[keyof typeof TRAFFIC_COLOR_ACTIONS]
}
