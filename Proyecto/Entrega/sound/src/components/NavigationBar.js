import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Banner1 from "../icons/logo.png";

export function NavigationBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem("token");

    // Update component state
    setIsLoggedIn(false);

    // Redirect to the login page
    navigate("/Login");
  };

  return (
    <>
      <Navbar bg="dark" expand="lg">
        <Navbar.Brand
          as={Link}
          to="/Home"
          style={{ marginLeft: "10px" }}
          className="text-white "
        >
           <img
            className="d-block w-100"
            src={Banner1}
            alt="First slide"
            style={{ maxWidth: "200px", }}
          />
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="bg-secondary border-0"
        >
          <span className="navbar-toggler-icon "></span>
        </Navbar.Toggle>

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/Home" className="text-white">
              Inicio
            </Nav.Link>
            <Nav className="mr-auto">
              {isLoggedIn && (
                <>
                  <Nav.Link as={Link} to="/Users" className="text-white">
                    Usuarios
                  </Nav.Link>
                </>
              )}
            </Nav>
            <Nav.Link as={Link} to="/Contact" className="text-white">
              Contacto
            </Nav.Link>
            <Nav>
              {isLoggedIn ? (
                <>
                  <Nav.Link className="text-danger" onClick={handleLogout}>
                    Cerrar sesión
                  </Nav.Link>
                  <Navbar.Text className="mr-5 ms-2 text-white">
                    {localStorage.getItem("user")}
                  </Navbar.Text>
                </>
              ) : (
                <>
                  <Nav.Link className="text-success" as={Link} to="/Login">
                    Iniciar Sesión
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
