// Bookings.js (o MyBookings.js)
import React, { useState, useEffect } from 'react';
import { Container, Button, Modal, Form, Card } from 'react-bootstrap';
import axios from 'axios';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [currentClientId] = useState(1);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:3001/bookings`)
      .then(response => {
        setBookings(response.data);
      })
      .catch(error => {
        console.error('Error fetching bookings:', error);
      });

  
    axios.get('http://localhost:3001/destinations')
      .then(response => {
        setDestinations(response.data);
      })
      .catch(error => {
        console.error('Error fetching destinations:', error);
      });
  }, [currentClientId]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const reserveDestination = () => {
   
    handleCloseModal();
  };

  return (
    <Container className="text-center text-md-left">
      <h1>My Bookings</h1>
      <Button variant="primary" onClick={handleShowModal}>
        Reservar Destino
      </Button>

      <div className="mt-4">
        {bookings.map((booking, index) => (
          <Card key={index} className="mb-2">
            <Card.Body>
              <Card.Title>{booking.DestinationName}</Card.Title>
              <Card.Text>
                <p>{booking.Description}</p>
                <p>Ciudad: {booking.City}</p>
                <p>País: {booking.Country}</p>
                <p>Cantidad: ${booking.Amount}</p>
                <p>Tipo: {booking.DestinationType}</p>
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Reservar Destino</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formDestination">
              <Form.Label>Selecciona un destino:</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => setSelectedDestination(destinations.find(dest => dest.id === parseInt(e.target.value)))}
              >
                <option value="">Selecciona un destino...</option>
                {destinations.map(dest => (
                  <option key={dest.id} value={dest.id}>{dest.DestinationName}</option>
                ))}
              </Form.Control>
            </Form.Group>
            {selectedDestination && (
              <div>
                <p>Detalles del destino:</p>
                <p>{selectedDestination.Description}</p>
                <p>City: {selectedDestination.City}, Country: {selectedDestination.Country}</p>
                <p>Amount: ${selectedDestination.Amount}</p>
              </div>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={reserveDestination} disabled={!selectedDestination}>
            Reservar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Bookings;
