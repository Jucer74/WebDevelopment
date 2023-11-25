import React, { useState, useEffect } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';

export const NavigationBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    setUserName('');
    // Redirige al usuario a la página de inicio de sesión después de cerrar la sesión
    window.location.href = '/login';
  };

  return (
    <Navbar bg="dark" variant="dark" style={{ padding: '10px 15px' }}>
      <Container>
        <Navbar.Brand href="/">AgenteDeportivoAPP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Item><Nav.Link href="./Home">Home</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link href=" /SportAgent">SportAgent</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link href="./Contact">Contact</Nav.Link></Nav.Item>
          </Nav>
          <Nav className="ms-auto">
            {isLoggedIn ? (
              <>
                <Nav.Item><Navbar.Text>Signed in as {userName}</Navbar.Text></Nav.Item>
                <Nav.Item><Nav.Link onClick={handleLogout}>Logout</Nav.Link></Nav.Item>
              </>
            ) : (
              <Nav.Item><Nav.Link href="/Login">Login</Nav.Link></Nav.Item>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
