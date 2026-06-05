import React from 'react';
import ContactCard from '../ContactCard.jsx';

export default function Contactos({ listaContactos, deleteContacto, onView, onEdit }) {
  return (
    <div className="contactos-layout-wrapper">
      {listaContactos.length === 0 ? (
        <p className="no-data-msg">No se encontraron registros en la agenda.</p>
      ) : (
        <div className="google-list-container">
          {listaContactos.map(contacto => (
            <ContactCard 
              key={contacto.id} 
              contacto={contacto} 
              onDelete={deleteContacto} 
              onView={onView} 
              onEdit={onEdit} 
            />
          ))}
        </div>
      )}
    </div>
  );
}