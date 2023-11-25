import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Contact = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.elements.name.value;
        const email = form.elements.email.value;
        const comment = form.elements.comment.value;
      
        if (!name || !email || !comment) {
          toast.error('Por favor, complete todos los campos.', {
            position: 'top-center',
          });
          return;
        }
      
        toast.success('Mensaje enviado correctamente!', {
          position: 'top-center',
        });
      
        form.reset();
      };

  return (
    <>
      <Container className="mt-3">
        <Row>
          <Col lg={6} className="mb-4">
            <h3 style={{ color: 'rgb(40, 54, 24)' }} >Contact Us</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" placeholder="Enter your name" required />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" placeholder="Enter your email" required />
              </Form.Group>
              <Form.Group controlId="formComment">
                <Form.Label>Comment</Form.Label>
                <Form.Control as="textarea" name="comment" rows={3} placeholder="Enter your comment" required />
              </Form.Group>
              <Button variant="primary" type="submit" style={{ background: 'rgb(96, 108, 56)' }}>
                Submit
              </Button>
            </Form>
          </Col>
          <Col lg={6}>
            <h3 style={{ color: 'rgb(40, 54, 24)' }} >Our Location</h3>
            <MapContainer center={[3.344976,-76.547053]} zoom={13} style={{ height: '300px', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[3.344976,-76.547053]}>
              </Marker>
            </MapContainer>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </>
  );
};

export default Contact;
