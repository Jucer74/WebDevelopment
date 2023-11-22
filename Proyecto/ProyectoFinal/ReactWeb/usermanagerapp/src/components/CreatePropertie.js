import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Casa from "../img/casa.jpg";

export const CreatePropertie = () => {
  const [precio, setPrecio] = useState('');
  const [numHabitaciones, setNumHabitaciones] = useState('');
  const [barrio, setBarrio] = useState('');
  const [metrosCuadrados, setMetrosCuadrados] = useState('');
  const [numBanos, setNumBanos] = useState('');
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

  const handleSave = async () => {
    const userId = localStorage.getItem('user_id');
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

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/propertie/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_inmueble: 0,
          precio: parseInt(precio, 10),
          num_habitaciones: parseInt(numHabitaciones, 10),
          barrio: barrio,
          metros_cuadrados: parseInt(metrosCuadrados, 10),
          num_banos: parseInt(numBanos, 10),
          titulo: titulo,
          creado_por: parseInt(userId, 10),
        }),
      });

      if (!response.ok) {
        throw new Error(`Error al crear la propiedad: ${response.statusText}`);
      }

      const responseData = await response.json();
      console.log('Propiedad creada con éxito:', responseData);
      navigate("/profile");
    } catch (error) {
      console.error(error.message);
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
              onChange={(e) => setPrecio(e.target.value)}
            />
            {errores.precio && <p className="error-message">{errores.precio}</p>}
          </div>
          <div className="inputs">
            <span>Número de Habitaciones</span>
            <input
              type="number"
              value={numHabitaciones}
              onChange={(e) => setNumHabitaciones(e.target.value)}
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
              onChange={(e) => setMetrosCuadrados(e.target.value)}
            />
            {errores.metrosCuadrados && <p className="error-message">{errores.metrosCuadrados}</p>}
          </div>
          <div className="inputs">
            <span>Número de Baños</span>
            <input
              type="number"
              value={numBanos}
              onChange={(e) => setNumBanos(e.target.value)}
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

export default CreatePropertie;
