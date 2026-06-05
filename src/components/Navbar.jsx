import React from 'react';

export default function Navbar({ onSearch, totalContactos, onOpenSidebar }) {
  return (
    <nav className="google-nav">
      <div className="google-nav-left">
      
        <button className="material-icon-btn" onClick={onOpenSidebar} title="Menú principal">
          &#9776;
        </button>
        <div className="google-nav-brand">
          <span className="brand-icon"></span>
          <h1 className="brand-title">MiAgenda</h1>
        </div>
      </div>

      <div className="google-nav-center">
        <div className="google-search-box">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Buscar contactos..." 
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="google-nav-right">
        <div className="google-user-profile" title="Perfil de Administrador">
          <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Admin Avatar" />
        </div>
      </div>
    </nav>
  );
}