import { useState, useEffect } from 'react';

export default function Login({ onLoginSuccess }) {
  const [isActive, setIsActive] = useState(false); //cambio de vistas

  
  useEffect(() => {
    const usuariosExistentes = localStorage.getItem('usuarios');
    if (!usuariosExistentes) {
      const cuentaAdmin = [{
        nombre: 'Administrador Principal',
        email: 'admin@correo.com',
        password: '1234',
        foto: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
      }];
      localStorage.setItem('usuarios', JSON.stringify(cuentaAdmin));
    }
  }, []);

  // PROCESO DE INICIO DE SESIÓN
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim().toLowerCase();
    const password = e.target.password.value;

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    
    // Buscar si el usuario existe y coincide la contraseña
    const usuarioEncontrado = usuarios.find(u => u.email === email && u.password === password);

    if (usuarioEncontrado) {
      // Guardar sesión  ativa en localStorage
      localStorage.setItem('sesion_activa', JSON.stringify(usuarioEncontrado));
      onLoginSuccess();
    } else {
      alert('Correo o contraseña incorrectos.');
    }
  };

  // PROCESO DE REGISTRO DE NUEVO USUARIO
  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    const nombre = e.target.nombre.value.trim();
    const email = e.target.email.value.trim().toLowerCase();
    const password = e.target.password.value;

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Validar si el correo ya existe
    const existe = usuarios.some(u => u.email === email);
    if (existe) {
      alert('Este correo electrónico ya está registrado.');
      return;
    }

    // Crear nuevo usuario
    const nuevoUsuario = {
      nombre,
      email,
      password,
      foto: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" // Foto por defecto
    };

    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    
    alert('¡Cuenta creada con éxito! Ahora puedes iniciar sesión.');
    setIsActive(false); // Cambiar la pestaña a "Iniciar Sesión"
    e.target.reset();
  };

  return (
    <div className="body-login">
      <div className={`container ${isActive ? 'active' : ''}`} id="container">
        
        
        <div className="form-container sign-up">
          <form onSubmit={handleSignUpSubmit}>
            <h1>Crear Cuenta</h1>
            <span>o usa tu correo para registrarte</span>
            <input type="text" name="nombre" placeholder="Nombre Completo" required />
            <input type="email" name="email" placeholder="Correo Electrónico" required />
            <input type="password" name="password" placeholder="Contraseña" required />
            <button type="submit">Registrarse</button>
          </form>
        </div>

        
        <div className="form-container sign-in">
          <form onSubmit={handleLoginSubmit}>
            <h1>Iniciar Sesion</h1>
            <span>ingresa tus credenciales de acceso</span>
            <input type="email" name="email" placeholder="Email (admin@correo.com)" required />
            <input type="password" name="password" placeholder="Password (1234)" required />
            <button type="submit">Ingresar</button>
          </form>
        </div>

        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>¡Bienvenido de vuelta!</h1>
              <p>Para mantenerte conectado, por favor inicia sesión con tus datos personales</p>
              <button className="hidden" onClick={() => setIsActive(false)}>Iniciar Sesión</button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>¡Hola, Amigo!</h1>
              <p>Registra tus datos personales para empezar a organizar tu agenda de contactos</p>
              <button className="hidden" onClick={() => setIsActive(true)}>Registrarse</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}