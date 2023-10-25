import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, Nav } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <Container>
        <Navbar bg="dark" variant="dark" >
          <Navbar.Brand href="/">UserManagerApp</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">        
            <Nav className="mr-auto">
              <Nav.Item><Nav.Link href="/Home">Home</Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link href="/Users">Users</Nav.Link></Nav.Item>
            </Nav>
            <Nav className="ms-auto">
              <Nav.Item><Nav.Link href="/Login" >Login</Nav.Link></Nav.Item>
            </Nav>
          </Navbar.Collapse>        
        </Navbar>
      </Container>
    </div>
  );
}

export default App;