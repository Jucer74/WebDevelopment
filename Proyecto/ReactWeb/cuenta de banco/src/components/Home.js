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
    borderRadius: "20px",
  };

  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };
  

  return (
    <div>
      {/* Carrusel */}
      <Carousel className="mt-3">
        
        <Carousel.Item>
          <div style={overlayStyle}></div>
          <img
            className="d-block w-100 img-fluid"
            src="https://cdn.forbes.co/2020/09/Banco-de-Bogota-2-scaled.jpg"
            alt="First slide"
            style={imageStyle}
          />
          <Carousel.Caption>
            <h3>Crear tu cuenta con más beneficios que otros bancos</h3>
            <p>En dos simples pasos, consulta en nuestra aplicación del Banco de Bogotá todos los detalles de tu cuenta de ahorros.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <div style={overlayStyle}></div>
          <img
            className="d-block w-100 img-fluid"
            src="https://www.shutterstock.com/shutterstock/photos/1696407022/display_1500/stock-photo-stack-of-gold-bars-financial-concepts-1696407022.jpg"
            alt="Second slide"
            style={imageStyle}
          />
          <Carousel.Caption>
            <h3>Tú estás más seguro con nosotros</h3>
            <p>En ningún momento solicitaremos tus nombres de usuario, contraseñas, fechas de vencimiento ni códigos de seguridad, ya sea por correo electrónico, llamada telefónica o mensaje de texto.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <div style={overlayStyle}></div>
          <img
            className="d-block w-100 img-fluid"
            src="https://www.shutterstock.com/shutterstock/photos/2290265561/display_1500/stock-photo-woman-standing-against-golden-gate-bridge-2290265561.jpg"
            alt="Third slide"
            style={imageStyle}
          />
          <Carousel.Caption>
            <h3>
              <strong>Hemos iniciado La Cuenta Verde</strong>
            </h3>
            <p>La primera contribución es nuestra para preservar los bosques tropicales de Colombia.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Tarjetas */}
      <div className="mt-3 mb-3">
        <Row xs={1} md={3} className="g-4">
          <Col>
            <Card className="mb-3" style={{ textAlign: "left", backgroundColor: "#f5b6cd" }}>
              <Card.Header style={{ padding: 0 }}>
                <img
                  src="https://minciencias.gov.co/sites/default/files/banco_de_bogota.jpg"
                  alt="Imagen de la tarjeta"
                  style={imageStyle}
                />
              </Card.Header>
              <Card.Body>
                <Card.Subtitle className="mb-1 text-muted">
                  aplicación movil del banco de Bogotá
                </Card.Subtitle>
                <Card.Title>
                  <strong>
                    ¿Listo para llevar tu experiencia al siguiente nivel con la aplicación móvil del Banco de Bogotá?​​
                  </strong>
                </Card.Title>
                <Card.Text>
                  Úsala sin límites y desbloquea premios como $500.000 y bonos de D1 por $20.000
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
            <Card className="mb-3" style={{ textAlign: "left", backgroundColor: "#00c389", height: "auto" }}>
              <Card.Header style={{ padding: 0 }}>
                <img
                  src="https://www.portafolio.co/files/article_main/uploads/2022/08/05/62ecad91573e1.jpeg"
                  alt="Imagen de la tarjeta"
                  style={imageStyle}
                />
              </Card.Header>
              <Card.Body>
                <Card.Subtitle className="mb-1 text-muted">
                  aplicación movil de banco de Bogotá
                </Card.Subtitle>
                <Card.Title>
                  <strong>
                    ¿Preparado para llevar tu experiencia al siguiente nivel con la aplicación móvil del Banco de Bogotá? Descubre cómo maximizar su uso y agilizar tus operaciones bancarias directamente desde tu teléfono.
                  </strong>
                </Card.Title>
                <Card.Text>
                  Aprovecha al máximo su potencial y desbloquea recompensas como $500,000 y bonos de D1 por $20,000 al utilizarla sin restricciones.
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
            <Card className="mb-3" style={{ textAlign: "left", backgroundColor: "#FDDA24" }}>
              <Card.Header style={{ padding: 0 }}>
                <img
                  src="https://global-uploads.webflow.com/58c5b8748712539d1de79645/6086abb58ea29a85e3bc7596_WhatsApp%2520Image%25202021-04-19%2520at%25207.54.45%2520AM%2520_1_.jpeg"
                  alt="Imagen de la tarjeta"
                  style={imageStyle}
                />
              </Card.Header>
              <Card.Body>
                <Card.Subtitle className="mb-1 text-muted">
                  App Móvil Banco de Bogotá
                </Card.Subtitle>
                <Card.Title>
                  <strong>
                    ¿Busca sacar más provecho de la App Móvil Banco de Bogotá? Descubra cómo optimizar su uso para agilizar sus operaciones bancarias desde su teléfono.
                  </strong>
                </Card.Title>
                <Card.Text>
                  Úsala sin restricciones y accede a recompensas como $1.000.000 y bonos de D1 por $25.000 en el Banco Bogotá.
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
