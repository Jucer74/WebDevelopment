import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

export const Register = () => {
  const [registrationData, setRegistrationData] = useState({ username: '', password: '', confirmPassword: '' });
  const [showRegistrationAlert, setShowRegistrationAlert] = useState(false);
  const [showPasswordMismatchAlert, setShowPasswordMismatchAlert] = useState(false);
  const [showUserExistsAlert, setShowUserExistsAlert] = useState(false);

  const navigate = useNavigate();

  const handleRegistrationChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData({ ...registrationData, [name]: value });
  };

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();

    // Validar que ambos campos estén llenos
    if (registrationData.username && registrationData.password && registrationData.confirmPassword) {
      // Validar que la contraseña y su confirmación coincidan
      if (registrationData.password !== registrationData.confirmPassword) {
        setShowPasswordMismatchAlert(true);
        return;
      }

      // Validar que el usuario no exista
      if (userAlreadyExists(registrationData.username)) {
        setShowUserExistsAlert(true);
        return;
      }

      // Guardar los datos de registro en el archivo JSON
      saveRegistrationData(registrationData);

      // Aquí puedes realizar acciones adicionales con los datos de registro

      setShowRegistrationAlert(false);
      setShowPasswordMismatchAlert(false);
      setShowUserExistsAlert(false);

      // Limpiar el formulario después del envío (opcional)
      setRegistrationData({ username: '', password: '', confirmPassword: '' });

      // Redirigir al usuario a la página de inicio de sesión
      navigate('/login');
    } else {
      setShowRegistrationAlert(true);
    }
  };

  const userAlreadyExists = (username) => {
    // Obtener los datos de registro almacenados en el archivo JSON
    const storedData = getStoredRegistrationData();

    // Verificar si el usuario ya existe
    return storedData.some((data) => data.username === username);
  };

  const saveRegistrationData = (data) => {
    // Obtener los datos de registro almacenados en el archivo JSON
    const storedData = getStoredRegistrationData();

    // Agregar nuevos datos de registro
    storedData.push(data);

    // Guardar los datos actualizados en el archivo JSON
    saveDataToJsonFile(storedData);
  };

  const getStoredRegistrationData = () => {
    // Obtener los datos de registro almacenados en el archivo JSON
    const storedData = loadDataFromJsonFile();

    // Parsear los datos o devolver un array vacío si no hay datos
    return storedData ? storedData : [];
  };

  const saveDataToJsonFile = (data) => {
    // Convertir los datos a formato JSON y guardarlos en el archivo
    const jsonData = JSON.stringify(data);
    localStorage.setItem('registrationData', jsonData);
  };

  const loadDataFromJsonFile = () => {
    // Obtener los datos de registro almacenados en el archivo JSON
    const jsonData = localStorage.getItem('registrationData');

    // Parsear los datos o devolver null si no hay datos
    return jsonData ? JSON.parse(jsonData) : null;
  };

  return (
    <Container style={{ maxWidth: '400px', marginTop: '50px' }}>
      <h2>Register</h2>
      <Form onSubmit={handleRegistrationSubmit}>
        <Form.Group controlId="registrationUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={registrationData.username}
            onChange={handleRegistrationChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="registrationPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={registrationData.password}
            onChange={handleRegistrationChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            value={registrationData.confirmPassword}
            onChange={handleRegistrationChange}
            required
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Register
        </Button>
        {showRegistrationAlert && (
          <Alert variant="danger">All fields are required for registration</Alert>
        )}
        {showPasswordMismatchAlert && (
          <Alert variant="danger">Password and Confirm Password must match</Alert>
        )}
        {showUserExistsAlert && (
          <Alert variant="danger">The username already exists. Please choose a different one.</Alert>
        )}
        <p style={{ marginTop: '10px' }}>
          Already have an account? <Link to="/login">Login here</Link>.
        </p>
      </Form>
    </Container>
  );
};

export default Register;
