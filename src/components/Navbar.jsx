export default function Navbar({ onSearch, onOpenSidebar, userFoto, vistaCartas, setVistaCartas }) {
  return (
    <nav className="google-nav">
      <div className="google-nav-left">
        <button className="material-icon-btn" onClick={onOpenSidebar} title="Menú principal">&#9776;</button>
        <div className="google-nav-brand">
          <h1 className="brand-title">MiAgenda</h1>
        </div>
      </div>

      <div className="google-nav-center">
        <div className="google-search-box">
          <input 
            type="text" 
            placeholder="Buscar contactos..." 
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="google-nav-right" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div className="view-selector-container" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label htmlFor="vista-global" style={{ fontSize: '14px', fontWeight: '500' }}>Vistas:</label>
          <select 
            id="vista-global" 
            value={vistaCartas} 
            onChange={(e) => setVistaCartas(e.target.value)}
            style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #dadce0', backgroundColor: 'transparent', cursor: 'pointer', outline: 'none' }}
          >
            <option value="1" style={{ color: '#000' }}>Lista Estándar</option>
            <option value="2" style={{ color: '#000' }}>Tarjetas Compactas</option>
            <option value="3" style={{ color: '#000' }}>Tarjetas Divididas</option>
            <option value="4" style={{ color: '#000' }}>Tarjetas Modernas</option>
          </select>
        </div>
        <div className="google-user-profile">
          <img src={userFoto} alt="Avatar" />
        </div>
      </div>
    </nav>
  );
}