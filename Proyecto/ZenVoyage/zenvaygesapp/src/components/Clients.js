import React, { useState } from 'react';
import { Container, Form, Button, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Clients = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleFormChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:3001/clients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        navigate('/BookingConfirmation');
      })
      .catch(error => {
        console.error('Error al guardar los datos:', error);
      });
  };

  return (
    <Container className="mt-3">
      <h2>Registro de Cliente</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formAddress">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresar su dirección de recidencia"
              value={formData.address || ''}
              onChange={(e) => handleFormChange('address', e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formCity">
            <Form.Label>Ciudad</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresar su ciudad de recidencia"
              value={formData.city || ''}
              onChange={(e) => handleFormChange('city', e.target.value)}
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formCountry">
            <Form.Label>País</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresar su país de recidencia"
              value={formData.country || ''}
              onChange={(e) => handleFormChange('country', e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formPhoneNumber">
            <Form.Label>Número móvil</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Ingresar su número de celular"
              value={formData.phoneNumber || ''}
              onChange={(e) => handleFormChange('phoneNumber', e.target.value)}
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formPreferences">
            <Form.Label>Preferencias</Form.Label>
            <Form.Control
              type="text"
              placeholder="Playa, Bosque, Campo, ETC (Separados por coma)"
              value={formData.preferences || ''}
              onChange={(e) => handleFormChange('preferences', e.target.value)}
              required
            />
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit">
          Siguiente
        </Button>
      </Form>
    </Container>
  );
};

export default Clients;

