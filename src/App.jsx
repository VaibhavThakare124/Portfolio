import React, { useState, useEffect } from 'react'
import Home from './pages/Home'
import Navbar from './components/Navigation/Navbar'
import Cursor from './components/common/Cursor'
import FullScreenNav from './components/Navigation/FullScreenNav'
import MyInfo from './pages/MyInfo'
import ScrollContainer from './hooks/ScrollContainer'
import Projects from './pages/Projects'
import Footer from './pages/footer'

const App = () => {
    const [locoScrollReady, setLocoScrollReady] = useState(false)

    useEffect(() => {
        // Wait for DOM/content to mount then enable scroll system
        const timeout = setTimeout(() => setLocoScrollReady(true), 100)
        return () => clearTimeout(timeout)
    }, [])

    return (
        <>
            {/* <Navbar /> */}
            <FullScreenNav />
            <Cursor />

            <ScrollContainer start={locoScrollReady}>
                <Home data-scroll-section />
                <MyInfo data-scroll-section />
                <Projects data-scroll-section />
                <Footer data-scroll-section />
            </ScrollContainer>
        </>
    )
}

export default App