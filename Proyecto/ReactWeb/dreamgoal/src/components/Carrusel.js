// Carousel.js
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import img from '../Image/carouselImg';

export function MyCarousel () {
  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img src={img.img1} alt= "juego" class="d-block mx-auto" width="60%" />
          <Carousel.Caption>
            <h3>La magia está en ti.</h3>
            <p>"Cree en ti mismo y todo será posible."</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={img.img2} alt= "juego" class="d-block mx-auto" width="60%"/>
          <Carousel.Caption>
            <h3>La felicidad</h3>
            <p>es la clave del éxito!</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={img.img3} alt= "juego" class="d-block mx-auto" width="60%"/>
          <Carousel.Caption>
            <h3>Lucha</h3>
            <p> por tus sueños! </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

