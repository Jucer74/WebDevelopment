// MuestraUsuarioLogeado.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const MuestraUsuarioLogeado = ({ usuario }) => {
  return (
    <div className="muestra-usuario-logeado">
      {usuario ? (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Bienvenido, {usuario.nombre}</h5>
            <p className="card-text">Email: {usuario.email}</p>
            {/* Otros detalles del usuario según tus necesidades */}
          </div>
        </div>
      ) : (
        <div className="alert alert-warning" role="alert">
          No hay usuario logeado.
        </div>
      )}
    </div>
  );
};

export default MuestraUsuarioLogeado;
