import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios';

const BookingConfirmation = () => {
  const [userData, setUserData] = useState({});
  const [selectedDestination, setSelectedDestination] = useState({});

  useEffect(() => {
    axios.get('http://localhost:3001/accounts')
      .then(response => {
        const user = response.data[0];
        setUserData(user);
      })
      .catch(error => {
        console.error('Error al obtener datos de cuentas:', error);
      });

    axios.get('http://localhost:3001/destinations') 
      .then(response => {
        const destination = response.data;
        setSelectedDestination(destination);
      })
      .catch(error => {
        console.error('Error al obtener datos del destino seleccionado:', error);
      });
  }, []);

  return (
    <div>
      <h2>Confirmación de Reserva</h2>
      <p>¡Gracias por registrar tus datos! Tu reserva ha sido confirmada con éxito.</p>

      <div>
        <h3>Datos del Usuario</h3>
        <p>Nombre: {userData.FirstName} {userData.LastName}</p>
        <p>Email: {userData.UserEmail}</p>
      </div>

      <div>
        <h3>Detalles del Destino Seleccionado</h3>
        <h4>{selectedDestination.DestinationName} ISLAS BARU</h4>
        <p>Ciudad: {selectedDestination.City} Cartagena</p>
        <p>País: {selectedDestination.Country} Colombia</p>
        <img src={selectedDestination.Image} alt={selectedDestination.DestinationName} />
      </div>

      <Link to="/Bookings">
        <button className="btn btn-warning">Ver mis Reservas</button>
      </Link>
    </div>
  );
};

export default BookingConfirmation;
