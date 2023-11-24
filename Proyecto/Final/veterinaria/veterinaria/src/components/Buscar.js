import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Container, Row, Col, Form, Button } from "react-bootstrap";
import "../css/Consult.css";
import { useNavigate } from 'react-router-dom';

import placeholderImage from "../img/Producto.jpg";

export const Buscar = () => {
  const [products, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchClicked, setSearchClicked] = useState(false);
  const navigate = useNavigate();

  const fetchRecipes = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/productos/${searchTerm}`);
      if (response.ok) {
        const data = await response.json();
        setRecipes(data);
      } else {
        console.error("Error al obtener productos:", response.statusText);
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  useEffect(() => {
    if (searchClicked) {
      fetchRecipes();
      setSearchClicked(false);
    }
  }, [searchClicked, searchTerm]);

  const handleEditRecipe = (position) => {
    const product_id = products[position].id;
    localStorage.setItem('product_id', product_id);
    navigate("/EditProduct");
    console.log(`id receta  :  ${product_id}`);
    console.log(`Editar receta con pisicion :  ${position}`);
  };

  const handleDeleteRecipe = async (position) => {
    try {
      
      const product_id = products[position].id;

      const response = await fetch(`http://127.0.0.1:8000/api/v1/Product/${product_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        // Remove the deleted product from the state
        const updatedProducts = products.filter(product => product.id !== product_id);
        setRecipes(updatedProducts);
      } else {
        console.error("Error al eliminar el producto:", response.statusText);
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return (
    <Container className="typegiant-cards-slider">
      <Row className="content1">
        <Col className="copy-component1">
          <div className="heading-text1">
            <b className="heading-title">Viaje Culinario</b>
            <div className="subheading1">
              <Form.Control
                type="text"
                placeholder="Buscar productos"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="search-button" onClick={() => setSearchClicked(true)}>
                Buscar
              </button>
            </div>
          </div>
        </Col>
        <Col>
          <Row>
            {products.map((products, index) => (
              <Col key={index} lg={4} md={6} sm={12} className="mb-4">
                <Card>
                  <Card.Img variant="top" src={products.image || placeholderImage} alt={products.nombre} />
                  <Card.Body>
                    <Card.Text>{products.descripcion}</Card.Text>
                    <Button variant="primary" onClick={() => handleEditRecipe(index)}>Editar</Button>
                    <Button variant="danger" onClick={() => handleDeleteRecipe(index)}>Eliminar</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Buscar;