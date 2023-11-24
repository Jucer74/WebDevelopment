import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import Banner1 from "../images/gain.jpg";
import Banner2 from "../images/Waveform.jpg";
import Banner3 from "../images/consola.jpg";

export function Home() {
  const carouselStyle = {
    width: "80%", // Establecer el ancho al 80%
    margin: "auto", // Centrar el carrusel en la pantalla
    marginTop: "20px",
  };

  return (
    <div style={carouselStyle}>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Banner1}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Elementos de una consola</h3>
            <p>Partes de la consola, mixer o mezcladora.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Banner2}
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Las 12 mejores DAW gratuitas</h3>
            <p>(DAW) es un software que permite grabar, editar y mezclar audio. Las DAW se utilizan en una amplia gama de aplicaciones, desde la producción musical hasta la edición de sonido para películas y televisión.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Banner3}
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Las mejores consolas 2023</h3>
            <p>En este artículo hacemos un repaso de las mejores mesas de mezcla digitales del 2023.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
