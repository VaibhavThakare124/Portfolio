import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'remixicon/fonts/remixicon.css'
import NavContext from './context/NavContext.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <NavContext>
            <App />
        </NavContext>
    </StrictMode>
)