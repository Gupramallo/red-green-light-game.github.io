import React, { useState } from 'react'
import HomeContent from '@/components/templates/home-content'
import { useGameDataContext } from '../../../shared/game-data-provider/context'

const HomePage: React.FC = () => {
  const { setCurrentUser } = useGameDataContext()
  const [userName, setUserName] = useState('')

  return (
    <HomeContent
      titleLabel="Red Green Light Game"
      subtitleLabel="Enter your name to start playing!"
      buttonLabel="Start Playing"
      textFieldLabel="Your Name"
      userName={userName}
      setUserName={setUserName}
      onClick={() => setCurrentUser(userName.trim())}
    />
  )
}

export default HomePage
