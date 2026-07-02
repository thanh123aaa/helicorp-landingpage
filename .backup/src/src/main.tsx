import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './context/ThemeContext.tsx'
import { ShopProvider } from './context/ShopContext.tsx'
import { ToastProvider } from './context/ToastContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <ShopProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </ShopProvider>
    </ThemeProvider>
  </StrictMode>,
)
