import React from "react";
import { Carousel } from "react-bootstrap";
import styles from "./HowWeWork.module.css"; // Ajusta la ruta según tus necesidades
import imagen1 from "../images/imagen1.jpg"; // Ajusta la ruta según tus necesidades
import imagen2 from "../images/imagen2.jpg"; // Ajusta la ruta según tus necesidades
import imagen3 from "../images/imagen3.jpg";
import imagen4 from "../images/imagen4.jpeg";
import 'bootstrap/dist/css/bootstrap.min.css';


const HowWeWork = () => {
  return (
    <div name="HowWeWork" className={`${styles.howWeWork} text-center`}>
      <h2 className={styles.title}>How We Work</h2>
      <Carousel className={`${styles.carousel} mx-auto`}>
        <Carousel.Item>
          {/* Contenido del primer slide */}
          <img
            className={`${styles.carouselImage} d-block`}
            src={imagen1}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Primer Beneficio</h3>
            <p>Descripción del primer beneficio.</p>
          </Carousel.Caption>
        </Carousel.Item>
        
        <Carousel.Item>
          {/* Contenido del segundo slide */}
          <img
            className={`${styles.carouselImage} d-block`}
            src={imagen2}
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Segundo Beneficio</h3>
            <p>Descripción del segundo beneficio.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          {/* Contenido del tercer slide */}
          <img
            className={`${styles.carouselImage} d-block`}
            src={imagen3}
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Tercer Beneficio</h3>
            <p>Descripción del tercer beneficio.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          {/* Contenido del cuarto slide */}
          <img
            className={`${styles.carouselImage} d-block`}
            src={imagen4}
            alt="Fourth slide"
          />
          <Carousel.Caption>
            <h3>Cuarto Beneficio</h3>
            <p>Descripción del cuarto beneficio.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default HowWeWork;
