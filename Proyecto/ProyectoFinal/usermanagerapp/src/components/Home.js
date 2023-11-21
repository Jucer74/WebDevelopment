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

  return (
    <div>
      {/* Carrusel */}
      <Carousel className="mt-3">
        <Carousel.Item>
          <div style={overlayStyle}></div>
          <img
            className="d-block w-100"
            src="https://static.vecteezy.com/system/resources/thumbnails/026/646/585/small_2x/ai-generated-ai-generative-finance-investment-data-stock-graph-price-grow-business-with-coins-jar-near-graphic-art-photo.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>¡Los beneficios se aprovechan!</h3>
            <p>
              En 2 pasos, mira en nuestra app Bancolombia todo lo que tiene en
              plan de tu cuenta de ahorros.
            </p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <div style={overlayStyle}></div>
          <img
            className="d-block w-100"
            src="https://static.vecteezy.com/system/resources/thumbnails/022/170/031/small_2x/businessmen-making-handshake-with-partner-greeting-dealing-merger-and-acquisition-business-cooperation-concept-panoramic-banner-copy-space-for-business-finance-and-investment-background-photo.jpeg"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Tú estás seguro, nosotros felices</h3>
            <p>
              Nunca te pediremos tus usuarios, claves, fechas de vencimiento ni
              códigos de seguridad, ni por correo, llamada o mensaje de texto.
            </p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <div style={overlayStyle}></div>
          <img
            className="d-block w-100"
            src="https://images.squarespace-cdn.com/content/v1/5c45fe7331d4df4d221edc98/1604002564883-2IYBV6LMZB6QGH8EOIFI/Commvault-Announces-4-New-Enterprise-Backup-and-Recovery-Solutions.jpg"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>
              {" "}
              <strong>Abrimos La Cuenta Del Mar</strong>{" "}
            </h3>
            <p>
              El primer aporte es nuestro para cuidar los manglares de Colombia.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Tarjetas */}
      <div className="mt-3 mb-3">
        <Row xs={1} md={3} className="g-4">
          <Col>
            <Card style={{ textAlign: "left", backgroundColor: "#f5b6cd" }}>
              <Card.Header style={{ padding: 0 }}>
                <img
                  src="https://i.pinimg.com/originals/8d/d5/62/8dd562fc11844c91f8b0ef252b4f4d8d.png"
                  alt="Imagen de la tarjeta"
                  style={{ width: "100%", height: "auto", objectFit: "cover" }}
                />
              </Card.Header>

              <Card.Body>
                <Card.Subtitle className="mb-1 text-muted">
                  Bancolombia A la mano​
                </Card.Subtitle>
                <Card.Title>
                  <strong>
                    ¿Listo para subir de nivel en app Bancolombia A la mano?​​
                  </strong>
                </Card.Title>
                <Card.Text>
                  Úsala sin límites y desbloquea premios como $1.000.000 y bonos
                  de D1 por $25.000
                </Card.Text>

                <Button
                  variant="outline-dark"
                  shape="pill"
                  style={{ borderRadius: "20px" }}
                >
                  <strong>Conoce más</strong>
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card
              style={{
                textAlign: "left",
                backgroundColor: "#00c389",
                height: "auto",
              }}
            >
              <Card.Header style={{ padding: 0 }}>
                <img
                  src="https://i.pinimg.com/474x/0a/6a/e1/0a6ae1867f7eda7ec795ca8970779551.jpg"
                  alt="Imagen de la tarjeta"
                  style={{ width: "100%", height: "auto", objectFit: "cover" }}
                />
              </Card.Header>

              <Card.Body>
                <Card.Subtitle className="mb-1 text-muted">
                  Bancolombia A la mano​
                </Card.Subtitle>
                <Card.Title>
                  <strong>
                    ¿Listo para subir de nivel en app Bancolombia A la mano?​​
                  </strong>
                </Card.Title>
                <Card.Text>
                  Úsala sin límites y desbloquea premios como $1.000.000 y bonos
                  de D1 por $25.000
                </Card.Text>
                <Button
                  variant="outline-dark"
                  shape="pill"
                  style={{ borderRadius: "20px" }}
                >
                  <strong>Conoce más</strong>
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card style={{ textAlign: "left", backgroundColor: "#FDDA24" }}>
              <Card.Header style={{ padding: 0 }}>
                <img
                  src="https://pbs.twimg.com/profile_images/1576217550098161673/dVCxHOj5_400x400.jpg"
                  alt="Imagen de la tarjeta"
                  style={{ width: "100%", height: "auto", objectFit: "cover" }}
                />
              </Card.Header>

              <Card.Body>
                <Card.Subtitle className="mb-1 text-muted">
                  Bancolombia A la mano​
                </Card.Subtitle>
                <Card.Title>
                  <strong>
                    ¿Listo para subir de nivel en app Bancolombia A la mano?​​
                  </strong>
                </Card.Title>
                <Card.Text>
                  Úsala sin límites y desbloquea premios como $1.000.000 y bonos
                  de D1 por $25.000
                </Card.Text>
                <Button
                  variant="outline-dark"
                  shape="pill"
                  style={{ borderRadius: "20px" }}
                >
                  <strong>Conoce más</strong>
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};
