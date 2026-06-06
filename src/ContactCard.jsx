// Componente que representa una tarjeta de contacto, recibe el contacto a mostrar, funciones para eliminar, ver y editar el contacto, y la vista actual para renderizar diferentes estilos de tarjeta
export default function ContactCard({ contacto, onDelete, onView, onEdit, vistaCartas }) {
  const { id, nombre, apellido, numero, foto, notas, apodos } = contacto; 
  const fotoPorDefecto = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
  const avatar = foto || fotoPorDefecto;
// Dependiendo del valor de vistaCartas, se renderiza un estilo diferente de tarjeta para el contacto. Cada tarjeta muestra la información básica del contacto (nombre, número, etc.) y tiene botones para editar o eliminar el contacto, que llaman a las funciones onEdit y onDelete respectivamente. Al hacer clic en la tarjeta (excepto en los botones), se llama a la función onView para mostrar los detalles del contacto.
  if (vistaCartas === '1') {
    return (
      <div className="google-contact-row" onClick={() => onView(contacto)}>
        <div className="google-col-avatar"><img src={avatar} alt={nombre} /></div>
        <div className="google-col-nombre">
          {nombre} {apellido} {apodos && <span style={{color: '#70757a', fontWeight: 'normal'}}> ({apodos})</span>}
        </div>
        <div className="google-col-telefono">{numero}</div>
        <div className="google-col-notas">{notas || <span style={{color: '#bcbcbc'}}>Sin notas</span>}</div>
        <div className="google-col-actions" onClick={(e) => e.stopPropagation()}>
          <button onClick={() => onEdit(contacto)} className="btn-google-action edit">Editar</button>
          <button onClick={() => onDelete(id)} className="btn-google-action delete">Borrar</button>
        </div>
      </div>
    );
  }

  if (vistaCartas === '2') {
    return (
      <div className="card-version-2" onClick={() => onView(contacto)}>
        <img src={avatar} alt={nombre} />
        <h3>{nombre} {apellido}</h3>
        <p className="tel">{numero}</p>
        <div className="card-actions" onClick={(e) => e.stopPropagation()}>
          <button onClick={() => onEdit(contacto)}>Editar</button>
          <button className="del" onClick={() => onDelete(id)}>Borrar</button>
        </div>
      </div>
    );
  }

  if (vistaCartas === '3') {
    return (
      <div className="card-version-3" onClick={() => onView(contacto)}>
        <div className="v3-left">
          <img src={avatar} alt={nombre} />
          <div>
            <h3>{nombre} {apellido}</h3>
            <p>{numero}</p>
          </div>
        </div>
        <div className="v3-right" onClick={(e) => e.stopPropagation()}>
          <button onClick={() => onEdit(contacto)}>Editar</button>
          <button className="del" onClick={() => onDelete(id)}>Borrar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="card-version-4" onClick={() => onView(contacto)}>
      <div className="v4-header">
        <img src={avatar} alt={nombre} />
        <span>{apodos || 'Contacto'}</span>
      </div>
      <div className="v4-body">
        <h3>{nombre} {apellido}</h3>
        <p>{numero}</p>
      </div>
      <div className="v4-footer" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => onEdit(contacto)}>Modificar</button>
        <button onClick={() => onDelete(id)}>Eliminar</button>
      </div>
    </div>
  );
}