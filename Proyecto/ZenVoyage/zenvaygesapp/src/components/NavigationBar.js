import React, { useState, useEffect } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';

export const NavigationBar = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch('http://localhost:3001/accounts/1')  
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.error('Error al obtener datos del usuario:', error));
  }, []);

  return (
    <Container>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/LandingPage">ZenVoyage App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Item><Nav.Link href="/ContactUs">Contactenos</Nav.Link></Nav.Item>
          </Nav>
          <Nav className="mr-auto">
            <Nav.Item><Nav.Link href="/Users">Usuario</Nav.Link></Nav.Item>
          </Nav>
          <Nav className="mr-auto">
            <Nav.Item><Nav.Link href="/Bookings">Mis reservas</Nav.Link></Nav.Item>
          </Nav>
          {user.FirstName && (
            <Nav className="ms-auto">
              <Nav.Item><Nav.Link>{`${user.FirstName} ${user.LastName}`}</Nav.Link></Nav.Item>
            </Nav>
          )}
          <Nav className="ms-auto">
            <Nav.Item><Nav.Link href="/Login" >Ingresar</Nav.Link></Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};
