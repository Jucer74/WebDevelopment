import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Casa from "../img/Logo.png";

const EditPropertie = () => {
  const [precio, setPrecio] = useState(0);
  const [numHabitaciones, setNumHabitaciones] = useState(0);
  const [barrio, setBarrio] = useState('');
  const [metrosCuadrados, setMetrosCuadrados] = useState(0);
  const [numBanos, setNumBanos] = useState(0);
  const [titulo, setTitulo] = useState('');
  const [errores, setErrores] = useState({
    precio: '',
    numHabitaciones: '',
    barrio: '',
    metrosCuadrados: '',
    numBanos: '',
    titulo: '',
  });
  const navigate = useNavigate();

  // Obtener el propertyId almacenado en localStorage
  const propertyId = localStorage.getItem('propertyId');
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    // Realizar la solicitud al servidor para obtener los detalles de la propiedad
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/v1/propertie/${propertyId}`);
        const data = await response.json();
        console.log('Datos de la propiedad:', data);

        // Actualizar el estado con los detalles de la propiedad
        setPrecio(data.precio);
        setNumHabitaciones(data.num_habitaciones);
        setBarrio(data.barrio);
        setMetrosCuadrados(data.metros_cuadrados);
        setNumBanos(data.num_banos);
        setTitulo(data.titulo);
      } catch (error) {
        console.error('Error al obtener los detalles de la propiedad:', error);
      }
    };

    fetchData();
  }, [propertyId]);

  const handleSave = async () => {
    let hayErrores = false;

    if (!precio) {
      setErrores(prevErrores => ({ ...prevErrores, precio: 'Este campo no puede estar vacío' }));
      hayErrores = true;
    } else {
      setErrores(prevErrores => ({ ...prevErrores, precio: '' }));
    }

    if (!numHabitaciones) {
      setErrores(prevErrores => ({ ...prevErrores, numHabitaciones: 'Este campo no puede estar vacío' }));
      hayErrores = true;
    } else {
      setErrores(prevErrores => ({ ...prevErrores, numHabitaciones: '' }));
    }

    if (!barrio) {
      setErrores(prevErrores => ({ ...prevErrores, barrio: 'Este campo no puede estar vacío' }));
      hayErrores = true;
    } else {
      setErrores(prevErrores => ({ ...prevErrores, barrio: '' }));
    }

    if (!metrosCuadrados) {
      setErrores(prevErrores => ({ ...prevErrores, metrosCuadrados: 'Este campo no puede estar vacío' }));
      hayErrores = true;
    } else {
      setErrores(prevErrores => ({ ...prevErrores, metrosCuadrados: '' }));
    }

    if (!numBanos) {
      setErrores(prevErrores => ({ ...prevErrores, numBanos: 'Este campo no puede estar vacío' }));
      hayErrores = true;
    } else {
      setErrores(prevErrores => ({ ...prevErrores, numBanos: '' }));
    }

    if (!titulo) {
      setErrores(prevErrores => ({ ...prevErrores, titulo: 'Este campo no puede estar vacío' }));
      hayErrores = true;
    } else {
      setErrores(prevErrores => ({ ...prevErrores, titulo: '' }));
    }

    if (hayErrores) {
      return;
    }

    const updatedProperty = {
      id_inmueble: parseInt(propertyId, 10),
      precio: precio,
      num_habitaciones: numHabitaciones,
      barrio: barrio,
      metros_cuadrados: metrosCuadrados,
      num_banos: numBanos,
      titulo: titulo,
      creado_por: parseInt(userId, 10),
    };
    console.log(updatedProperty);

    try {

      const response = await fetch(`http://127.0.0.1:8000/api/v1/properties/${propertyId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProperty),
      });

      if (response.ok) {
        console.log('Propiedad actualizada con éxito');
        navigate("/profile");
      } else {
        console.error('Error al actualizar la propiedad:', response.statusText);
      }
    } catch (error) {
      console.error('Error al actualizar la propiedad:', error);
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
          <div className="inputs">
            <span>Precio</span>
            <input
              type="number"
              value={precio}
              onChange={(e) => setPrecio(parseInt(e.target.value, 10))}
            />
            {errores.precio && <p className="error-message">{errores.precio}</p>}
          </div>
          <div className="inputs">
            <span>Número de Habitaciones</span>
            <input
              type="number"
              value={numHabitaciones}
              onChange={(e) => setNumHabitaciones(parseInt(e.target.value, 10))}
            />
            {errores.numHabitaciones && <p className="error-message">{errores.numHabitaciones}</p>}
          </div>
          <div className="inputs">
            <span>Barrio</span>
            <input
              type="text"
              value={barrio}
              onChange={(e) => setBarrio(e.target.value)}
            />
            {errores.barrio && <p className="error-message">{errores.barrio}</p>}
          </div>
          <div className="inputs">
            <span>Metros Cuadrados</span>
            <input
              type="number"
              value={metrosCuadrados}
              onChange={(e) => setMetrosCuadrados(parseInt(e.target.value, 10))}
            />
            {errores.metrosCuadrados && <p className="error-message">{errores.metrosCuadrados}</p>}
          </div>
          <div className="inputs">
            <span>Número de Baños</span>
            <input
              type="number"
              value={numBanos}
              onChange={(e) => setNumBanos(parseInt(e.target.value, 10))}
            />
            {errores.numBanos && <p className="error-message">{errores.numBanos}</p>}
          </div>
          <div className="inputs">
            <span>Título</span>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
            {errores.titulo && <p className="error-message">{errores.titulo}</p>}
          </div>
          <div className="info">
            <button id="savebutton" onClick={handleSave}>
              Guardar
            </button>
            <button id="cancelbutton" onClick={handleCancel}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPropertie;
