import React from 'react';
import ReactDOM from 'react-dom/client';
import { UserApp } from './UserApp.jsx';
import './styles.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserApp />
    </BrowserRouter>
  </React.StrictMode>
);
