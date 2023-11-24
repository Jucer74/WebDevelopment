import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel, Card, Button, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export function Home() {
  const baseUrl = "https://localhost:5001/api/Libros";

  const [data, setData] = useState([]);
  const [currentLibro, setCurrentLibro] = useState({
    id: '',
    titulo: '',
    autor: '',
    precio: 0,
    cantidad: 0,
    imagen: ''
  });

  const getLibros = async () => {
    try {
      const response = await axios.get(baseUrl);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLibros();
  }, []);

  const selectCurrentLibro = (libro) => {
    setCurrentLibro(libro);
    // Puedes realizar la acción que desees al hacer clic en un libro
  };

  const chunkArray = (array, chunkSize) => {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunkedArray.push(array.slice(i, i + chunkSize));
    }
    return chunkedArray;
  };

  const chunkedData = chunkArray(data, 3);

  return (
    <Container className="text-center text-md-left">
      <h1>Libro List</h1>
    
      <Carousel
        slidesToShow={3} // Muestra 3 cartas a la vez en pantallas normales
        responsive={[
          {
            breakpoint: 768, // Cambia a una carta a la vez en pantallas más pequeñas
            settings: {
              slidesToShow: 1,
            }
          }
        ]}
      >
        {chunkedData.map((group, groupIndex) => (
          <Carousel.Item key={groupIndex}>
            <Row>
              {group.map(libro => (
                <Col key={libro.id}>
                  <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={libro.imagen} alt={libro.titulo} />
                    <Card.Body>
                      <Card.Title>{libro.titulo}</Card.Title>
                      <Card.Text>
                        <strong>Autor:</strong> {libro.autor}<br />
                        <strong>Precio:</strong> {libro.precio}<br />
                        <strong>Cantidad:</strong> {libro.cantidad}
                      </Card.Text>
                      <Button variant="outline-primary btn-sm" onClick={() => selectCurrentLibro(libro)}>Detalles</Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
}
