import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

export const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [showAlert, setShowAlert] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener los datos de usuarios almacenados en el localStorage
    const storedData = localStorage.getItem('registrationData');
    if (storedData) {
      setUsersData(JSON.parse(storedData));
    }
  }, []);

  const handleLogin = (username) => {
    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('userName', username);
    navigate('/home');
    window.location.reload();
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar campos antes de enviar
    if (!formData.username || !formData.password) {
      setShowAlert(true);
      return;
    }

    // Validar el usuario con los datos del JSON
    const isValidUser = usersData.some((user) => user.username === formData.username && user.password === formData.password);

    if (isValidUser) {
      handleLogin(formData.username);
    } else {
      setShowAlert(true);
    }
  };

  const handleCancel = () => {
    // Puedes añadir acciones adicionales al hacer clic en Cancelar
    console.log('Login canceled');
  };

  return (
    <Container style={{ maxWidth: '400px', marginTop: '50px' }}>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>

        {showAlert && (
          <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
            Please fill in all required fields.
          </Alert>
        )}

        <Button variant="primary" type="submit">
          Login
        </Button>

        <Button variant="secondary" style={{ marginLeft: '10px' }} onClick={handleCancel}>
          Cancel
        </Button>

        <p style={{ marginTop: '10px' }}>
          Don't have an account? <Link to="/register">Register here</Link>.
        </p>
      </Form>
    </Container>
  );
};

export default Login;
