import React from 'react';

export default function ContactCard({ contacto, onDelete, onView, onEdit }) {
  const { id, nombre, apellido, numero, foto, notas, apodos } = contacto;
  const fotoPorDefecto = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

  return (
    <div className="google-contact-row" onClick={() => onView(contacto)}>
      {/* Columna Avatar */}
      <div className="google-col-avatar">
        <img src={foto || fotoPorDefecto} alt={nombre} />
      </div>

      {/* Columna Nombre completo y Apodo */}
      <div className="google-col-nombre">
        {nombre} {apellido} {apodos && <span style={{color: '#70757a', fontWeight: 'normal'}}> ({apodos})</span>}
      </div>

      {/* Columna Teléfono */}
      <div className="google-col-telefono">
        {numero}
      </div>

      {/* Columna Notas */}
      <div className="google-col-notas">
        {notas || <span style={{color: '#bcbcbc'}}>Sin notas</span>}
      </div>

      {/* Columna de Acciones de Fila */}
      <div className="google-col-actions" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => onEdit(contacto)} className="btn-google-action edit">Editar</button>
        <button onClick={() => onDelete(id)} className="btn-google-action delete">Borrar</button>
      </div>
    </div>
  );
}