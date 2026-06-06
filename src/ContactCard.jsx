import React from 'react';

export default function ContactCard({ contacto, onDelete, onView, onEdit, vistaCartas }) {
  
  const { id, nombre, apellido, numero, foto, notas, apodos } = contacto; 
  const fotoPorDefecto = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

  if (vistaCartas === '1') {
    return (
      <div className="google-contact-row" onClick={() => onView(contacto)}>
        <div className="google-col-avatar">
          <img src={foto || fotoPorDefecto} alt={nombre} />
        </div>
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
        <img src={foto || fotoPorDefecto} alt={nombre} />
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
          <img src={foto || fotoPorDefecto} alt={nombre} />
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
        <img src={foto || fotoPorDefecto} alt={nombre} />
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