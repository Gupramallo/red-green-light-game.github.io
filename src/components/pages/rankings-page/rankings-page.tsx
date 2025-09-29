import React, { useMemo } from 'react'
import RankingsContent from '@/components/templates/rankings-content'
import { useGameDataContext } from '@/shared/game-data-provider/context'

const RankingsPage: React.FC = () => {
  const { usersScores, currentUser } = useGameDataContext()

  const sortedUsers = useMemo(
    () => [...usersScores].sort((a, b) => b.highScore - a.highScore),
    [usersScores]
  )

  return <RankingsContent users={sortedUsers} currentUser={currentUser} />
}

export default RankingsPage
