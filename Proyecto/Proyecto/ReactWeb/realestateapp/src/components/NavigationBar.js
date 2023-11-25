import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const NavigationBar = () => {
  const navigate = useNavigate();

  const loggedInUser = JSON.parse(localStorage.getItem('currentUser'));
  const userEmail = loggedInUser ? loggedInUser.email : null;

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  return (
    <Container fluid className="p-0">
      <Navbar bg="dark" variant="dark" expand="md">
        <Navbar.Brand href="/Home" style={{ paddingLeft: '15px' }}>RealEstateApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Item><Nav.Link href="/Home">Home</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link href="/RealEstate">Real Estate</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link href="/Contact">Contact</Nav.Link></Nav.Item>
          </Nav>
          <Nav className="ms-auto">
            {userEmail && (
              <>
                <span className="navbar-text">{userEmail}</span>
                <Nav.Item>
                  <Nav.Link style={{ paddingRight: '15px' }} onClick={handleLogout}>Logout</Nav.Link>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};
