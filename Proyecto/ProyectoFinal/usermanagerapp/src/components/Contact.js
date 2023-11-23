import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../style/Contact.css'; // Ajusta la ruta según tu estructura

export const Contact = () => {
  return (
    <Container className="contact-page-container">
      <h2>Contacto</h2>
      <Row>
        <Col>
          <p>
            ¿Tienes alguna pregunta o comentario? ¡Contáctanos!
          </p>
        </Col>
      </Row>
      
      <div className="map-container">
              <iframe
                title="Google Maps"
                width="100%"
                height="300"s
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAvgKmlWIxghqb_G6Mc95xf8tp_TOj1_oM&q=Hall+des+Lumières,+49+Chambers+St,+New+York,+NY+10007,+Estados+Unidos&zoom=15"
                allowFullScreen
              ></iframe>
            </div>
      <Row>
        <Col>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" placeholder="Tu nombre" />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control type="email" placeholder="Tu correo electrónico" />
            </Form.Group>

            <Form.Group controlId="formMessage">
              <Form.Label>Mensaje</Form.Label>
              <Form.Control as="textarea" rows={4} placeholder="Tu mensaje" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Enviar Mensaje
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
