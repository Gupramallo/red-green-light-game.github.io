import { Leaderboard, VideogameAsset } from '@mui/icons-material'
import { vi } from 'vitest'
import type { HeaderIcons } from '../types'

export const headerIcons: HeaderIcons[] = [
  {
    icon: Leaderboard,
    title: 'First Icon',
    onClick: vi.fn(),
    id: 'icon-1',
  },
  {
    icon: VideogameAsset,
    title: 'Second Icon',
    onClick: vi.fn(),
    id: 'icon-2',
  },
]
