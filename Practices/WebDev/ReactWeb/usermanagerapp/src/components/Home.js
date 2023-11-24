import React from 'react';
import { Carousel } from 'react-bootstrap';

const Home = () => {
  return (
    <div className="container">
      <h1>Bienvenido a eps sanitas</h1>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="Images/medicos.png"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="Images/hospital.png"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="Images/virtual.png"
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="Images/consulta.png"
            alt="Fourth slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Home;
