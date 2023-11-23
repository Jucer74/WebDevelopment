import React, { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Destination = ({ destination }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div>
      <Card style={{ width: '20rem' }} className="text-center mt-4">
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
          <p>Ciudad: {destination.City}, País: {destination.Country}</p>
          <p>Valor: ${destination.Amount}</p>
          <p>Incluye: {destination.Include}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
          <Link to="/Clients">
            <Button variant="primary" onClick={() => navigate('/Clients')}>
              Reservar
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Destination;
