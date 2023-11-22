import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Products({ categoryId }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [categoryId]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/products?categoryId=${categoryId}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error al cargar productos', error);
    }
    setLoading(false);
  };

  // Aquí irían los métodos para añadir, editar y eliminar productos

  if (loading) return <p>Cargando productos...</p>;

  return (
    <div>
      <h2>Productos</h2>
      {/* Lista de productos */}
      {/* Aquí iría el código para mostrar, añadir, editar y eliminar productos */}
    </div>
  );
}

export default Products;