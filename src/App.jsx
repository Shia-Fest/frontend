import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LeaderBoardTable from './components/LeaderboardTable'
import LeaderboardTablePage from './pages/LeaderboardsPage'
function App() {

  return (
    <div className="bg-[#039d67] min-h-screen flex items-center justify-center noise-container">
      <div className=' shadow'>
      </div>
      <LeaderboardTablePage />
    </div>
  )
}

export default App
