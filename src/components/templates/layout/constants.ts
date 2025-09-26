import { Leaderboard, Logout, VideogameAsset } from '@mui/icons-material'
import { ROUTES } from '@/shared/routes'

export const HEADER_ICONS = [
  {
    id: 'game',
    route: ROUTES.game,
    icon: VideogameAsset,
    title: 'Back to game',
  },
  {
    id: 'rankings',
    route: ROUTES.rankings,
    icon: Leaderboard,
    title: 'Leaderboards',
  },
  {
    id: 'logout',
    route: ROUTES.home,
    icon: Logout,
    title: 'Logout',
  },
]
