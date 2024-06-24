import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx'
import MyHeader from './components/MyHeader.tsx'
import './index.css'
import MyFooter from './components/Footer.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <MyHeader />
    <App />
    <MyFooter />
    </BrowserRouter>
  </React.StrictMode>,
)
