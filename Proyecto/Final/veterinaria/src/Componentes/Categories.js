import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error al cargar categorías', error);
    }
    setLoading(false);
  };

  // Aquí irían los métodos para añadir, editar y eliminar categorías

  if (loading) return <p>Cargando categorías...</p>;

  return (
    <div>
      <h2>Categorías</h2>
      {/* Lista de categorías */}
      {/* Aquí iría el código para mostrar, añadir, editar y eliminar categorías */}
    </div>
  );
}

export default Categories;