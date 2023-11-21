import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';

export const NavigationBar = () => (
  <Container>
    <Navbar bg="dark" variant="dark" >
      <Navbar.Brand href="/">Recetas</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav">        
        <Nav className="mr-auto">
          <Nav.Item><Nav.Link href="./Home">Home</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link href="/Users">Usuario</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link href="/Recetas">Recetas</Nav.Link></Nav.Item>
          
        </Nav>
        <Nav className="ms-auto">
          <Nav.Item><Nav.Link href="/Login" >Login</Nav.Link></Nav.Item>
        </Nav>
      </Navbar.Collapse>        
    </Navbar>
  </Container>
)

