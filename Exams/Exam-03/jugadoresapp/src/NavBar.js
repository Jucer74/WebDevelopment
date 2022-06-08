import React from 'react';
import {Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const NavBar = () => (
  
    <Navbar bg="dark" variant="dark" >
      <Link to="/" className="navbar-brand" expand='md'>Futbol</Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav">        
        <Nav className="mr-auto">
          <Link to="/" className='nav-link'>Home</Link>
          <Link to="/Jugadores" className='nav-link'>Jugadores</Link>
          <Link to="/Equipos" className='nav-link'>Equipos</Link>
        </Nav>
        <Nav alignment="right">
        <Link to="/Login" className='nav-link'>Login</Link>
        </Nav>
      </Navbar.Collapse>        
    </Navbar>

)
export default NavBar;