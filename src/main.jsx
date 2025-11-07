import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'remixicon/fonts/remixicon.css'
import Cursor from './components/common/Cursor.jsx'
import NavContext from './context/NavContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NavContext>
      <Cursor/>
      <App />
    </NavContext>
  </StrictMode>,
)
