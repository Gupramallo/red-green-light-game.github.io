import { createRef } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import AudioButton from '../audio-button'
import type { AudioButtonProps } from '../types'

const toggleAudio = vi.fn()
const defaultProps: AudioButtonProps = {
  audioRef: createRef<HTMLAudioElement>(),
  isPlayingAllowed: false,
  audioSrc: '/test-audio.mp3',
  toggleAudio,
}

describe('AudioButton', () => {
  it('should render audio element and button correctly', () => {
    render(<AudioButton {...defaultProps} />)

    const audioElement = screen.getByTestId('audio-test-id')
    const button = screen.getByRole('button')

    expect(audioElement).toBeInTheDocument()
    expect(audioElement).toHaveAttribute('src', '/test-audio.mp3')
    expect(screen.getByTestId('VolumeOffIcon')).toBeInTheDocument()
    expect(button).toBeInTheDocument()

    fireEvent.click(button)

    expect(toggleAudio).toHaveBeenCalled()
  })

  it('should render audio element without src when audioSrc is undefined', () => {
    render(<AudioButton {...defaultProps} audioSrc="" />)

    const audioElement = screen.getByTestId('audio-test-id')
    expect(audioElement).toBeInTheDocument()
    expect(audioElement).not.toHaveAttribute('src')
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByTestId('VolumeOffIcon')).toBeInTheDocument()
    expect(screen.queryByTestId('VolumeUpIcon')).not.toBeInTheDocument()
  })

  it('should volume up icon when isPlayingAllowed is true', () => {
    render(<AudioButton {...defaultProps} isPlayingAllowed />)

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByTestId('VolumeUpIcon')).toBeInTheDocument()
    expect(screen.queryByTestId('VolumeOffIcon')).not.toBeInTheDocument()
  })
})
