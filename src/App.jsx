import { useState } from 'react';
import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';
import './App.css';

export default function App() {
  // Comprueba si hay una sesión guardada para no obligar a loguearse de nuevo al recargar
  const [isLogged, setIsLogged] = useState(() => {
    return localStorage.getItem('sesion_activa') !== null;
  });

  return (
    <>
      {isLogged ? (
        <Dashboard onLogout={() => setIsLogged(false)} />
      ) : (
        <Login onLoginSuccess={() => setIsLogged(true)} />
      )}
    </>
  );
}