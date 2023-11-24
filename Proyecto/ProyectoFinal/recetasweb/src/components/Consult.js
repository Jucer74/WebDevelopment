import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Container, Row, Col, Form, Button } from "react-bootstrap";
import "../style/Consult.css";
import { useNavigate } from 'react-router-dom';

import placeholderImage from "../img/insalata-greca-feta-600x398.jpg";

export const Consult = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchClicked, setSearchClicked] = useState(false);
  const navigate = useNavigate();

  const fetchRecipes = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/recipes/${searchTerm}`);
      if (response.ok) {
        const data = await response.json();
        setRecipes(data);
      } else {
        console.error("Error al obtener recetas:", response.statusText);
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
    const receta_id = recipes[position].id_receta;
    localStorage.setItem('receta_id', receta_id);
    navigate("/EditRecipe");
    console.log(`id receta  :  ${receta_id}`);
    console.log(`Editar receta con pisicion :  ${position}`);
  };

  const handleDeleteRecipe = (recipeId) => {
    // Lógica para manejar la eliminación de la receta con el ID proporcionado
    console.log(`Eliminar receta con ID ${recipeId}`);
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
                placeholder="Buscar recetas"
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
            {recipes.map((recipe, index) => (
              <Col key={index} lg={4} md={6} sm={12} className="mb-4">
                <Card>
                  <Card.Img variant="top" src={recipe.image || placeholderImage} alt={recipe.titulo} />
                  <Card.Body>
                    <Card.Title>{recipe.titulo}</Card.Title>
                    <Card.Text>{recipe.descripcion}</Card.Text>
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

export default Consult;
