import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../Styles/Footer.css'; 

export const Footer = () => (
  <Container className="footer-container" fluid>
    <Row>
      <Col md={4} className="text-center footer-column">
        REAL ESTATE APP
      </Col>
      <Col md={4} className="d-flex flex-column align-items-center footer-column">
        <div className="footer-contact">Contacto:</div>
        <div>info@realestate.com</div>
        <div>+57 32165498</div>
        <div>Cali, Valle del Cauca, CO</div>
      </Col>
      <Col md={4} className="text-center">
        &copy; 2023 Real Estate. All Rights Reserved
      </Col>
    </Row>
  </Container>
);