import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import EditRecipe from "./EditRecipe"; // Asegúrate de importar la componente EditRecipe correctamente
import placeholderImage from "../img/insalata-greca-feta-600x398.jpg";

export const Consult = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchClicked, setSearchClicked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedRecipe, setEditedRecipe] = useState(null);

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
    const selectedRecipe = recipes[position];
    setIsEditing(true);
    setEditedRecipe(selectedRecipe);
  };

  const handleSaveEditedRecipe = (editedRecipe) => {
    // Lógica para guardar la receta editada en tu API
    console.log("Receta editada:", editedRecipe);
    // Aquí deberías hacer la llamada a tu API para guardar los cambios
    // y luego actualizar el estado de las recetas
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedRecipe(null);
  };

  return (
    <Container className="typegiant-cards-slider">
      <Row className="content1">
        {/* ... Resto del código ... */}
        {recipes.map((recipe, index) => (
          <Col key={index} lg={4} md={6} sm={12} className="mb-4">
            <Card>
              <Card.Img variant="top" src={recipe.image || placeholderImage} alt={recipe.titulo} />
              <Card.Body>
                <Card.Title>{recipe.titulo}</Card.Title>
                <Card.Text>{recipe.descripcion}</Card.Text>
                <Button variant="primary" onClick={() => handleEditRecipe(index)}>
                  Editar
                </Button>
                {/* ... Resto del código ... */}
              </Card.Body>
            </Card>
          </Col>
        ))}

        {/* Modal para la edición */}
        <Modal show={isEditing} onHide={handleCancelEdit}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Receta</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {editedRecipe && (
              <EditRecipe
                recipe={editedRecipe}
                onSave={handleSaveEditedRecipe}
                onCancel={handleCancelEdit}
              />
            )}
          </Modal.Body>
        </Modal>
      </Row>
    </Container>
  );
};

export default Consult;
