import React from 'react'
import Home from './pages/Home'
import Navbar from './components/Navigation/Navbar'
import Cursor from './components/common/Cursor'
import FullScreenNav from './components/Navigation/FullScreenNav'
import MyInfo from './pages/MyInfo'
import ScrollContainer from './hooks/ScrollContainer'
import Projects from './pages/Projects'
import MyInfoBottom from './components/myinfo/MyInfoBottom'
import Footer from './pages/footer'

const App = () => {
  return (
    <>
        <Navbar/>
        <FullScreenNav/>
        <Home/>
        <MyInfo/>
        <Projects/>
        <Footer/>
        {/* <MyInfoBottom/> */}
    </>
    // <ScrollContainer>
       
    // </ScrollContainer>
    
     
    
  )
}

export default App
