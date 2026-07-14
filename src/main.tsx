import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// Import LocaleProvider từ file i18n của bạn
import { LocaleProvider } from './content/i18n.tsx' 
import "flag-icons/css/flag-icons.min.css";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Bọc App vào đây để useLocale hoạt động */}
    <LocaleProvider>
      <App />
    </LocaleProvider>
  </React.StrictMode>,
)