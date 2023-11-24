import React, { useState, useEffect } from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "../style/Header.css";

export const NavigationBar = () => {
  const [expanded, setExpanded] = useState(false);
  const [username, setUsername] = useState('');
  const [dbUsername, setDbUsername] = useState('');

  useEffect(() => {
    const id_usuario = localStorage.getItem('user_id');
    if (id_usuario) {
      setUsername(id_usuario);
    }

    // Fetch the username from the database
    fetchDbUsername(id_usuario);
  }, []);

  const handleLogout = () => {
    setUsername('');
    localStorage.removeItem('username');
    handleNavItemClick('/Login');
  };

  const handleNavItemClick = (path) => {
    window.location.href = path;
    setExpanded(false);
  }

  const fetchDbUsername = async (id_usuario) => {
    // Assuming you have an API endpoint to fetch the username from the database
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/users/${id_usuario}`);
      if (response.ok) {
        const dbUsernameData = await response.json();
        setDbUsername(dbUsernameData.nombre_usuario);
      } else {
        console.error("Error fetching username from the database:", response.statusText);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>
          {/* Your brand logo */}
          <span className="brandname">Recetas Colombianas</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(!expanded)} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {/* Your navigation links */}

            {username ? (
              <>
                <Nav.Link>{dbUsername}</Nav.Link>
                <Nav.Link onClick={() => handleNavItemClick('/Home')}>Home</Nav.Link>
                <Nav.Link onClick={() => handleNavItemClick('/Consult')}>Consult</Nav.Link>
                <Nav.Link onClick={() => handleNavItemClick('/Contact')}>Contact</Nav.Link>
                <Button variant="success" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="primary" onClick={() => handleNavItemClick('/Login')}>
                  Logout
                </Button>
                <Nav.Link onClick={() => handleNavItemClick('/Home')}>Home</Nav.Link>
                <Nav.Link onClick={() => handleNavItemClick('/Consult')}>Consult</Nav.Link>
                <Nav.Link onClick={() => handleNavItemClick('/Contact')}>Contact</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
