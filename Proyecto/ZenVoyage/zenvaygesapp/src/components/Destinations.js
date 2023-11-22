import React, { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Destination = ({ destination }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div>
      <Card style={{ width: '18rem' }} className="text-center mt-4">
        <Card.Img variant="top" src={destination.Image} className="card-img-top" alt={destination.DestinationName} />
        <Card.Body>
          <Card.Text>{destination.Description}</Card.Text>
          <Button variant="primary" onClick={handleShowModal}>
            Saber más
          </Button>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{destination.DestinationName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{destination.Description}</p>
          <p>City: {destination.City}, Country: {destination.Country}</p>
          <p>Amount: ${destination.Amount}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
          <Link to="/Bookings">
            <Button variant="primary" onClick={handleCloseModal}>
              Reservar
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Destination;
