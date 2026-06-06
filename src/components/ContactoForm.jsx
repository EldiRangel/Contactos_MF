import { useState, useEffect } from 'react';

const fotoPorDefecto = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
// Lista de avatares predeterminados para seleccionar al crear o editar un contacto
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
// Componente de formulario para crear o editar un contacto, recibe funciones para agregar o actualizar contactos y el contacto a editar (si aplica)
export default function ContactoForm({ addContacto, contactoEditar, actualizarContacto }) {
  
  const [form, setForm] = useState({
    nombre: '', apellido: '', numero: '', apodos: '', foto: fotoPorDefecto, notas: ''
  });
  
  useEffect(() => {
    if (contactoEditar) {
      setForm(contactoEditar);
    } else {
      setForm({ nombre: '', apellido: '', numero: '', apodos: '', foto: fotoPorDefecto, notas: '' });
    }
  }, [contactoEditar]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFotoSelect = (imgUrl) => {
    setForm({ ...form, foto: imgUrl });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (contactoEditar) {
      actualizarContacto(contactoEditar.id, form);
    } else {
      addContacto(form);
    }
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit} className="form-contacto">
        <h2>{contactoEditar ? 'Modificar Contacto' : 'Nuevo Contacto'}</h2>
        
        <div className="form-row">
          <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" required />
          <input name="apellido" value={form.apellido} onChange={handleChange} placeholder="Apellido" required />
        </div>

        <div className="form-row">
          <input name="numero" value={form.numero} onChange={handleChange} placeholder="Número de Teléfono" required />
          <input name="apodos" value={form.apodos} onChange={handleChange} placeholder="Apodo (Opcional)" />
        </div>

        <div className="avatar-selector-container">
          <p>Selecciona un avatar predeterminado:</p>
          <div className="avatar-grid">
            {AVATARES.map((avatar, index) => (
              <img 
                key={index} 
                src={avatar} 
                alt={`Avatar ${index}`}
                className={`avatar-option ${form.foto === avatar ? 'selected' : ''}`}
                onClick={() => handleFotoSelect(avatar)}
              />
            ))}
          </div>
        </div>
        
        
        
        <textarea name="notas" value={form.notas} onChange={handleChange} placeholder="Notas sobre el contacto..."></textarea>
        
        <button type="submit" className="btn-submit-form">
          {contactoEditar ? 'Guardar Cambios' : 'Guardar en Contactos'}
        </button>
      </form>
    </div>
  );
}