import React, { useState, useEffect } from "react";
import { Carousel, Container, Card, Button, Row, Col } from "react-bootstrap";
import "../css/Home.css";
import Casa2 from "../img/OIP.jpg";

export const Home = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/v1/all-propeties");
        if (response.ok) {
          const data = await response.json();
          setProperties(data);
        } else {
          console.error("Error fetching properties:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  const handleDetails = (index) => {
    const selectedProperty = properties[index];

    localStorage.setItem("selectedPropertyId", selectedProperty.id_inmueble);
    console.log(selectedProperty.id_inmueble)
    window.location.href = "/DetailsPropertie";
  };

  return (
    <Container className="container">
      <h1>Home</h1>

      <Carousel indicators={false} slide={true}>
        {[...Array(Math.ceil(properties.length / 3))].map((_, rowIndex) => (
          <Carousel.Item key={rowIndex}>
            <Row>
              {[0, 1, 2].map((colIndex) => {
                const propertyIndex = rowIndex * 3 + colIndex;
                const property = properties[propertyIndex];

                return (
                  <Col key={colIndex} xs={12} md={4}>
                    {property && (
                      <Card style={{ width: "18rem" }}>
                        <Card.Img variant="top" src={Casa2} />
                        <Card.Body>
                          <Card.Title>{property.titulo}</Card.Title>
                          <Card.Text>
                            Dirección: {property.direccion}<br />
                            Precio: {property.precio}<br />
                            Habitaciones: {property.num_habitaciones}<br />
                            Metros Cuadrados: {property.metros_cuadrados}<br />
                            Número de Baños: {property.num_banos}
                          </Card.Text>
                          <Button variant="primary" onClick={() => handleDetails(propertyIndex)}>
                            Detalles
                          </Button>
                        </Card.Body>
                      </Card>
                    )}
                  </Col>
                );
              })}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default Home;
