import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import MyHeader from './components/MyHeader.tsx'
import DarkMode from './components/darkMode.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MyHeader />
    <DarkMode />
    <App />
  </React.StrictMode>,
)
