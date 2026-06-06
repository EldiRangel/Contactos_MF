import { useState } from 'react';
import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';
import './App.css';

export default function App() {
  const [isLogged, setIsLogged] = useState(() => localStorage.getItem('sesion_activa') !== null);

  return isLogged ? (
    <Dashboard onLogout={() => setIsLogged(false)} />
  ) : (
    <Login onLoginSuccess={() => setIsLogged(true)} />
  );
}