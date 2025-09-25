export const MAXIMUM_GREEN_LIGHT_INTERVAL_DURATION = 10000

export const MINIMUM_GREEN_LIGHT_INTERVAL_DURATION = 2000

export const RED_LIGHT_DURATION = 3000

export const SCORE_TIME_DECREASE_MULTIPLIER = 100

export const RANDOM_VARIATION_RANGE = 3000

export const TRAFFIC_COLOR_ACTIONS = {
  switchToGreen: 'SWITCH_TO_GREEN',
  switchToRed: 'SWITCH_TO_RED',
} as const

export const TRAFFIC_COLORS = {
  green: 'green',
  red: 'red',
} as const

export const INITIAL_STATE = TRAFFIC_COLORS.green
