import React from 'react';
import { Container, Navbar, Nav , Button} from 'react-bootstrap';
import { FontAwesomeIcon as Fas} from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export const NavigationBar = () => (
  <Container>
    <Navbar bg="black" variant="white">
      <Navbar.Brand href="/Semesters">
       <img src="https://media.utp.edu.co/facultad-educacion/img_contenido/requisitos-de-graduacion.png" alt="U.P.C" width={45} height={35}/>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav">        
        <Nav className="mr-auto">
          <h1 className= "text-white">U.P.C</h1>  
        </Nav>
      </Navbar.Collapse>   
      <Nav alignment="right">
          <Button variant="primary" title = "Log In" href = "./Login" class="align-right bg-danger text-white"><Fas icon={faUser} /></Button>
        </Nav>
    </Navbar>
  </Container>
)