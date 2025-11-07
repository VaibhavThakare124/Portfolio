import React from 'react'
import Home from './pages/Home'
import Navbar from './components/Navigation/Navbar'
import Cursor from './components/common/Cursor'
import FullScreenNav from './components/Navigation/FullScreenNav'
import MyInfo from './pages/MyInfo'

const App = () => {
  return (
    <div>
      <Navbar/>
      <FullScreenNav/>
      <Home/>
      <MyInfo/>
    </div>
  )
}

export default App
