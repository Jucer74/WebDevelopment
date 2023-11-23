import React from "react";
import { Carousel, Card, Col, Row, Button } from "react-bootstrap";

export const Home = () => {
  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  };
  const cardsData = [
    {
      id: 1,
      imageSrc: "https://d3bmp4azzreq60.cloudfront.net/fit-in/2000x2000/vendetunave/images/vehiculos/652443ad28c70.webp",
      backgroundColor: "#f5b6cd",
      subtitle: "Camioneta 4x4 Chevrolet",
      title: "Potencia y Comodidad",
      description: "Listo para viajar por todo el mundo sin preocuparte por la calidad del terreno.",
    },
    {
      id: 2,
      imageSrc: "https://www.km77.com/images/medium/0/6/3/5/3.360635.jpg",
      backgroundColor: "#00c389",
      subtitle: "Twingo",
      title: "Carro Familiar",
      description: "Seguro y económico, para la familia.",
    },
    {
      id: 3,
      imageSrc: "https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/masterpieces/huracan_avio/over/huracan_avio_over_01_m.jpg",
      backgroundColor: "#FDDA24",
      subtitle: "Lamborghini Huracan",
      title: "Listo para Correr y Sentir la Adrenalina",
      description: "Este carro alcanza los 300 km en 1 minuto.",
    },
  ];

  return (
    <div>
      {/* Carrusel */}
      <Carousel className="mt-3">
        <Carousel.Item>
          <div style={overlayStyle}></div>
          <img
            className="d-block w-100"
            src="https://hips.hearstapps.com/hmg-prod/images/bentayga-s-19-1622017945.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>¡Encontrarás los mejores automóviles modernos!</h3>
            <p>
              Amamos el confort casi tanto como tú.
            </p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <div style={overlayStyle}></div>
          <img
            className="d-block w-100"
            src="https://img.remediosdigitales.com/c41ece/1366_2000/1366_2000.jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Seguro contra todo riesgo</h3>
            <p>
              No te preocupes por los rayones
            </p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <div style={overlayStyle}></div>
          <img
            className="d-block w-100"
            src="https://www.elcarrocolombiano.com/wp-content/uploads/2020/06/20200610-REAPERTURA-CONCESIONARIOS-HYUNDAI-MITSUBISHI-VOLVO-HINO-NISSAN-EN-COLOMBIA-01.jpg"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>
              {" "}
              <strong>Abrimos sede en Ciudad Modelo</strong>{" "}
            </h3>
            <p>
              ¡Ahora operamos en el sur de la ciudad!
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Tarjetas */}
      <div className="container mt-4">
        {/* Tarjetas */}
        <div className="mt-4">
          <Row xs={1} md={3} className="g-4">
            {cardsData.map((card) => (
              <Col key={card.id}>
                <Card style={{ textAlign: "left", backgroundColor: card.backgroundColor }}>
                  <Card.Header style={{ padding: 0 }}>
                    <img
                      src={card.imageSrc}
                      alt="Imagen de la tarjeta"
                      style={{ width: "100%", height: "auto", objectFit: "cover" }}
                    />
                  </Card.Header>

                  <Card.Body>
                    <Card.Subtitle className="mb-1 text-muted">{card.subtitle}</Card.Subtitle>
                    <Card.Title>
                      <strong>{card.title}</strong>
                    </Card.Title>
                    <Card.Text>{card.description}</Card.Text>

                    <Button variant="outline-dark" className="rounded-pill">
                      <strong>Conoce más</strong>
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};
