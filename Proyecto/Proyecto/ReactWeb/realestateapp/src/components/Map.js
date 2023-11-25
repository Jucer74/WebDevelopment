import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export const Map = () => {
  const center = [3.4516, -76.5320];

  return (
    <MapContainer center={center} zoom={13} style={{ height: '300px', width: '100%' }} >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};

