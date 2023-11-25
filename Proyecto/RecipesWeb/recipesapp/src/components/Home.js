import React from 'react';
import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import {Row, Col } from 'react-bootstrap';

const Home = () => {

  return (
    <>
      <Container fluid
        style={{ background: 'rgb(40, 54, 24)', padding: 0 }}
        className="mt-3 rounded d-flex align-items-center justify-content-center w-100">
        <Carousel className="mx-auto" style={{ maxWidth: '800px', width: '100%', maxHeight: '70vh' }}>
          <Carousel.Item>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ height: '300px' }}
            >
              <img
                className="img-fluid"
                src="./images/carrusel1.jpg"
                alt="First slide"
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ height: '300px' }}
            >
              <img
                className="img-fluid"
                src="./images/carrusel2.jpg"
                alt="Second slide"
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ height: '300px' }}
            >
              <img
                className="img-fluid"
                src="./images/carrusel3.jpg"
                alt="Second slide"
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ height: '300px' }}
            >
              <img
                className="img-fluid"
                src="./images/carrusel4.jpg"
                alt="Second slide"
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ height: '300px' }}
            >
              <img
                className="img-fluid"
                src="./images/carrusel5.jpg"
                alt="Second slide"
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ height: '300px' }}
            >
              <img
                className="img-fluid"
                src="./images/carrusel6.jpg"
                alt="Second slide"
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </div>
          </Carousel.Item>
        </Carousel>
      </Container>
      <Container className="mt-5">
        <h2 style={{ color: 'rgb(40, 54, 24)' }}  className="text-center mb-4">About Us</h2>
        <Row>
          <Col md={6} className="mb-4">
            <img
              src="./images/cookingteam.png"
              alt="Equipo de cocina"
              className="img-fluid rounded"
            />
          </Col>
          <Col style={{ color: 'rgb(40, 54, 24)' }}  md={6}>
            <p>
            Welcome to USB Cooking Recipes, your trusted source for delicious recipes and cooking tips.
               Discover the pleasure of cooking with us and join our passionate community.
            </p>
            <p>
            At USB Cooking Recipes, we are dedicated to sharing the joy of cooking. Our team is made up of passionate chefs and food lovers who want to inspire you in everyday cooking.
            </p>
          </Col>
        </Row>
</Container>
    </>
  );
};

export default Home;
