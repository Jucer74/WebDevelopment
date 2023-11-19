import React from "react";
import { Carousel } from "react-bootstrap";
import styles from "./HowWeWork.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';


const HowWeWork = () => {
  return (
    <div name="HowWeWork" className={`${styles.howWeWork} text-center`}>
      <h2 className={styles.title}>How We Work</h2>
      <Carousel className={`${styles.carousel} mx-auto`}>
        <Carousel.Item>
          {/* Contenido del primer slide */}
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/800x400"
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
            className="d-block w-100"
            src="https://via.placeholder.com/800x400"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Segundo Beneficio</h3>
            <p>Descripción del segundo beneficio.</p>
          </Carousel.Caption>
        </Carousel.Item>

        {/* Agrega más Carousel.Items según sea necesario */}
      </Carousel>
    </div>
  );
};

export default HowWeWork;
