// OpcionMaestro.js
import React from 'react';

const OpcionMaestro = () => {
  // Aquí puedes definir el contenido o datos que se mostrarán en la opción maestro
  const paquetesViaje = [
    { id: 1, nombre: 'Paquete A', descripcion: 'Descripción del Paquete A' },
    { id: 2, nombre: 'Paquete B', descripcion: 'Descripción del Paquete B' },
    // Agrega más paquetes según sea necesario
  ];

  return (
    <div>
      <h2>Paquetes de Viaje Destacados</h2>
      <ul>
        {paquetesViaje.map((paquete) => (
          <li key={paquete.id}>
            <strong>{paquete.nombre}</strong>
            <p>{paquete.descripcion}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OpcionMaestro;
