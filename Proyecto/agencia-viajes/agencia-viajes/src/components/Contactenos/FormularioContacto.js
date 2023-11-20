// FormularioContacto.js
import React, { useState } from 'react';

const FormularioContacto = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar el formulario
    console.log('Formulario enviado:', { nombre, email, mensaje });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="nombre" className="form-label">Nombre:</label>
        <input type="text" className="form-control" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email:</label>
        <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="mb-3">
        <label htmlFor="mensaje" className="form-label">Mensaje:</label>
        <textarea className="form-control" id="mensaje" rows="4" value={mensaje} onChange={(e) => setMensaje(e.target.value)}></textarea>
      </div>
      <button type="submit" className="btn btn-primary">Enviar</button>
    </form>
  );
};

export default FormularioContacto;
