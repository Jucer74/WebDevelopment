import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";

export function NavigationBar() {
  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
      <Container className="w-100">
        <Navbar.Brand href="/">ITSY Organizator</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/Subjects">Subjects</Nav.Link>
            <Nav.Link href="/Students">Students</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
