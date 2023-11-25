import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import { useUser } from './UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faAddressBook, faUtensils, faUser } from '@fortawesome/free-solid-svg-icons';


const Header = () => {
  const { user, logout } = useUser();

  return (
    <Navbar style={{ backgroundColor: 'rgb(96, 108, 56)' }} variant="dark" expand="md">
      <Container>
      <Navbar.Brand as={NavLink} to="/home">
          <img
            src="./images/usblogo.png"
            alt="USB Cooking Logo"
            height="60"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            {user && (
              <>
                <NavLink to="/categories" className="nav-link text-light">
                <FontAwesomeIcon icon={faList} /> Categories
                </NavLink>
                <NavLink to="/recipes" className="nav-link text-light">
                <FontAwesomeIcon icon={faUtensils} /> Recipes
                </NavLink>
                <NavLink to="/contact" className="nav-link text-light">
                <FontAwesomeIcon icon={faAddressBook} /> Contact
                </NavLink>
              </>
            )}
          </Nav>
          {user && (
  <Nav>
    <span className="nav-link text-light">
      <FontAwesomeIcon icon={faUser} className="me-2" />
      {user.name}
    </span>
    <Button variant="outline-light" onClick={logout}>
      Logout
    </Button>
  </Nav>
)}

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
