// MapaGeolocalizacion.js
import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

const MapaGeolocalizacion = () => {
  const position = [latitud, longitud]; // Reemplaza con las coordenadas reales

  return (
    <Map center={position} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>Aquí está la agencia</Popup>
      </Marker>
    </Map>
  );
};

export default MapaGeolocalizacion;
