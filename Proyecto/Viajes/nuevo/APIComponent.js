// src/components/APIComponent.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const APIComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/destinos').then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <div>
      {/* Renderizar datos de la API */}
    </div>
  );
};

export default APIComponent;
