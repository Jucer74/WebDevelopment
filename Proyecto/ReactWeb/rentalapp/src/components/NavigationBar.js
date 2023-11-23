import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';

export const NavigationBar = () => (
  <Container>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">Car Rental Application</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/Home">Home</Nav.Link>
          <Nav.Link href="/Users">Users</Nav.Link>
          <Nav.Link href="/Cars">Cars</Nav.Link>
          <Nav.Link href="/Contact">Contact</Nav.Link>
        </Nav>
        <Nav className="ms-auto">
          <Nav.Link href="/Login">Login</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </Container>
)

