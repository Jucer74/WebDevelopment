import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';

export const NavigationBar = () => (
  <Navbar bg="dark" variant="dark" expand="lg">
    <Container fluid>
      <Navbar.Brand href="/">UserManagerApp</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Item><Nav.Link href="/Home">Home</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link href="/Users">Users</Nav.Link></Nav.Item>
        </Nav>
        <Nav className="ms-auto">
          <Nav.Item><Nav.Link href="/Login">Login</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link href="/Register">Register</Nav.Link></Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
)

