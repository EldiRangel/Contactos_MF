import React from 'react';
import ContactCard from '../ContactCard.jsx'; 

export default function Contactos({ listaContactos, deleteContacto, onView, onEdit, vistaCartas }) {
  return (
    
    <div className={`contactos-layout-wrapper layout-v${vistaCartas}`}>
      {listaContactos.length === 0 ? (
        <p className="no-data-msg" style={{padding: '20px', textAlign: 'center', color: '#666'}}>No se encontraron registros en la agenda.</p>
      ) : (
        <div className="google-list-container">
          {listaContactos.map(contacto => (
            <ContactCard 
              key={contacto.id} 
              contacto={contacto} 
              onDelete={deleteContacto} 
              onView={onView} 
              onEdit={onEdit} 
              vistaCartas={vistaCartas} 
            />
          ))}
        </div>
      )}
    </div>
  );
}