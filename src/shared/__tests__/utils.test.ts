import { afterEach, describe, expect, it, vi } from 'vitest'
import { vibrateMobileDevice } from '../utils'

describe('vibrateMobileDevice', () => {
  afterEach(() => {
    vi.clearAllMocks()
    vi.unstubAllGlobals()
  })

  it('should call navigator.vibrate with correct duration', () => {
    const mockVibrate = vi.fn()
    vi.stubGlobal('navigator', { vibrate: mockVibrate })

    vibrateMobileDevice()

    expect(mockVibrate).toHaveBeenCalledWith([200])
    expect(mockVibrate).toHaveBeenCalledOnce()
  })
})
