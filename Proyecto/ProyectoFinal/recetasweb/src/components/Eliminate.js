// ... Importa los módulos y componentes necesarios
import DeleteRecipe from "./DeleteRecipe"; // Asegúrate de importar la componente DeleteRecipe correctamente

export const Consult = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchClicked, setSearchClicked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editedRecipe, setEditedRecipe] = useState(null);
  const [deletedRecipe, setDeletedRecipe] = useState(null);

  // Resto del código...

  const handleDeleteRecipe = (position) => {
    const selectedRecipe = recipes[position];
    setIsDeleting(true);
    setDeletedRecipe(selectedRecipe);
  };

  const handleConfirmDelete = (recipeId) => {
    // Lógica para eliminar la receta en tu API
    console.log(`Eliminar receta con ID ${recipeId}`);
    // Aquí deberías hacer la llamada a tu API para eliminar la receta
    // y luego actualizar el estado de las recetas
    setIsDeleting(false);
  };

  const handleCancelDelete = () => {
    setIsDeleting(false);
    setDeletedRecipe(null);
  };

  return (
    <Container className="typegiant-cards-slider">
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
              <Button variant="danger" onClick={() => handleDeleteRecipe(index)}>
                Eliminar
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}

      {/* Modales */}
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

      <Modal show={isDeleting} onHide={handleCancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Receta</Modal.Title>
        </Modal.Header>
        <DeleteRecipe
          recipe={deletedRecipe}
          onDelete={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      </Modal>
    </Container>
  );
};

export default Consult;
