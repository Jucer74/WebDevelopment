import React, { useState } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Form,
  Button,
  Image,
} from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "leaflet/dist/leaflet.css";
import "react-toastify/dist/ReactToastify.css";
import L from "leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet/dist/leaflet.css";

export const Contact = () => {
  const iconUrl = "https://cdn-icons-png.flaticon.com/512/2794/2794702.png";

  const defaultIcon = new L.Icon({
    iconUrl,
    iconRetinaUrl: iconUrl,
    iconAnchor: [12, 12],
    popupAnchor: [1, 1],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(25, 25),
    className: "leaflet-div-icon",
  });

  const mapCenter = [3.420269, -76.51719];
  const mapBounds = [
    [3.420269, -76.51719],
    [3.420269, -76.51719],
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    question: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.name || !formData.email || !formData.question) {
      toast.error("Please complete all fields.");
      return;
    }

    toast.success("Successful shipment");

    setFormData({
      name: "",
      email: "",
      question: "",
    });
  };

  return (
    <Container>
      <Card className="mt-4">
        <h1 className="mt-2">Envíanos tus comentarios</h1>
        <Card.Body>
          <Row>
            <Col md={6}>
              {/* Formulario de contacto */}
              <Form onSubmit={handleSubmit}>
                <Image
                  src="https://bogota.gov.co/sites/default/files/2020-04/logo-bancolombia-2.jpg"
                  alt="Imagen de perfil"
                  style={{ width: "100%" }}
                  className="mb-3"
                />
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Ingrese su nombre..."
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Correo Electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Ingrese su correo electrónico..."
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formQuestion">
                  <Form.Label>Comentarios</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="question"
                    placeholder="Comentanos lo que quieras..."
                    value={formData.question}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Enviar
                </Button>
              </Form>
            </Col>

            <Col md={6} className="mt-2">
              {/* Mapa de geolocalización */}
              <MapContainer
                center={mapCenter}
                zoom={15}
                style={{ height: "70vh", width: "100%" }}
                maxBounds={mapBounds}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={mapCenter} icon={defaultIcon}>
                  <Popup>Bancolombia</Popup>
                </Marker>
              </MapContainer>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Toastify Container */}
      <ToastContainer />
    </Container>
  );
};
