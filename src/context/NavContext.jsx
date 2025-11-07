import React, { createContext, useEffect, useState } from 'react'
// import { useLocation } from 'react-router-dom'

export const NavbarContext = createContext()

const NavContext = ({ children }) => {

    const [navOpen, setNavOpen] = useState(false)

   
    return (
        <div>
            <NavbarContext.Provider value={[navOpen, setNavOpen]}>
                    {children}
            </NavbarContext.Provider>
        </div>
    )
}

export default NavContext