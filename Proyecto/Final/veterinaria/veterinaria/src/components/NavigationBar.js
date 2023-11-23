import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';

export const NavigationBar = () => (
  <Container>
    <Navbar bg="dark" variant="dark" expand="sm">
      <Navbar.Brand href="/">VetPlaynari</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Item><Nav.Link href="./Home">Home</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link href="/Contactenos">Contactenos</Nav.Link></Nav.Item>
        </Nav>
        <Nav className="ml-auto">
          <Nav.Item><Nav.Link href="/Profile">Profile</Nav.Link></Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </Container>
);

