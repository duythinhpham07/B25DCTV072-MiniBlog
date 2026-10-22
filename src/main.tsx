import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@fontsource-variable/phudu'
import '@fontsource/be-vietnam-pro/400.css'
import '@fontsource/be-vietnam-pro/400-italic.css'
import '@fontsource/be-vietnam-pro/600.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
