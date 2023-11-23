import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {

    const navigate = useNavigate();

  const [registerData, setRegisterData] = useState({
    UserEmail: '',
    FirstName: '',
    LastName: '',
    Password: '',
  });

  const handleChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const response = await axios.post('http://localhost:3001/accounts', registerData);

      console.log('Respuesta del servidor:', response.data);

    } catch (error) {
      console.error('Error al enviar datos al servidor:', error);
    }
  };

  return (
    <Container>
      <h1>Registro</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail">
          <Form.Label>Correo Electrónico:</Form.Label>
          <Form.Control
            type="email"
            name="UserEmail"
            value={registerData.UserEmail}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formFirstName">
          <Form.Label>Nombre:</Form.Label>
          <Form.Control
            type="text"
            name="FirstName"
            value={registerData.FirstName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formLastName">
          <Form.Label>Apellido:</Form.Label>
          <Form.Control
            type="text"
            name="LastName"
            value={registerData.LastName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Contraseña:</Form.Label>
          <Form.Control
            type="password"
            name="Password"
            value={registerData.Password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit"onClick={() => navigate('/Login')}>
          Registrarse
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
