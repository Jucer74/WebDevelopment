import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, Table, Form, Modal} from 'react-bootstrap';
import { FontAwesomeIcon as Fas } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const baseUrl = "http://localhost:3001/bookings";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    axios
      .get(baseUrl)
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBooking(null);
    setFormData({});
  };

  const handleEditBooking = (booking) => {
    if (booking && booking.Destination) {
      setSelectedBooking(booking);
      setFormData({
        City: booking.Destination.City,
        DestinationType: booking.Destination.DestinationType,
      });
      handleShowModal();
    } else {
     
      console.error('Booking o Destination es undefined');
    }
  };
  

  const handleDeleteBooking = (bookingId) => {
    axios
      .delete(`${baseUrl}/${bookingId}`)
      .then(() => {
        setBookings(bookings.filter((booking) => booking.id !== bookingId));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const reserveDestination = async () => {
    if (!selectedBooking) {
    
      await axios.post('http://localhost:3001/bookings', selectedBooking)
        .then(response => {
          setBookings([...bookings, response.data]); 
          handleCloseModal();
        })
        .catch(error => {
          console.error('Error creando reserva:', error);
        });
    } else {
      
      await axios.put(`http://localhost:3001/bookings/${selectedBooking.id}`, selectedBooking)
        .then(response => {
          const updatedBookings = bookings.map(booking =>
            booking.id === selectedBooking.id ? response.data : booking
          );
          setBookings(updatedBookings);
          handleCloseModal();
        })
        .catch(error => {
          console.error('Error editando reserva:', error);
        });
    }
  };
  

  return (
    <Container className="text-center text-md-left">
      <h1>Mis reservas</h1>
      <p>
        <Button
          className="left"
          variant="success btn-sm"
          onClick={() => {
            setSelectedBooking(null);
            handleShowModal();
          }}
        >
          {" "}
          <Fas icon={faPlus} /> Nueva Reserva
        </Button>
      </p>
      <Table id="BookingsTable">
        <thead>
          <tr>
            <th>Destino</th>
            <th>Ciudad</th>
            <th>País</th>
            <th>Cantidad</th>
            <th>Tipo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.DestinationName}</td>
              <td>{booking.City}</td>
              <td>{booking.Country}</td>
              <td>${booking.Amount}</td>
              <td>{booking.DestinationType}</td>
              <td>
                <Button variant="outline-primary" onClick={() => handleEditBooking(booking)}>
                  Editar
                </Button>{"  "}
                <Button variant="outline-danger" onClick={() => handleDeleteBooking(booking.id)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedBooking ? 'Editar Reserva' : 'Reservar Destino'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCity">
              <Form.Label>Ciudad</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese la ciudad"
                name="City"
                value={formData.City || ''}
                onChange={(e) => setFormData({ ...formData, City: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formDestinationType">
              <Form.Label>Tipo de Destino</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el tipo de destino"
                name="DestinationType"
                value={formData.DestinationType || ''}
                onChange={(e) => setFormData({ ...formData, DestinationType: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={reserveDestination}>
            {selectedBooking ? 'Guardar Cambios' : 'Reservar'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Bookings;
