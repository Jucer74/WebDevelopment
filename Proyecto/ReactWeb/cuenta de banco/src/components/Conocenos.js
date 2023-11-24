import React from 'react';
import { Container, Row, Col, Image, Card, ProgressBar } from 'react-bootstrap';

const Conocenos = () => {
  const renderCard = (imgSrc, alt, message, satisfaction) => (
    <Card className="mb-4">
      <Card.Img variant="top" src={imgSrc} alt={alt} />
      <Card.Body>
        <Card.Text className="text-center">{message}</Card.Text>
        <ProgressBar now={satisfaction} label={`${satisfaction}%`} />
      </Card.Body>
    </Card>
  );

  return (
    <Container className="mt-5">
      <h1 className="text-center">Conócenos</h1>
      <p className="text-center">
        Bienvenido a Banco de Bogotá, donde nos esforzamos por brindar servicios financieros de calidad a nuestros clientes.
        Descubre más sobre nosotros y cómo nuestra aplicación móvil puede facilitar tu experiencia bancaria.
      </p>

      <Row className="mt-4">
        <Col xs={12} md={4}>
          {renderCard(
            "https://i.pinimg.com/originals/cf/c1/d8/cfc1d8b69811d4bacb1377e39d5a74c9.jpg",
            "Persona recomendando la aplicación",
            "¡Mira lo fácil que es hacer transacciones con nuestra aplicación!",
            80
          )}
        </Col>

        <Col xs={12} md={4}>
          {renderCard(
            "https://hips.hearstapps.com/elle-es/assets/15/37/original/original-por-ti-rostros-activos-personas-luchadoras-12718597-1-esl-es-rostros-activos-personas-luchadoras-jpg.jpg",
            "Persona recomendando la aplicación",
            "Accede a tus cuentas y realiza pagos desde cualquier lugar.",
            90
          )}
        </Col>

        <Col xs={12} md={4}>
          {renderCard(
            "https://i0.wp.com/www.diarlu.com/wp-content/uploads/2019/09/rostro-mujer-adulta.jpg?resize=500%2C500&ssl=1",
            "Persona recomendando la aplicación",
            "Nuestra aplicación está diseñada pensando en tu comodidad y seguridad.",
            75
          )}
        </Col>
      </Row>

      <p className="text-center mt-4">
        Banco de Bogotá se enorgullece de ofrecer soluciones financieras innovadoras. ¡Descarga nuestra aplicación móvil
        hoy mismo y descubre todo lo que tenemos para ofrecer!
      </p>
    </Container>
  );
};

export default Conocenos;
