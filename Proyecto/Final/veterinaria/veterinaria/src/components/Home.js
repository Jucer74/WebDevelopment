import React, { useState, useEffect } from "react";
import { Carousel, Container, Card, Button, Row, Col } from "react-bootstrap";
import "../css/Home.css";
import Casa2 from "../img/RebajasNavidad.jpg";
import Casa3 from "../img/QuienesSomos.jpg";
import Casa4 from "../img/Funebres.png";
import Casa5 from "../img/Jornada.jpg";
import Casa6 from "../img/TipsDiarios.jpg";


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
    console.log(selectedProperty.id_inmueble);
    window.location.href = "/DetailsPropertie";
  };

  return (
    <Container className="text-center container">


      <Carousel>
        <Carousel.Item>
          <Card style={{ width: "40rem" }}>
            <Card.Img variant="top" src={Casa6} />
            <Card.Body>
              <Card.Title> Nuestra nueva seccion: Tips Diarios </Card.Title>
              <Card.Text>
                No te los pierdas
              </Card.Text>
            </Card.Body>
          </Card>
        </Carousel.Item>

        <Carousel.Item>
          <Card style={{ width: "40rem" }}>
            <Card.Img variant="top" src={Casa5} />
            <Card.Body>
              <Card.Title> NO TE LO PIERDAS </Card.Title>
              <Card.Text>
        
              </Card.Text>
            </Card.Body>
          </Card>
        </Carousel.Item>
        <Carousel.Item>
          <Card style={{ width: "40rem" }}>
            <Card.Img variant="top" src={Casa2} />
            <Card.Body>
              <Card.Title> Gran PROMO </Card.Title>
              <Card.Text>
                Mas del 20% en productos seleccionados
             </Card.Text>
            </Card.Body>
          </Card>
        </Carousel.Item>
      </Carousel>
      <Card style={{ width: "40rem" }}>
            <Card.Img variant="top" src={Casa3} />
            <Card.Body>
              <Card.Title> Quienes Somos: </Card.Title>
              <Card.Text>
                <br />
                Somos una empresa dedicada al cuidado de las mascotas
                que lleva en el mercado desde el año 2002
                trabajando en pro del bienestar de cada mascota.
                Ofrecemos todo tipo de servicios especializados y de la mejor calidad. <br />
                <br />
                Siempre pensando en la salud y el bienestar de las mascotas
                y en la tranquilidad de nuestros usuarios.
                En nuestra tienda para mascotas, encontrarás todo tipo de accesorios
                y utilidades que te podrán facilitar la vida con tu mascota
                y a su vez mejorar su salud y estado de ánimo.
              </Card.Text>
            </Card.Body>
          </Card>
      <Card style={{ width: "40rem" }}>
            <Card.Img variant="top" src={Casa4} />
            <Card.Body>
              <Card.Title> Proximamente </Card.Title>
              <Card.Text>
                Servicio Exequial para tu amigo
              </Card.Text>
            </Card.Body>
          </Card>
    </Container>
  );
};

export default Home;
