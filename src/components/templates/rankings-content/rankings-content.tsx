import React from 'react'
import { Divider } from '@mui/material'
import LeaderboardTitle from '@/components/molecules/leaderboard-title'
import ListWrapper from '@/components/organisms/list-wrapper'
import Profile from '@/components/organisms/profile'
import {
  PersonIcon,
  PositionLabel,
  RankingsList,
  ScoreContainer,
} from './styles'
import type { RankingsContentProps } from './types'

const RankingsContent: React.FC<RankingsContentProps> = ({
  users = [],
  currentUser,
}) => (
  <ListWrapper
    hasContent={Boolean(users.length)}
    noContentIcon={<PersonIcon />}
    noContentText="No players yet"
    listHeader={<LeaderboardTitle label="Leaderboard" />}
  >
    {users.map(({ name, highScore }, index) => (
      <React.Fragment key={name}>
        <RankingsList index={index}>
          <Profile
            currentUser={{
              name: `${name} ${currentUser?.name === name ? '(You)' : ''}`,
              highScore,
              score: 0,
            }}
            profileSrc={
              currentUser?.name === name ? 'https://cataas.com/cat' : undefined
            }
          />
          <ScoreContainer>
            <PositionLabel variant="h5">{`#${index + 1}`}</PositionLabel>
          </ScoreContainer>
        </RankingsList>
        {index < users.length - 1 && <Divider />}
      </React.Fragment>
    ))}
  </ListWrapper>
)

export default RankingsContent
