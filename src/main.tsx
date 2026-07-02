import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { ShopProvider } from './context/ShopContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <ToastProvider>
        <ShopProvider>
          <App />
        </ShopProvider>
      </ToastProvider>
    </ThemeProvider>
  </React.StrictMode>
);

