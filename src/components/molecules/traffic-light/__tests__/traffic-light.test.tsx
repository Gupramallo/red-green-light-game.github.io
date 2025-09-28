import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderWithTheme } from '@/test/render-with-theme'
import TrafficLight from '../traffic-light'

describe('TrafficLight', () => {
  it('should render both traffic lights', () => {
    renderWithTheme(<TrafficLight />)

    expect(screen.getByTestId('traffic-red-light')).toBeInTheDocument()
    expect(screen.getByTestId('traffic-green-light')).toBeInTheDocument()
  })

  it('should have red light turned on when isGreenLight is false', () => {
    renderWithTheme(<TrafficLight isGreenLight={false} />)

    const redLight = screen.getByTestId('traffic-red-light')
    const greenLight = screen.getByTestId('traffic-green-light')

    expect(redLight).toHaveStyle('opacity: 1')
    expect(greenLight).toHaveStyle('opacity: 0.1')
  })

  it('should have green light turned on when isGreenLight is true', () => {
    renderWithTheme(<TrafficLight isGreenLight />)

    const redLight = screen.getByTestId('traffic-red-light')
    const greenLight = screen.getByTestId('traffic-green-light')

    expect(redLight).toHaveStyle('opacity: 0.1')
    expect(greenLight).toHaveStyle('opacity: 1')
  })
})
