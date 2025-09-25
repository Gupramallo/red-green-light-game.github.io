import type { GameDataStore } from '@/shared/game-data-provider/types'

export type ProfileProps = Pick<GameDataStore, 'currentUser'>
