import React from 'react';
import { Carousel } from 'react-bootstrap';

export const Home = () => (
  <div>
      <Carousel interval={3000}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/carrusel_1.jpg"
            alt="Primera imagen"
          />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/carrusel_2.jpg"
            alt="Segunda imagen"
          />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/carrusel_4.jpg"
            alt="Tercera imagen"
          />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/carrusel_3.jpg"
            alt="Cuarta imagen"
          />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
)