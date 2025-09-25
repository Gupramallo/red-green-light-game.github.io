import { TRAFFIC_COLOR_ACTIONS, TRAFFIC_COLORS } from './constants'
import type { TrafficAction, TrafficColor } from './types'

export const trafficReducer = (
  state: TrafficColor,
  action: TrafficAction
): TrafficColor => {
  switch (action.type) {
    case TRAFFIC_COLOR_ACTIONS.switchToRed:
      return TRAFFIC_COLORS.red
    case TRAFFIC_COLOR_ACTIONS.switchToGreen:
      return TRAFFIC_COLORS.green
    default:
      return state
  }
}
