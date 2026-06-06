import { useState, useEffect } from 'react';
import Navbar from './Navbar.jsx';
import ContactoForm from './ContactoForm.jsx';
import Contactos from './Contactos.jsx';
// URL de la foto por defecto para contactos y usuarios sin imagen personalizada
const fotoPorDefecto = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
const AVATARES = [
  fotoPorDefecto, 
  "/img/avatar1.jpg", 
  "/img/avatar2.jpg", 
  "/img/avatar3.jpg", 
  "/img/avatar4.jpg", 
  "/img/avatar5.jpg", 
  "/img/avatar6.webp", 
  "/img/avatar7.jpg"
];

export default function Dashboard({ onLogout }) {
  // Obtener la información del usuario en sesión o asignar valores anónimos por defecto
  const usuarioSesion = JSON.parse(localStorage.getItem('sesion_activa')) || {
    nombre: 'Usuario Demo',
    email: 'anonimo@correo.com',
    foto: fotoPorDefecto
  };

  const STORAGE_KEY_CONTACTOS = `contactos_v2_${usuarioSesion.email}`;

  // Cargar contactos iniciales desde localStorage específicos del usuario
  const [listaContactos, setListaContactos] = useState(() => {
    const guardados = localStorage.getItem(STORAGE_KEY_CONTACTOS);
    return guardados ? JSON.parse(guardados) : [];
  });

  const [contactoEditar, setContactoEditar] = useState(null);
  const [contactoActivo, setContactoActivo] = useState(null);
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [vistaActiva, setVistaActiva] = useState('ver'); 
  const [temaGlobal, setTemaGlobal] = useState('tema-light');
  const [fotoUsuario, setFotoUsuario] = useState(usuarioSesion.foto || fotoPorDefecto);
  const [vistaCartas, setVistaCartas] = useState('1');

  // Guardar automáticamente los contactos en localStorage al mutar la lista
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_CONTACTOS, JSON.stringify(listaContactos));
  }, [listaContactos, STORAGE_KEY_CONTACTOS]);

  // Sincronizar el cambio de foto de perfil en la lista global de usuarios y sesión activa
  useEffect(() => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuariosActualizados = usuarios.map(u => 
      u.email === usuarioSesion.email ? { ...u, foto: fotoUsuario } : u
    );
    localStorage.setItem('usuarios', JSON.stringify(usuariosActualizados));
    localStorage.setItem('sesion_activa', JSON.stringify({ ...usuarioSesion, foto: fotoUsuario }));
  }, [fotoUsuario]);

  const addContacto = (nuevo) => {
    setListaContactos([...listaContactos, { ...nuevo, id: Date.now() }]);
    setVistaActiva('ver');
  };

  const deleteContacto = (id) => {
    setListaContactos(listaContactos.filter(c => c.id !== id));
    if (contactoEditar?.id === id) setContactoEditar(null);
  };

  const enviarAEdicion = (contacto) => {
    setContactoEditar(contacto);
    setVistaActiva('crear');
  };

  const handleCerrarSesion = () => {
    localStorage.removeItem('sesion_activa');
    onLogout();
  };

  const contactosFiltrados = listaContactos.filter(c => {
    const termino = terminoBusqueda.toLowerCase();
    return (
      c.nombre.toLowerCase().includes(termino) ||
      c.apellido.toLowerCase().includes(termino) ||
      c.numero.toLowerCase().includes(termino) ||
      c.notas?.toLowerCase().includes(termino)
    );
  });

  return (
    <div className={`google-layout-container ${temaGlobal}`}>
      
      <Navbar 
        onSearch={setTerminoBusqueda} 
        onOpenSidebar={() => setSidebarOpen(!sidebarOpen)} 
        userFoto={fotoUsuario}
        vistaCartas={vistaCartas}
        setVistaCartas={setVistaCartas}
      />
// barra lateral
      <div className="google-main-body">
        
        <aside className={`google-sidebar ${sidebarOpen ? 'sidebar-visible' : 'sidebar-hidden'}`}>
          <div className="sidebar-links">
            <button 
              className={`sidebar-tab ${vistaActiva === 'ver' ? 'tab-active' : ''}`}
              onClick={() => setVistaActiva('ver')}
            >
               <span className="tab-text">Contactos ({listaContactos.length})</span>
            </button>

            <button 
              className={`sidebar-tab ${vistaActiva === 'crear' ? 'tab-active' : ''}`}
              onClick={() => { setVistaActiva('crear'); setContactoEditar(null); }}
            >
               <span className="tab-text">Crear contacto</span>
            </button>

            <button 
              className={`sidebar-tab ${vistaActiva === 'perfil' ? 'tab-active' : ''}`}
              onClick={() => setVistaActiva('perfil')}
            >
               <span className="tab-text">Mi Perfil</span>
            </button>

            <button 
              className={`sidebar-tab ${vistaActiva === 'temas' ? 'tab-active' : ''}`}
              onClick={() => setVistaActiva('temas')}
            >
               <span className="tab-text">Cambiar Tema</span>
            </button>
          </div>

          <div className="sidebar-footer">
            <button className="sidebar-tab btn-logout-tab" onClick={handleCerrarSesion}>
               <span className="tab-text">Cerrar Sesion</span>
            </button>
          </div>
        </aside>

        <main className="google-content-area">
          
          {vistaActiva === 'ver' && (
            <div className="google-view-card">
              {contactosFiltrados.length > 0 && vistaCartas === '1' && (
                <div className="google-table-header">
                  <div className="col-h-avatar"></div>
                  <div className="col-h-nombre">Nombre y Apellido</div>
                  <div className="col-h-telefono">Número de Teléfono</div>
                  <div className="col-h-notas">Notas</div>
                  <div className="col-h-actions"></div>
                </div>
              )}
              <Contactos 
                listaContactos={contactosFiltrados}
                deleteContacto={deleteContacto}
                onView={setContactoActivo}
                onEdit={enviarAEdicion}
                vistaCartas={vistaCartas}
              />
            </div>
          )}

          {vistaActiva === 'crear' && (
            <div className="google-center-form-box">
              <ContactoForm 
                addContacto={addContacto} 
                contactoEditar={contactoEditar}
                actualizarContacto={(id, form) => {
                  setListaContactos(listaContactos.map(c => c.id === id ? { ...form, id } : c));
                  setContactoEditar(null);
                  setVistaActiva('ver');
                }} 
              />
            </div>
          )}

          {vistaActiva === 'perfil' && (
            <div className="google-center-form-box material-profile-panel">
              <h2>Mi Perfil</h2>
              <div className="profile-card-body">
                <img src={fotoUsuario} alt="User" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }} />
                <h3>{usuarioSesion.nombre}</h3>
                <p>{usuarioSesion.email}</p>
                <span className="badge-role">Miembro</span>
              </div>

              //foto de perfil
              <div className="avatar-selector-container" style={{ marginTop: '30px' }}>
                <p style={{ textAlign: 'center', width: '100%' }}>Cambiar foto de perfil:</p>
                <div className="avatar-grid" style={{ justifyContent: 'center', marginTop: '15px' }}>
                  {AVATARES.map((avatar, index) => (
                    <img 
                      key={index} 
                      src={avatar} 
                      alt={`Avatar ${index}`}
                      className={`avatar-option ${fotoUsuario === avatar ? 'selected' : ''}`}
                      onClick={() => setFotoUsuario(avatar)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
             //temas
          {vistaActiva === 'temas' && (
            <div className="google-center-form-box">
              <h2>Temas</h2>
              <p className="subtitle">Selecciona la paleta estructural de fondo para el panel:</p>
              <div className="material-themes-list">
                {[
                  { id: 'tema-light', class: 'preview-l', name: 'Gris Claro ' },
                  { id: 'tema-dark', class: 'preview-d', name: 'Noche ' },
                  { id: 'tema-warm', class: 'preview-w', name: ' Cálido' },
                  { id: 'tema-tech', class: 'preview-t', name: 'Azul' }
                ].map(tema => (
                  <div key={tema.id} className="theme-row-item" onClick={() => setTemaGlobal(tema.id)}>
                    <div className={`color-preview ${tema.class}`}></div> <span>{tema.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
// Si hay un contacto activo seleccionado para ver detalles, se muestra un modal con la información completa del contacto. El modal se cierra al hacer clic fuera del contenido o en el botón de cerrar.
      {contactoActivo && (
        <div className="modal-overlay" onClick={() => setContactoActivo(null)}>
          <div className="modal-content material-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-actions">
              <button className="modal-close-btn" onClick={() => setContactoActivo(null)}>✕</button>
            </div>
            <div className="modal-profile-header">
              <img src={contactoActivo.foto || fotoPorDefecto} alt="Avatar" />
              <h2>{contactoActivo.nombre} {contactoActivo.apellido}</h2>
              {contactoActivo.apodos && <span className="modal-nickname">"{contactoActivo.apodos}"</span>}
            </div>
            <hr className="divider" />
            <div className="modal-body-details">
              <div className="detail-item">
                <div>
                  <p className="detail-label">Telefono movil</p>
                  <p className="detail-value">{contactoActivo.numero}</p>
                </div>
              </div>
              <div className="detail-item">
                <div>
                  <p className="detail-label">Notas y apuntes</p>
                  <p className="detail-value notes-text">{contactoActivo.notes || "Sin descripcion."}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}