import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { STEP } from '@/shared/constants'
import StepButton from '../step-button'
import type { StepButtonProps } from '../types'

const onClick = vi.fn()
const defaultProps: StepButtonProps = {
  label: 'Test Step',
  onClick,
  direction: STEP.left,
}
describe('StepButton', () => {
  it('should render button with left direction', () => {
    render(<StepButton {...defaultProps} />)

    const button = screen.getByRole('button', { name: defaultProps.label })

    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('MuiButton-containedInfo')
    expect(screen.getByTestId('step-icon-left')).toBeInTheDocument()
    expect(screen.queryByTestId('step-icon-right')).not.toBeInTheDocument()

    fireEvent.click(button)

    expect(onClick).toHaveBeenCalled()
  })

  it('should render correctly with right direction', () => {
    render(<StepButton {...defaultProps} direction={STEP.right} />)

    const button = screen.getByRole('button', { name: defaultProps.label })

    expect(button).toBeInTheDocument()
    expect(screen.getByTestId('step-icon-right')).toBeInTheDocument()
    expect(screen.queryByTestId('step-icon-left')).not.toBeInTheDocument()
  })

  it('should render with different color if last step clicked is the same as the direction', () => {
    render(
      <StepButton
        {...defaultProps}
        direction={STEP.right}
        lastStepClicked={STEP.right}
      />
    )

    const button = screen.getByRole('button', { name: defaultProps.label })

    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('MuiButton-containedError')
  })
})
