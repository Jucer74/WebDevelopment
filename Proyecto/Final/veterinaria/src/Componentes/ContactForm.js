import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comment: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí manejarías el envío del formulario (ej., enviar a una API)
    console.log(formData);
  };

  const position = [51.505, -0.09]; // Ejemplo de coordenadas, ajusta según tu ubicación

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <label>
          Comentario:
          <textarea name="comment" value={formData.comment} onChange={handleChange} />
        </label>
        <button type="submit">Enviar</button>
      </form>

      <MapContainer center={position} zoom={13} style={{ height: '300px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            La ubicación de tu veterinaria.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default ContactForm;