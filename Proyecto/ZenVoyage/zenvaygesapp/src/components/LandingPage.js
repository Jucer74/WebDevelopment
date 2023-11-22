import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import Destination from './Destinations';
import axios from 'axios';

const LandingPage = () => {
  const baseUrl = "http://localhost:3001/destinations";
  const [data, setData] = useState([]);

  const getDestinations = async () => {
    try {
      const response = await axios.get(baseUrl);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDestinations();
  }, []);

  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="imagen1.jpg"
            alt="Primera imagen"
          />
          <Carousel.Caption>
            <h3>Destino Exótico</h3>
            <p>¡Descubre lugares increíbles con nuestra agencia de viajes!</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="imagen2.jpg"
            alt="Segunda imagen"
          />
          <Carousel.Caption>
            <h3>Promoción Especial</h3>
            <p>¡Reserva ahora y obtén descuentos exclusivos!</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="imagen4.jpg"
            alt="Tercera imagen"
          />
          <Carousel.Caption>
            <h3>Playas Paradisíacas</h3>
            <p>Relájate en las playas paradisíacas de nuestro exclusivo destino. Con 
              aguas cristalinas y arena blanca, te espera una experiencia inolvidable. 
              ¡Reserva ahora y sumérgete en el paraíso!</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <div className="card-container mt-4 d-flex flex-row justify-content-around">
        {data.slice(0, 3).map(destination => (
          <Destination key={destination.id} destination={destination} />
        ))}
      </div>
    </div>
  );
};

export default LandingPage;