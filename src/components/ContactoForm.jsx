import { useState, useEffect } from 'react';

export default function ContactoForm({ addContacto, contactoEditar, actualizarContacto }) {
  const [form, setForm] = useState({
    nombre: '', apellido: '', numero: '', apodos: '', foto: '', version: '1', notas: ''
  });

  // Carga los datos del contacto si se va a editar, o limpia el formulario si es uno nuevo
  useEffect(() => {
    if (contactoEditar) {
      setForm(contactoEditar);
    } else {
      setForm({ nombre: '', apellido: '', numero: '', apodos: '', foto: '', version: '1', notas: '' });
    }
  }, [contactoEditar]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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

        <input name="foto" value={form.foto} onChange={handleChange} placeholder="URL de la Foto (Opcional)" />
        
        <select name="version" value={form.version} onChange={handleChange}>
          <option value="1">Selecciona un Diseño... (Versión 1)</option>
          <option value="2">Versión 2</option>
          <option value="3">Versión 3</option>
          <option value="4">Versión 4</option>
        </select>
        
        
        <textarea name="notas" value={form.notas} onChange={handleChange} placeholder="Notas sobre el contacto..."></textarea>
        
        <button type="submit" className="btn-submit-form">
          {contactoEditar ? 'Guardar Cambios' : 'Guardar Contacto'}
        </button>
      </form>
    </div>
  );
}