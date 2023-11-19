// MenuBar.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function MenuBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Agencia de Viajes</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#">Muestra Usuario Logeado</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Opción Maestro</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Opción Detalle</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Opción Contactenos</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default MenuBar;
