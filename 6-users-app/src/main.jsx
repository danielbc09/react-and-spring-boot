import React from 'react';
import ReactDOM from 'react-dom/client';
import { UserApp } from './UserApp.jsx';
import './styles.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './auth/context/AuthProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UserApp />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
