import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Casa from "../img/Logo.png";

const DeletePropertie = () => {
  const [property, setProperty] = useState(null);
  const navigate = useNavigate();
  const propertyId = localStorage.getItem('propertyId');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/v1/propertie/${propertyId}`);
        const data = await response.json();
        console.log('Datos de la propiedad:', data);
        setProperty(data);
      } catch (error) {
        console.error('Error al obtener los detalles de la propiedad:', error);
      }
    };

    fetchData();
  }, [propertyId]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/Properties/${propertyId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Propiedad eliminada con éxito');
        navigate("/profile");
      } else {
        console.error('Error al eliminar la propiedad:', response.statusText);
      }
    } catch (error) {
      console.error('Error al eliminar la propiedad:', error);
    }
  };

  const handleCancel = () => {
    navigate("/profile");
  };

  return (
    <div className="container">
      <div className="card">
        <div className="info">
          <img src={Casa} alt="User" style={{ width: '100%', maxWidth: '150px', height: 'auto', marginTop: '10px' }} />
        </div>
        <div className="forms">
          {property && (
            <>
              <div className="inputs">
                <span>Precio: {property.precio}</span>
              </div>
              <div className="inputs">
                <span>Número de Habitaciones: {property.num_habitaciones}</span>
              </div>
              <div className="inputs">
                <span>Barrio: {property.barrio}</span>
              </div>
              <div className="inputs">
                <span>Metros Cuadrados: {property.metros_cuadrados}</span>
              </div>
              <div className="inputs">
                <span>Número de Baños: {property.num_banos}</span>
              </div>
              <div className="inputs">
                <span>Título: {property.titulo}</span>
              </div>
              <div className="info">
                <button id="deletebutton" onClick={handleDelete}>
                  Eliminar
                </button>
                <button id="cancelbutton" onClick={handleCancel}>
                  Cancelar
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeletePropertie;
