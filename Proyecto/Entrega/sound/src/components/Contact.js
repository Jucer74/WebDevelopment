import React, { useState } from "react";  // Asegúrate de importar useState de React
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export const Contact = () => {
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Puedes realizar cualquier lógica adicional antes de mostrar el modal aquí.
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container
      className="d-flex justify-content-center"
      style={{ height: "80vh", backgroundColor: "#E8E8E8" }}
    >
      <section
        className="row col-md-11 d-flex justify-content-center mt-5 mb-4"
        style={{ backgroundColor: "#F4F4F4", borderRadius: "20px" }}
      >
        <Row className="g-0 col-md-11">
          <Col
            lg={6}
            my={4}
            md={12}
            className="fram-mapa"
            style={{ position: "relative", borderRadius: "15px" }}
          >
            <iframe
              title="Google Maps"
              className="w-100 h-100"
              src="https://maps.google.com/maps?q=biblioteca&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
              allowFullScreen
            />
          </Col>
          <Col lg={6} my={4} md={12}>
            <Container className="register-container">
              <h2>Contacto</h2>
              <Form onSubmit={handleSubmit}>
              <Form.Group controlId="nombre" className="form-group">
                  <Form.Label>Nombre:</Form.Label>
                  <Form.Control type="text" name="nombre" required />
                </Form.Group>

                <Form.Group controlId="telefono" className="form-group">
                  <Form.Label>Telefono:</Form.Label>
                  <Form.Control type="text" name="telefono" required />
                </Form.Group>

                <Form.Group controlId="email" className="form-group">
                  <Form.Label>Correo Electronico:</Form.Label>
                  <Form.Control type="email" name="email" required />
                </Form.Group>

                <Form.Group controlId="comment" className="form-group">
                  <Form.Label>Comentario:</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="comment"
                    rows={2}
                    style={{ width: "99%" }}
                    required
                  />
                </Form.Group>

                <Form.Group className="form-group">
                  <Button type="submit">Enviar</Button>
                </Form.Group>
              </Form>
            </Container>
          </Col>
        </Row>
      </section>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>¡Espera un momento!</Modal.Title>
        </Modal.Header>
        <Modal.Body>En breve serás contactado.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
