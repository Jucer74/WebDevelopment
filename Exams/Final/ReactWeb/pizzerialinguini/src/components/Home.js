import React from 'react';
import { Carousel } from 'react-bootstrap';
export const Home = () => (
  <div>
    <Carousel>
        <Carousel.Item>
          <img
              className="d-block w-100"
              src="./Images/01.jpg"
              alt="Hawaiana"
              />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
              className="d-block w-100"
              src="./Images/02.jpg"
              alt="Pollo y Champiñon"
              />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
              className="d-block w-100"
              src="./Images/03.jpg"
              alt="Marinara"
              />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
    </Carousel>
  </div>
)