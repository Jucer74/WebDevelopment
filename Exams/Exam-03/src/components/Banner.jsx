import React from "react";
import styles from "./Banner.module.css";
import carouselImage1 from "../images/carouselImage1.jpg";
import carouselImage2 from "../images/carouselImage2.jpg";
import carouselImage3 from "../images/carouselImage3.jpg";
import { Carousel } from "react-bootstrap";

export function Banner() {
  return (
    <Carousel>
      <Carousel.Item interval={5000}>
        <img
          className={`d-block w-100 ${styles.carouselImage}`}
          src={carouselImage1}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Get Up</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={5000}>
        <img
          className={`d-block w-100 ${styles.carouselImage}`}
          src={carouselImage2}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Dream Big</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={5000}>
        <img
          className={`d-block w-100 ${styles.carouselImage}`}
          src={carouselImage3}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>And Flourish</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
