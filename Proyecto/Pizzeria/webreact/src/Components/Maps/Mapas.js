import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import ImagenDerecha from "../../Assets/Images/PizzaRegister.jpg"; // Reemplaza esto con la ruta de tu imagen de la derecha
import "../../Components/Maps/Mapas.css";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom"; 

import L from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";

const myIcon = L.icon({
  iconUrl: markerIconPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function Mapa() {
  const position = [3.338296, -76.5349]; // Reemplaza esto con las coordenadas de tu ubicación
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
                <img
                  src={ImagenDerecha} // Reemplaza esto con la ruta de tu imagen de la derecha
                  alt="Imagen Derecha"
                  className="img-fluid"
                  style={{
                    borderRadius: "1rem 0 0 1rem",
                    width: "100%",
                    height: "80%",
                    objectFit: "cover", // Controla cómo la imagen se ajusta al contenedor
                    "margin-bottom": "2rem",
                  }}
                />

                <Link
            to="/MenuPage" className="btn btn-dark btn-lg btn-block" type="submit" style={{ "margin-bottom": "-0.01rem" }}>
                  Ordena Aquí
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mapa;
