import React, { useState, useEffect } from 'react';
import { Carousel, Container, Card, ProgressBar, Button } from 'react-bootstrap';

const baseUrl = "http://127.0.0.1:8000/api/v1/medicos/medicos";

export function Home() {
  const [data, setData] = useState([]);
  const [currentMedico, setCurrentMedico] = useState({
    id: '',
    clinica: '',
    medico_id: 0,
    especialidad: '',
    nombre: '',
    imagen: '',
  });
  const [currentSlide, setCurrentSlide] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl);
        const medicosData = await response.json();
        setData(medicosData);
        if (medicosData.length > 0) {
          setCurrentMedico(medicosData[0]);
        }
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };

    fetchData();
  }, []);

  const handlePrevSlide = () => {
    if (currentSlide > 1) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleNextSlide = () => {
    if (currentSlide < Math.ceil(data.length / 3)) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  return (
    <Container>
      <h1 className="text-center" style={{ color: 'white' }}>Médicos Carousel</h1>

      <Carousel
        interval={null} // Desactiva la transición automática
        nextLabel=""
        prevLabel=""
        indicators={false}
        controls={true}
      >
        {data.map((medico, index) => (
          <Carousel.Item key={index}>
            <div className="d-flex justify-content-around">
              {data
                .slice(index * 3, (index + 1) * 3)
                .map((medico, subIndex) => (
                  <Card key={subIndex} className="medico-card">
                    <Card.Img
                      variant="top"
                      src={medico.imagen}
                      alt={medico.nombre}
                      style={{ width: '150px', height: '150px' }} // Set image size
                    />
                    <Card.Body>
                      <Card.Title>{medico.nombre}</Card.Title>
                      <Card.Text>Especialidad: {medico.especialidad}</Card.Text>
                      <Card.Text>Clínica: {medico.clinica}</Card.Text>
                      <Button
                        variant="primary"
                        onClick={() => setCurrentMedico(medico)}
                      >
                        Detalles
                      </Button>
                    </Card.Body>
                  </Card>
                ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

   

    </Container>
  );
}
