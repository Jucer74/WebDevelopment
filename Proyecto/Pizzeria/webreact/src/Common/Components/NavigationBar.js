import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { FaShoppingCart, FaSignInAlt, FaUser } from "react-icons/fa";
import LogoPizza from "../../Assets/Images/LogoPizza.png";

function NavigatorBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const customStyle = {
    color: "#007a53",
  };

  const navbarStyle = {
    margin: "0 auto",
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light mb-3"
      style={navbarStyle}
    >
      <div className="container">
        <button
          className={`navbar-toggler ${isMobileMenuOpen ? "collapsed" : ""}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation"
          onClick={handleMobileMenuToggle}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {!isMobileMenuOpen && (
          <a className="navbar-brand mx-auto" href="/">
            <img src={LogoPizza} alt="Logo" style={{ width: "120px", marginRight: "15px" }} />
          </a>
        )}

        <div
          className={`collapse navbar-collapse ${
            isMobileMenuOpen ? "show" : ""
          }`}
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/MenuPage" style={customStyle}>
                Menu
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/UserPage" style={customStyle}>
                Productos
              </a>
            </li>
            {/* Mueve "Carrito" y "Registro" al menú hamburguesa */}
          </ul>
        </div>
        <div className="text-right">
          <ul className="navbar-nav">
            {/* Agrega el botón de inicio de sesión con el icono de usuario */}
            <li className="nav-item">
              <a className="nav-link" href="/CarritoPage" style={customStyle}>
                <FaShoppingCart /> Carrito
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/RegisterPage" style={customStyle}>
                <FaSignInAlt /> Registro
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/LoginPage" style={customStyle}>
                <FaUser /> Iniciar Sesión
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavigatorBar;
