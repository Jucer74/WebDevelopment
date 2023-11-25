import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Button, Container, Table, Form, ButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


const Recipes = () => {
  const baseUrl = "https://localhost:3001/api/Recipes";
  const categoriesUrl = "https://localhost:3001/api/Categories";

  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentRecipe, setCurrentRecipe] = useState({
    id: 0,
    name: '',
    ingredients: '',
    difficulty: '',
    estimatedTime: '',
    categoryId: 0,
  });
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [showModalDetails, setShowModalDetails] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);

  const openCloseModalCreate = () => {
    setShowModalCreate(!showModalCreate);
  }

  const openCloseModalUpdate = () => {
    setShowModalUpdate(!showModalUpdate);
  }

  const openCloseModalDetails = () => {
    setShowModalDetails(!showModalDetails);
  }

  const openCloseModalDelete = () => {
    setShowModalDelete(!showModalDelete);
  }


  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentRecipe({
      ...currentRecipe,
      [name]: value
    })
  }

  const getRecipes = async () => {
    await axios.get(baseUrl)
      .then(response => {
        setData(response.data);
      }).catch(error => {
        console.log(error);
      });
  }

  const getCategories = async () => {
    await axios.get(categoriesUrl)
      .then(response => {
        setCategories(response.data);
      }).catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    getRecipes();
    getCategories();
  }, []);

  const getCategoryNameById = (categoryId) => {
    const category = categories.find((c) => c.id === categoryId);
    return category ? category.categoryName : 'Unknown Category';
  };
  

  const postRecipe = async () => {
    delete currentRecipe.id;
    await axios.post(baseUrl, currentRecipe)
      .then(() => {
        getRecipes();
        openCloseModalCreate();
      }).catch(error => {
        console.log(error);
      });
  }

  const putRecipe = async () => {
    await axios.put(baseUrl + "/" + currentRecipe.id, currentRecipe)
      .then(response => {
        var result = response.data;
        var updatedData = data.map(recipe => recipe.id === currentRecipe.id ? result : recipe);
        setData(updatedData);
        openCloseModalUpdate();
      }).catch(error => {
        console.log(error);
      });
  }

  const deleteRecipe = async (id) => {
    await axios.delete(baseUrl + "/" + id)
      .then(() => {
        setData(data.filter(recipe => recipe.id !== id));
        openCloseModalDelete();
      }).catch(error => {
        console.log(error);
      });
  }

  const selectCurrentRecipe = (recipe, action) => {
    setCurrentRecipe(recipe);
    switch (action) {
      case "Edit":
        openCloseModalUpdate();
        break;
      case "Details":
        openCloseModalDetails();
        break;
      case "Delete":
        openCloseModalDelete();
        break;
      default:
        break;
    }
  }

  return (
    <Container style={{ background: 'rgb(40, 54, 24)' }} className="text-center text-md-left">
      <h1 className="text-light mt-3 mb-3">Recipes List</h1>
      <p>
        <Button style={{ background: 'rgb(96, 108, 56)' }} variant="success btn-sm" onClick={() => openCloseModalCreate()}>
          <FontAwesomeIcon icon={faPlus} /> New Recipe
        </Button>
      </p>
      <Table style={{ background: 'rgb(254, 250, 224)' }} responsive striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Recipe Name</th>
            <th>Category</th>
            <th>Ingredients</th>
            <th>Difficulty</th>
            <th>Estimated Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(recipe => (
            <tr key={recipe.id}>
              <td>{recipe.id}</td>
              <td>{recipe.name}</td>
              <td>{getCategoryNameById(recipe.categoryId)}</td>
              <td>{recipe.ingredients}</td>
              <td>{recipe.difficulty}</td>
              <td>{recipe.estimatedTime}</td>
              <td className="text-center">
                <ButtonGroup>
                  <Button variant="outline-primary btn-sm" onClick={() => selectCurrentRecipe(recipe, "Edit")}>Edit</Button>
                  <Button variant="outline-primary btn-sm" onClick={() => selectCurrentRecipe(recipe, "Details")}>Details</Button>
                  <Button variant="outline-danger btn-sm" onClick={() => selectCurrentRecipe(recipe, "Delete")}>Delete</Button>
                </ButtonGroup>
            </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Create */}
      <Modal isOpen={showModalCreate}>
        <ModalHeader>Create Recipe</ModalHeader>
        <ModalBody>
          <Form>
            <Form.Group>
              <Form.Label>Recipe Name:</Form.Label>
              <Form.Control type="text" id="txtRecipeName" name="name" placeholder="Recipe Name" required onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Category:</Form.Label>
              <Form.Control as="select" id="ddlCategory" name="categoryId" onChange={handleChange} required>
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.categoryName}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Ingredients:</Form.Label>
              <Form.Control as="textarea" id="txtIngredients" name="ingredients" placeholder="Ingredients" required onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Difficulty:</Form.Label>
              <Form.Control type="text" id="txtDifficulty" name="difficulty" placeholder="Difficulty" onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Estimated Time:</Form.Label>
              <Form.Control type="text" id="txtEstimatedTime" name="estimatedTime" placeholder="Estimated Time" onChange={handleChange} />
            </Form.Group>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" onClick={() => postRecipe()}>Create</Button>
          <Button variant="outline-info" onClick={() => openCloseModalCreate()}>Back</Button>
        </ModalFooter>
      </Modal>

      {/* Update */}
      <Modal isOpen={showModalUpdate}>
        <ModalHeader>Edit Recipe</ModalHeader>
        <ModalBody>
          <Form>
            <Form.Group>
              <Form.Label>Id:</Form.Label>
              <Form.Control type="text" id="txtId" name="id" readOnly value={currentRecipe.id} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Recipe Name:</Form.Label>
              <Form.Control type="text" id="txtRecipeName" name="name" placeholder="Recipe Name" required onChange={handleChange} value={currentRecipe.name} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Category:</Form.Label>
              <Form.Control as="select" id="ddlCategory" name="categoryId" onChange={handleChange} required value={currentRecipe.categoryId}>
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.categoryName}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Ingredients:</Form.Label>
              <Form.Control as="textarea" id="txtIngredients" name="ingredients" placeholder="Ingredients" required onChange={handleChange} value={currentRecipe.ingredients} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Difficulty:</Form.Label>
              <Form.Control type="text" id="txtDifficulty" name="difficulty" placeholder="Difficulty" onChange={handleChange} value={currentRecipe.difficulty} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Estimated Time:</Form.Label>
              <Form.Control type="text" id="txtEstimatedTime" name="estimatedTime" placeholder="Estimated Time" onChange={handleChange} value={currentRecipe.estimatedTime} />
            </Form.Group>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" onClick={() => putRecipe()}>Save</Button>
          <Button variant="outline-info" onClick={() => openCloseModalUpdate()}>Back</Button>
        </ModalFooter>
      </Modal>

      {/* Details */}
      <Modal isOpen={showModalDetails}>
        <ModalHeader>Recipe Details</ModalHeader>
        <ModalBody>
          <Form>
            <Form.Group>
              <Form.Label>Id:</Form.Label>
              <Form.Control type="text" id="txtId" name="id" readOnly value={currentRecipe.id} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Recipe Name:</Form.Label>
              <Form.Control type="text" id="txtRecipeName" name="name" readOnly value={currentRecipe.name} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Category:</Form.Label>
              <Form.Control type="text" id="txtCategory" name="category" readOnly value={getCategoryNameById(currentRecipe.categoryId)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Ingredients:</Form.Label>
              <Form.Control as="textarea" id="txtIngredients" name="ingredients" readOnly value={currentRecipe.ingredients} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Difficulty:</Form.Label>
              <Form.Control type="text" id="txtDifficulty" name="difficulty" readOnly value={currentRecipe.difficulty} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Estimated Time:</Form.Label>
              <Form.Control type="text" id="txtEstimatedTime" name="estimatedTime" readOnly value={currentRecipe.estimatedTime} />
            </Form.Group>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline-info" onClick={() => openCloseModalDetails()}>Back</Button>
        </ModalFooter>
      </Modal>

      {/* Delete */}
      <Modal isOpen={showModalDelete}>
        <ModalHeader>Are you sure to delete this recipe?</ModalHeader>
        <ModalBody>
          <Form>
            <Form.Group>
              <Form.Label><b>Id:</b></Form.Label>
              <Form.Label>{currentRecipe.id}</Form.Label><br />
              <Form.Label><b>Recipe Name:</b></Form.Label>
              <Form.Label>{currentRecipe.name}</Form.Label><br />
              <Form.Label><b>Category:</b></Form.Label>
              <Form.Label>{getCategoryNameById(currentRecipe.categoryId)}</Form.Label><br />
              <Form.Label><b>Ingredients:</b></Form.Label>
              <Form.Label>{currentRecipe.ingredients}</Form.Label><br />
              <Form.Label><b>Difficulty:</b></Form.Label>
              <Form.Label>{currentRecipe.difficulty}</Form.Label><br />
              <Form.Label><b>Estimated Time:</b></Form.Label>
              <Form.Label>{currentRecipe.estimatedTime}</Form.Label><br />
            </Form.Group>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button variant="danger" onClick={() => deleteRecipe(currentRecipe.id)}>Delete</Button>
          <Button variant="outline-info" onClick={() => openCloseModalDelete()}>Back</Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
}


export default Recipes;
