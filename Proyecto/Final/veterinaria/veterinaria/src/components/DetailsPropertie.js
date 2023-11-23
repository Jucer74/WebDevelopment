import React, { useState, useEffect } from "react";
import { Container, Card, Button } from "react-bootstrap";
import Casa2 from "../img/Logo.png";
import { useNavigate } from "react-router-dom";

export const DetailsPropertie = () => {
  const [propertyDetails, setPropertyDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {

    const selectedPropertyId = localStorage.getItem("selectedPropertyId");

    const fetchPropertyDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/v1/propertie/${selectedPropertyId}`);
        if (response.ok) {
          const data = await response.json();
          setPropertyDetails(data);
        } else {
          console.error("Error fetching property details:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching property details:", error);
      }
    };

    if (selectedPropertyId) {
      fetchPropertyDetails();
    }
  }, []);

  const handleContactSeller = () => {

    navigate("/contactenos");
  };

  return (
    <Container className="container">
      <h1>Details</h1>

      {propertyDetails ? (
        <Card style={{ width: "60%", margin: "auto" }}>
          <Card.Img variant="top" src={Casa2} />
          <Card.Body>
            <Card.Title>{propertyDetails.titulo}</Card.Title>
            <Card.Text>
              Barrio: {propertyDetails.barrio}<br />
              Precio: {propertyDetails.precio}<br />
              Habitaciones: {propertyDetails.num_habitaciones}<br />
              Metros Cuadrados: {propertyDetails.metros_cuadrados}<br />
              Número de Baños: {propertyDetails.num_banos}
            </Card.Text>
            <Button variant="primary" onClick={handleContactSeller}>
              Contactar al vendedor
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <p>Cargando detalles...</p>
      )}
    </Container>
  );
};

export default DetailsPropertie;
