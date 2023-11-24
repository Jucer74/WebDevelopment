import React from 'react';
import Logo from '../Image/Logo.png';
import { Navbar, Nav } from 'react-bootstrap';

export const NavigationBar = () => (

    
    <div>
        <Navbar bg="dark" variant="dark">
        
        <Navbar.Brand href="/"><img src={Logo} alt = "Logo" width="30"/> DreamGoal</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="respnsive-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link href="/Home">Home</Nav.Link>
            <Nav.Link href = "/Users">Users</Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              <Nav.Link href="/" >Login</Nav.Link>
            </Nav>
        </Navbar.Collapse>
        
        </Navbar>
    </div>
)