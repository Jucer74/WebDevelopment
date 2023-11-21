import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const CALI_LOCATION = [3.411889, -76.535565];
const GOOGLE_MAPS_KEY = "AIzaSyC2Tx9WrUBgr8ep_sWJcqmTNP3MQWiYhBM"


const Map = () => {
  const mapUrl = `https://www.google.com/maps/embed/v1/view?key=${GOOGLE_MAPS_KEY}&center=${CALI_LOCATION[0]},${CALI_LOCATION[1]}&zoom=11`;

  return (
    <div>
      <iframe
        title="map"
        width="100%"
        height="450"
        frameBorder="0"
        style={{ border: 0 }}
        src={mapUrl}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Map;
