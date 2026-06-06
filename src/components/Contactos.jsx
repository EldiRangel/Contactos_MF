import ContactCard from '../ContactCard.jsx'; 

export default function Contactos({ listaContactos, deleteContacto, onView, onEdit, vistaCartas }) {
  if (listaContactos.length === 0) {
    return <p className="no-data-msg" style={{padding: '20px', textAlign: 'center', color: '#666'}}>No se encontraron registros en la agenda.</p>;
  }

  return (
    <div className={`contactos-layout-wrapper layout-v${vistaCartas}`}>
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
    </div>
  );
}