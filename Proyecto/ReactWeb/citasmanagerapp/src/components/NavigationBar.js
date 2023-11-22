import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';

export const NavigationBar = () => {
  return (
    <Container>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Navbar.Brand href="/">Citas Sura</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Item><Nav.Link href="/">Home</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link href="/Medicos">Medicos</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link href="/Contact">Contact</Nav.Link></Nav.Item>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Item><Nav.Link href="/Login">Login</Nav.Link></Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};
