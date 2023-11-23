import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    question: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    console.log('Formulario enviado:', formData);
  };

  return (
    <Container>
      <h1>Contactenos</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Nombre:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Correo Electrónico:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formQuestion">
          <Form.Label>Pregunta:</Form.Label>
          <Form.Control
            as="textarea"
            name="question"
            value={formData.question}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Enviar
        </Button>
      </Form>

      <div style={{ marginTop: '20px' }}>
        <iframe
          title="Ubicación"
          width="600"
          height="450"
          frameBorder="0"
          style={{ border: '0' }}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22427.908670729424!2d-0.12886923258339267!3d51.50735091487057!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876035e1c51e1db%3A0x8b0c5b136563833f!2sBig%20Ben!5e0!3m2!1sen!2suk!4v1638253325301!5m2!1sen!2suk"
          allowFullScreen=""
        ></iframe>
      </div>
    </Container>
  );
};

export default ContactUs;
