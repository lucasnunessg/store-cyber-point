import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import MyHeader from './components/MyHeader.tsx';
import Login from './components/login.tsx';
import './index.css';

const Root = () => {
  const token = localStorage.getItem('token');

  const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return token ? <>{children}</> : <Navigate to="/login" />;
  };

  return (
    <Router>
      <MyHeader />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<PrivateRoute><ProductManagement /></PrivateRoute>} />
        <Route path="/" element={<PrivateRoute><App /></PrivateRoute>} />
      </Routes>
    </Router>
  );
};

const domNode = document.getElementById('root')!;
const root = createRoot(domNode);

root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);