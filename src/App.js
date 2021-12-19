import './App.css';
import React from 'react';
import Rotas from './Routes';
import { AuthProvider } from './componentes/context/Auth';

function App() {
  return (
    <AuthProvider>
      <Rotas />
    </AuthProvider>
  );
};

export default App;
