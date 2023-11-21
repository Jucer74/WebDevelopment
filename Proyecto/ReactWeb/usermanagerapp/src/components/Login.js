import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon as Fas } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';  // Added faUserPlus
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Button, Container, Table, Form } from 'react-bootstrap';

const baseUrl = "https://localhost:5001/api/Users";

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = async () => {
    if (username && password) {
      // Perform login logic here
      setIsLoggedIn(true);
    } else {
      alert('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleRegister = async () => {
    if (username && password) {
      // Perform registration logic here
      // Make an API call to register the user
      try {
        const response = await axios.post(baseUrl, {
          username: username,
          password: password,
        });
        alert('Registration successful!'); // Display a success message
        setIsRegistering(false); // Close the registration form
      } catch (error) {
        alert('Registration failed. Please try again.'); // Display an error message
      }
    } else {
      alert('Invalid username or password');
    }
  };

  if (isLoggedIn) {
    return (
      <Container className="text-center text-md-left">
        <h1>Welcome, {username}!</h1>
        <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
      </Container>
    );
  }

  return (
    <Container className="text-center text-md-left">
      <h1>Login</h1>
      <Form>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Button variant="primary" onClick={handleLogin}><Fas icon={faSignInAlt} /> Login</Button>
        <Button variant="info" onClick={() => setIsRegistering(true)}><Fas icon={faUserPlus} /> Register</Button>
      </Form>

      {/* Registration Modal */}
      <Modal isOpen={isRegistering} toggle={() => setIsRegistering(false)}>
        <ModalHeader toggle={() => setIsRegistering(false)}>Register</ModalHeader>
        <ModalBody>
          <Form>
            <Form.Group>
              <Form.Group>
              <Form.Label>Email:</Form.Label>
              <Form.Control type="text" placeholder="Enter email" onChange={(e) => setUsername(e.target.value)} />
            </Form.Group>
              <Form.Label>Name:</Form.Label>
              <Form.Control type="text" placeholder="Enter name" onChange={(e) => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Username:</Form.Label>
              <Form.Control type="text" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleRegister}>Register</Button>
          <Button color="secondary" onClick={() => setIsRegistering(false)}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
}

export default Login;

