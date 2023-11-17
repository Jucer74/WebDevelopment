import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import ImagenDerecha from "../../Assets/Images/PizzaRegister.jpg";
import "../../Components/Maps/Mapas.css";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";
import L from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const myIcon = L.icon({
  iconUrl: markerIconPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function Mapa() {
  const position = [3.338296, -76.5349];
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    descripcion: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Agrega aquí lógica para enviar el formulario
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container">
      <div className="col col-xl-12">
        <div className="card" style={{ borderRadius: "1rem" }}>
          <div className="row g-0">
            <div className="col-md-6 col-lg-5 d-flex align-items-center">
              <MapContainer
                center={position}
                zoom={20}
                style={{ height: "70%", minHeight: "300px", width: "100%", margin: "20px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position} icon={myIcon}>
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
            <div className="col-md-6 col-lg-7 d-flex align-items-center">
              <div className="card-body p-4 p-lg-5 text-black">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">
                      Nombre
                    </label>
                    <input type="text" className="form-control" id="nombre" name="nombre" onChange={handleInputChange} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="telefono" className="form-label">
                      Teléfono
                    </label>
                    <input type="tel" className="form-control" id="telefono" name="telefono" onChange={handleInputChange} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="descripcion" className="form-label">
                      Descripción
                    </label>
                    <textarea className="form-control" id="descripcion" name="descripcion" onChange={handleInputChange} required></textarea>
                  </div>
                  <div className="d-flex justify-content-between" style={{ "margin-left": "20%" ,  "margin-right": "20%"  }}>
                    <Link to="/MenuPage" className="btn btn-dark btn-lg" >
                      Ordena Aquí
                    </Link>
                    <button type="submit" className="btn btn-dark btn-lg">
                      Enviar Contacto
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de React-Bootstrap */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Mensaje de Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Tu contacto fue enviado con éxito. En breve serás contactado.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Mapa;
