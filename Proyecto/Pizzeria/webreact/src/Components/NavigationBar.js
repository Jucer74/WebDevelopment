import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { FaShoppingCart, FaSignInAlt } from "react-icons/fa";

function NavigatorBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const customStyle = {
    color: "#007a53", // Set the text and icon color to #007a53
  };

  const navbarStyle = {
    // Increase the width of the navbar (change the max-width value as needed)
    // maxWidth: "100%",
    margin: "0 auto", // Center the navbar horizontally
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3" style={navbarStyle}>
      <div className="container">
        <button
          className={`navbar-toggler ${isMobileMenuOpen ? 'collapsed' : ''}`}
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
          <a className="navbar-brand mx-auto" href="#">
            LOGO
          </a>
        )}
        <div className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#" style={customStyle}>
                Menu
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" style={customStyle}>
                Usuarios
              </a>
            </li>
          </ul>
        </div>
        <div className="text-right">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#" style={customStyle}>
                <FaShoppingCart /> Carrito
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" style={customStyle}>
                <FaSignInAlt /> Login
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavigatorBar;
