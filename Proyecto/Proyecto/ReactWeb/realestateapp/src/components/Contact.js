import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarker } from '@fortawesome/free-solid-svg-icons';
import { Map } from './Map'; 

export const Contact = () => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsFormSubmitted(true);

    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Container className="mt-5 mb-5 justify-content-center align-items-center">
      <div className="login-container p-4 rounded bg-dark text-light">
        <h2 className="text-center">Contact</h2>
        <Row className="mt-4 text-center text-md-left">
          <Col md={6} className="mb-5">
            <div>
              <h2>Contact</h2>
              <p><FontAwesomeIcon icon={faEnvelope} /> info@realestate.com</p>
              <p><FontAwesomeIcon icon={faPhone} /> +57 32165498</p>
              <p><FontAwesomeIcon icon={faPhone} /> +57 31568791</p>
              <p><FontAwesomeIcon icon={faMapMarker} /> Cali, Valle del Cauca, CO</p>
            </div>
          </Col>
          <Col md={6} className="mb-5">
            <div>
              <h2>Contact Form</h2>
              {isFormSubmitted ? (
                <div>
                  <p>Message sent successfully!</p>
                  <Button variant="primary" onClick={() => setIsFormSubmitted(false)} className="w-50 rounded-0">
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <Form onSubmit={handleFormSubmit} className="mb-5">
                  <Form.Group controlId="formBasicName">
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="mb-3 rounded-0"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mb-3 rounded-0"
                      required
                      pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}"
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicSubject">
                    <Form.Control
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="mb-3 rounded-0"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicMessage">
                    <Form.Control
                      as="textarea"
                      name="message"
                      rows={4}
                      placeholder="Message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="mb-3 rounded-0"
                      required
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-start">
                    <Button variant="primary" type="submit" className="w-25 rounded-0">
                      Send
                    </Button>
                  </div>
                </Form>
              )}
            </div>
          </Col>
          <Col md={12}>
            <div>
              <Map />
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};
