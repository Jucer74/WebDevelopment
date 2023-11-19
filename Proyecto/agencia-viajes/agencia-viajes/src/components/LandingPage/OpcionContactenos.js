// OpcionContactenos.js
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Link } from 'react-router-dom'; // Asumiendo que estás utilizando React Router para la navegación

const OpcionContactenos = () => {
  return (
    <Link to="/contacto" className="opcion-contactenos"> {/* Utilizando React Router para la navegación */}
      Contactenos
    </Link>
  );
};

export default OpcionContactenos;
