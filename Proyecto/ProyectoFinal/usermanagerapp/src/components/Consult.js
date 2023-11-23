import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel, Container, Row, Col, Form } from "react-bootstrap";
import "../style/Consult.css";
import asadohuilense from "../img/asadohuilense.png";
import bandejapaisa from "../img/bandejapaisa.png";
import chuleta from "../img/chuleta.png";

export const Consult = () => {
  const foodData = [
    {
      image: asadohuilense,
      description: "Departamento del Huila",
    },
    {
      image: chuleta,
      description: "Departamento del Valle del Cauca",
    },
    {
      image: bandejapaisa,
      description: "Departamento de Antioquia",
    },
    // Add more data as needed
  ];

  return (
    <Container className="typegiant-cards-slider">
      <Row className="content1">
        <Col className="copy-component1">
          <div className="heading-text1">
            <b className="heading-title">Viaje Culinario</b>
            <div className="subheading1">
              <Form.Control type="text" placeholder="Buscar recetas" />
            </div>
          </div>
        </Col>
        <Col>
          <Carousel
            id="carouselExample"
            interval={3000} // Cambiado a 3000 para que se mueva cada 3 segundos
            className="carousel-fade" // Agregado para un efecto de fundido entre imágenes
          >
            {foodData.map((food, index) => (
              <Carousel.Item key={index} className={index === 0 ? "active" : ""}>
                <img
                  className="d-block w-100"
                  src={food.image}
                  alt={food.description}
                />
                <Carousel.Caption>
                  <h3 className="carousel-caption-heading">{food.description}</h3>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
};

export default Consult;
