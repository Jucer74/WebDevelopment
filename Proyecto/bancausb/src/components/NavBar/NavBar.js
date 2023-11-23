import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './NavBar.css';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';

export const NavBar = () => {


  const auth = useSelector((state) => state.auth)


  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Navbar expand="md" bg="white" variant="light" className="px-4 shadow-sm">
      <Navbar.Brand as={Link} to="/home" className="d-flex align-items-center">
        <div className="col-4 col-md-auto px-3">
          <img src="/img/Logo.svg" alt='' className="img-fluid" />
        </div>
        <div className="col-7 col-md-auto">
          BancaUSB
        </div>
      </Navbar.Brand>
      <Navbar.Toggle>
        Menu
      </Navbar.Toggle>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          {auth.isLoggedIn ? (
            <>
            <Nav.Item>
              <Nav.Link as={Link} to="/Products">Productos</Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link className="ms-auto" as={Link} to="/Users">Clientes</Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link onClick={handleLogout} className="ml-3">Cerrar Sesión</Nav.Link>
            </Nav.Item>
            </>
          ) : null}
  

  
          {!auth.isLoggedIn ? (

            <>
            <Nav.Item>
              <Nav.Link as={Link} to="/Singup">Únete</Nav.Link>
            </Nav.Item>
          
            <Nav.Item>
              <Nav.Link as={Link} to="/Singin">Ingresar</Nav.Link>
            </Nav.Item>
            </>

          ) : null}
  
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
  
};
