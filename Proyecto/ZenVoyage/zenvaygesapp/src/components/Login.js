import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    console.log('Datos de inicio de sesión:', loginData);

  };

  return (
    <Container>
      <h1>Iniciar sesión</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail">
          <Form.Label>Correo Electrónico:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Contraseña:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={() => navigate('/LandingPage')}>
          Iniciar Sesión
        </Button>
      </Form>

      <p className="mt-3">
        ¿No tienes una cuenta?{' '}
        <Link to="/Register">Regístrate aquí</Link>
      </p>
    </Container>
  );
};

export default Login;
