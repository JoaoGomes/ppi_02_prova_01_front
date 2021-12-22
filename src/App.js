import './App.css';
import React from 'react';
import Rotas from './Routes';
import { AuthProvider } from './Componentes/Context/Auth';

function App() {
  return (
    <AuthProvider>
      <Rotas />
    </AuthProvider>
  );
};

export default App;
