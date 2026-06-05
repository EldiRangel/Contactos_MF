import { useState } from 'react';

export default function Login({ onLoginSuccess }) {
  const [isActive, setIsActive] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Validacion de credenciales
    if (email === 'admin@correo.com' && password === '1234') {
      onLoginSuccess();
    } else {
      alert('Credenciales incorrectas.');
    }
  };

  return (
    <div className="body-login">
      <div className={`container ${isActive ? 'active' : ''}`} id="container">
        {/* Formulario de registro */}
        <div className="form-container sign-up">
          <form onSubmit={(e) => { e.preventDefault(); setIsActive(false); }}>
            <h1>Create Account</h1>
            <span>or use your email for registration</span>
            <input type="text" placeholder="Name" required />
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button type="submit">Sign Up</button>
          </form>
        </div>

        {/* Formulario de login */}
        <div className="form-container sign-in">
          <form onSubmit={handleLoginSubmit}>
            <h1>Sign In</h1>
            <span>or use your email password</span>
            <input type="email" name="email" placeholder="Email (admin@correo.com)" required />
            <input type="password" name="password" placeholder="Password (1234)" required />
            <button type="submit">Sign In</button>
          </form>
        </div>

        {/* paneles deslizantes */}
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              <button className="hidden" onClick={() => setIsActive(false)}>Sign In</button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>Register with your personal details to use all of site features</p>
              <button className="hidden" onClick={() => setIsActive(true)}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}