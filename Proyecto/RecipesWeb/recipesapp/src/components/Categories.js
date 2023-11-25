import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Button, Container, Table, Form, ButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Categories = () => {
  const baseUrl = "https://localhost:3001/api/Categories";

  const [data, setData] = useState([]);
  const [currentCategory, setCurrentCategory] = useState({
    id: 0,
    categoryName: '',
  });

  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [recipesForCategory, setRecipesForCategory] = useState([]);

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
    setCurrentCategory({
      ...currentCategory,
      [name]: value
    })
  }

  const getCategories = async () => {
    await axios.get(baseUrl)
      .then(response => {
        setData(response.data);
      }).catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    getCategories();
  }, []);

  const postCategory = async () => {
    delete currentCategory.id;
    await axios.post(baseUrl, currentCategory)
      .then(() => {
        getCategories();
        openCloseModalCreate();
      }).catch(error => {
        console.log(error.response);
      });
  }

  const putCategory = async () => {
    await axios.put(baseUrl + "/" + currentCategory.id, currentCategory)
      .then(response => {
        var result = response.data;
        var updatedData = data.map(category => category.id === currentCategory.id ? result : category);
        setData(updatedData);
        openCloseModalUpdate();
      }).catch(error => {
        console.log(error);
      });
  }

  const deleteCategory = async () => {
  try {
    const recipesUrl = `https://localhost:3001/api/Categories/${currentCategory.id}/Recipes`;
    const response = await axios.get(recipesUrl);
    const recipesForCategory = response.data;

    if (recipesForCategory.length > 0) {
      const confirmDeleteRecipes = window.confirm(
        `There are ${recipesForCategory.length} recipes associated with this category. Do you want to delete them as well?`
      );

      if (confirmDeleteRecipes) {
        await Promise.all(
          recipesForCategory.map(async (recipe) => {
            await axios.delete(`https://localhost:3001/api/Recipes/${recipe.id}`);
          })
        );
      } else {
        return;
      }
    }

    await axios.delete(baseUrl + "/" + currentCategory.id);
    setData(data.filter(category => category.id !== currentCategory.id));
    openCloseModalDelete();
  } catch (error) {
    console.error("Error deleting category:", error);
  }
}  

  const selectCurrentCategory = (category, action) => {
    setCurrentCategory(category);
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
  

  const viewRecipes = async (categoryId) => {
    const recipesUrl = `https://localhost:3001/api/Categories/${categoryId}/Recipes`;

    await axios.get(recipesUrl)
      .then(response => {
        setRecipesForCategory(response.data);
        setSelectedCategoryId(categoryId);
      })
      .catch(error => {
        console.log(error);
      });
  }

  const getCategoryNameByIdCategories = (categoryId) => {
    const category = data.find((c) => c.id === categoryId);
    return category ? category.categoryName : 'Unknown Category';
  };

  return (
    <Container style={{ background: 'rgb(40, 54, 24)' }} className="text-center text-md-left rounded">
      <h1 className="text-light mt-3 mb-3">Category List</h1>
      <p>
        <Button style={{ background: 'rgb(96, 108, 56)' }} variant="success btn-sm" onClick={() => openCloseModalCreate()}>
          <FontAwesomeIcon icon={faPlus} /> New Category
        </Button>
      </p>
      <Table style={{ background: 'rgb(254, 250, 224)' }} responsive striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Category Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(category => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.categoryName}</td>
              <td className="text-center">
                <ButtonGroup>
                  <Button variant="outline-primary btn-sm" onClick={() => selectCurrentCategory(category, "Edit")}>Edit</Button>{" "}
                  <Button variant="outline-primary btn-sm" onClick={() => selectCurrentCategory(category, "Details")}>Details</Button>{" "}
                  <Button variant="outline-danger btn-sm" onClick={() => selectCurrentCategory(category, "Delete")}>Delete</Button>{" "}
                  <Button style={{ background: 'rgb(96, 108, 56)' }} variant="success btn-sm" onClick={() => viewRecipes(category.id)}>Recipes</Button>
                  </ButtonGroup>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Create */}
      <Modal isOpen={showModalCreate}>
        <ModalHeader>Create Category</ModalHeader>
        <ModalBody>
          <Form>
            <Form.Group>
              <Form.Label>Category Name:</Form.Label>
              <Form.Control type="text" id="txtCategoryName" name="categoryName" placeholder="Category Name" required onChange={handleChange} />
            </Form.Group>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" onClick={() => postCategory()}>Create</Button>
          <Button variant="outline-info" onClick={() => openCloseModalCreate()}>Back</Button>
        </ModalFooter>
      </Modal>

      {/* Update */}
      <Modal isOpen={showModalUpdate}>
        <ModalHeader>Edit Category</ModalHeader>
        <ModalBody>
          <Form>
            <Form.Group>
              <Form.Label>Id:</Form.Label>
              <Form.Control type="text" id="txtId" name="id" readOnly value={currentCategory.id} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Category Name:</Form.Label>
              <Form.Control type="text" id="txtCategoryName" name="categoryName" placeholder="Category Name" required onChange={handleChange} value={currentCategory.categoryName} />
            </Form.Group>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" onClick={() => putCategory()}>Save</Button>
          <Button variant="outline-info" onClick={() => openCloseModalUpdate()}>Back</Button>
        </ModalFooter>
      </Modal>

      {/* Details */}
      <Modal isOpen={showModalDetails}>
        <ModalHeader>Category Details</ModalHeader>
        <ModalBody>
          <Form>
            <Form.Group>
              <Form.Label>Id:</Form.Label>
              <Form.Control type="text" id="txtId" name="id" readOnly value={currentCategory.id} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Category Name:</Form.Label>
              <Form.Control type="text" id="txtCategoryName" name="categoryName" readOnly value={currentCategory.categoryName} />
            </Form.Group>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline-info" onClick={() => openCloseModalDetails()}>Back</Button>
        </ModalFooter>
      </Modal>

      {/* Delete */}
      <Modal isOpen={showModalDelete}>
        <ModalHeader>Are you sure to delete this category?</ModalHeader>
        <ModalBody>
          <Form>
            <Form.Group>
              <Form.Label><b>Id:</b></Form.Label>
              <Form.Label>{currentCategory.id}</Form.Label><br />
              <Form.Label><b>Category Name:</b></Form.Label>
              <Form.Label>{currentCategory.categoryName}</Form.Label><br />
            </Form.Group>
          </Form>
        </ModalBody>
        <ModalFooter>
        <Button variant="danger" onClick={() => deleteCategory(currentCategory.id)}>Delete</Button>
          <Button variant="outline-info" onClick={() => openCloseModalDelete()}>Back</Button>
        </ModalFooter>
      </Modal>

      {selectedCategoryId && recipesForCategory.length > 0 && (
        <div>
          <Button style={{ background: 'rgb(96, 108, 56)' }} variant="success btn-sm mt-3" onClick={() => setSelectedCategoryId(null)}>Close Recipes</Button>

          <h2 className="text-light mt-3">Recipes for {getCategoryNameByIdCategories(selectedCategoryId)}</h2>
          <Table style={{ background: 'rgb(254, 250, 224)' }} responsive striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Recipe Name</th>
                <th>Category</th>
                <th>Ingredients</th>
                <th>Difficulty</th>
                <th>Estimated Time</th>
              </tr>
            </thead>
            <tbody>
              {recipesForCategory.map(recipe => (
                <tr key={recipe.id}>
                  <td>{recipe.id}</td>
                  <td>{recipe.name}</td>
                  <td>{getCategoryNameByIdCategories(recipe.categoryId)}</td>
                  <td>{recipe.ingredients}</td>
                  <td>{recipe.difficulty}</td>
                  <td>{recipe.estimatedTime}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
}

export default Categories;
