// Contact.js
import React from 'react';

export const Contact = () => {
  return (
    <div className="bg-dark d-flex flex-column align-items-start justify-content-center text-center" style={{ height: '70vh' }}>
      {/* Formulario de contacto */}
      <div className="container mt-5">
        <div className="row justify-content-start">
          <div className="col-md-6">
            <h2 className="mb-4 text-white">Formulario de Contacto</h2>
            <form>
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label text-black text-start text-white">
                  Nombre
                </label>
                <input type="text" className="form-control" id="nombre" name="nombre" required />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label text-white">
                  Correo Electrónico
                </label>
                <input type="email" className="form-control" id="email" name="email" required />
              </div>
              <div className="mb-3">
                <label htmlFor="mensaje" className="form-label text-white">
                  Mensaje
                </label>
                <textarea className="form-control" id="mensaje" name="mensaje" rows="4" required></textarea>
              </div>
              <button type="submit" className="btn btn-success text-white">
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

