import { useState } from 'react';
import './App.css';

export default function App() {
  // Estados
  const [isLogged, setIsLogged] = useState(false);
  const [isActive, setIsActive] = useState(false); // Reemplaza al document.getElementById del JS original

  // Validación de inicio de sesión
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    
    // prueba de inicio de sesion 
    if (email === 'admin@correo.com' && password === '1234') {
      setIsLogged(true);
    } else {
      alert('Credenciales incorrectas. Usa admin@correo.com / 1234');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    alert('Registro exitoso. Ahora inicia sesión.');
    setIsActive(false); 
  };

  
  if (isLogged) {
    return (
      <div style={{ width: '100%', maxWidth: '800px' }}>
        <h2>Gestor de Contactos</h2>
        <button className="btn-logout" onClick={() => setIsLogged(false)}>Cerrar Sesión</button>
        <div className="dashboard-vacio">
          <h3>¡Acceso concedido!</h3>
          <p>Bienvenido.</p>
        </div>
      </div>
    );
  }

  
  return (
    <div className={`container ${isActive ? 'active' : ''}`} id="container">
      
      {/* PANEL DE REGISTRO */}
      <div className="form-container sign-up">
        <form onSubmit={handleRegister}>
          <h1>Create Account</h1>
          <div className="social-icons">
            <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
          </div>
          <span>or use your email for registration</span>
          <input type="text" placeholder="Name" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Sign Up</button>
        </form>
      </div>

      {/* PANEL*/}
      <div className="form-container sign-in">
        <form onSubmit={handleLogin}>
          <h1>Sign In</h1>
          <div className="social-icons">
            <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
          </div>
          <span>or use your email password</span>
          {/* atributo "name" para poder capturarlos en handleLogin */}
          <input type="email" name="email" placeholder="Email (admin@correo.com)" required />
          <input type="password" name="password" placeholder="Password (1234)" required />
          <a href="#">Forget Your Password?</a>
          <button type="submit">Sign In</button>
        </form>
      </div>

      {/* OVERLAY */}
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all of site features</p>
            {/* El botón cambia el estado isActive a false */}
            <button className="hidden" onClick={() => setIsActive(false)}>Sign In</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hello, Friend!</h1>
            <p>Register with your personal details to use all of site features</p>
            {/* El botón cambia el estado isActive a true */}
            <button className="hidden" onClick={() => setIsActive(true)}>Sign Up</button>
          </div>
        </div>
      </div>

    </div>
  );
}