import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';

export const Contact = () => {
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactData({
      ...contactData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!contactData.name || !contactData.email || !contactData.message) {
      setShowAlert(true);
      return;
    }
    setContactData({
      name: '',
      email: '',
      message: '',
    });

    alert('Mensaje enviado con éxito');

    setShowAlert(false);
  };

  return (
    <Container style={{ maxWidth: '600px', marginTop: '50px' }}>
      <h2>Contact Form</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            name="name"
            value={contactData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            name="email"
            value={contactData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formMessage">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Enter your message"
            name="message"
            value={contactData.message}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {showAlert && (
          <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
            Please fill in all required fields.
          </Alert>
        )}

        <Button variant="primary" type="submit" style={{ marginTop: '15px' }}> 
          Send Message
        </Button>
      </Form> 

      <div style={{ marginTop: '25px' }}>
  <iframe
    title="Map"
    width="100%"
    height="300"
    frameBorder="0"
    scrolling="no"
    marginHeight="0"
    marginWidth="0"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19828.615297544706!2d-76.52217036866028!3d3.451647121114607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e300f47202e5a49%3A0xdef3b9a2c8ed5a77!2sCali%2C%20Valle%20del%20Cauca%2C%20Colombia!5e0!3m2!1sen!2sus!4v1636446685502!5m2!1sen!2sus"
    ></iframe>
    </div>
    </Container>
  );
};

export default Contact;