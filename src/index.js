import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import WebRoutes from './pages/Routes/index';
import { AuthProvider } from './componentes/context/Auth';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <WebRoutes />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
