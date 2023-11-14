// src/components/LandingPage.js
import React from 'react';
import { Carousel } from 'react-bootstrap';

const LandingPage = () => {
  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/800x400"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Destino 1</h3>
            <p>Descripción del destino 1.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/800x400"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Destino 2</h3>
            <p>Descripción del destino 2.</p>
          </Carousel.Caption>
        </Carousel.Item>
        {/* Agrega más items según sea necesario */}
      </Carousel>
    </div>
  );
};

export default LandingPage;
