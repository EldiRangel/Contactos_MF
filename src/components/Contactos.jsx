import ContactCard from '../ContactCard.jsx'; 
//importa las funciones del dashboard, recibe la lista de contactos, la funcion para eliminar un contacto, la funcion para ver los detalles de un contacto, la funcion para editar un contacto y la vista de las cartas
export default function Contactos({ listaContactos, deleteContacto, onView, onEdit, vistaCartas }) {
  // Si no hay contactos en la lista, muestra un mensaje indicando que no se encontraron registros
  if (listaContactos.length === 0) {
    return <p className="no-data-msg" style={{padding: '20px', textAlign: 'center', color: '#666'}}>No se encontraron registros en la agenda.</p>;
  }
// Si hay contactos en la lista, renderiza el contenedor de contactos y mapea cada contacto a un componente ContactCard, pasando las funciones necesarias como props
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