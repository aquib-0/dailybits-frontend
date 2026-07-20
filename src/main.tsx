import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { AuthProvider } from './context/AuthContext.tsx'
import { SidebarProvider } from './context/SidebarContext.tsx'
import { DraftProvider } from './context/DraftContext.tsx'

import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <DraftProvider>
          <SidebarProvider>
            <App />
          </SidebarProvider>
        </DraftProvider>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
