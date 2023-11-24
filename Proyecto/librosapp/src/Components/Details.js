import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { Button, Table, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const baseUrlUser = "https://localhost:5001/api/users";

const baseUrlProducts = "https://localhost:5001/api/libroes";

export function LibrosDetails() {
  const { ProductId } = useParams();
  const [data, setData] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    id: "",
    name: "",
  });

  const clearUserData = () => {
    setCurrentUser({
      id: "",
      name: "",
    });
  };

  const [availableProducts, setAvailableProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const getAvailableProducts = async () => {
    try {
      const response = await axios.get(baseUrlProducts);
      setAvailableProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({
      ...currentUser,
      [name]: value,
    });
  };


  

  const [showModalCreate, setShowModalCreate] = useState(false);
  const openCloseModalCreate = () => {
    clearUserData();
    setShowModalCreate(!showModalCreate);
  };

  const addUserProduct = async (userId, products) => {
    try {
      console.log(userId, products);
      const response = await axios.post(
        `https://localhost:5001/api/Users/${userId}/UpdateProducts`,
        products
      );
      GetUsers();
      return response.data; // Puedes manejar la respuesta aquí si el backend envía algún dato adicional
    } catch (error) {
      console.error("Error al agregar el producto al usuario:", error);
      throw error; // Maneja el error según tu lógica en el frontend
    }
  };
  const GetUsers = async () => {
    await axios
      .get(baseUrlUser+'/'+ProductId+'/Libros')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const GetProducts = async () => {
    await axios
      .get(baseUrlProducts+'/'+ProductId+'/Libros')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    GetUsers();
    getAvailableProducts();
  }, []);

  const postUser = async () => {
    console.log(currentUser);
    delete currentUser.id;
    await axios
      .post(baseUrlProducts, currentUser)
      .then((response) => {
        GetUsers();
        openCloseModalCreate();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const openCloseModalUpdate = () => {
    setShowModalUpdate(!showModalUpdate);
  };

  const selectCurrentUser = (user, action) => {
    setCurrentUser(user);
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
  };

  const putUser = async () => {
    await axios
      .put(baseUrlProducts + "/" + currentUser.id, currentUser)
      .then((response) => {
        var result = response.data;
        var updatedData = data;
        updatedData.map((usr) => {
          if (usr.id === currentUser.id) {
            usr.email = result.email;
            usr.name = result.name;
            usr.username = result.username;
            usr.password = result.password;
          }
          return usr;
        });
        GetUsers();
        openCloseModalUpdate();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [showModalDetails, setShowModalDetails] = useState(false);
  const openCloseModalDetails = () => {
    setShowModalDetails(!showModalDetails);
  };

  const [showModalDelete, setShowModalDelete] = useState(false);
  const openCloseModalDelete = () => {
    setShowModalDelete(!showModalDelete);
  };

  const deleteUser = async () => {
    await axios
      .delete(`${baseUrlUser}/${currentUser.id}/RemoveProduct/${ProductId}`)
      .then(() => {
        setData(data.filter((usr) => usr.id !== currentUser.id));
        openCloseModalDelete();
        GetUsers();
        clearUserData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const toggleProductSelection = (productId) => {
    const isSelected = currentUser.products.some((p) => p.id === productId);
    let updatedProducts;
  
    if (isSelected) {
      updatedProducts = currentUser.products.filter((p) => p.id !== productId);
    } else {
      const selectedProduct = availableProducts.find((p) => p.id === productId);
      updatedProducts = [...currentUser.products, selectedProduct];
    }
  
    setCurrentUser({
      ...currentUser,
      products: updatedProducts,
    });
  };
  
  
  return (
    <div className=" crud-container m-5 justify-content-between">
      <div className="row col-10 d-flex justify-content-between align-items-center m-auto p-1">
        <h1 className="col-auto text-start">Reservas/User-{ProductId} </h1>
        <Button
          className="col-auto text-end"
          variant="success btn-sm"
          onClick={() => openCloseModalCreate()}
        >
          <FontAwesomeIcon icon={faPlus} /> Crear
        </Button>
      </div>

      <div class=" col-10  m-auto table-responsive">
        <Table className="table" id="UsersTable">
          <thead>
            <tr className="justify-content-between">
              <th>Id</th>
              <th>Nombre</th>
            </tr>
          </thead>
          <tbody>
            {data.map((usr) => (
                <tr key={usr.id}>
                  <td>{usr.id}</td>
                  <td>{usr.name}</td>
                  <td>
                    <Button
                      className="btn-sm"
                      variant="outline-primary"
                      onClick={() => selectCurrentUser(usr, "Edit")}
                    >
                      Edit
                    </Button>
                    {"  "}
                    <Button
                      className="btn-sm"
                      variant="outline-warning"
                      onClick={() => selectCurrentUser(usr, "Details")}
                    >
                      Details
                    </Button>
                    {"  "}
                    <Button
                      className="btn-sm"
                      variant="outline-danger"
                      onClick={() => selectCurrentUser(usr, "Delete")}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>

      {/* Create */}
      <Modal isOpen={showModalCreate} size="l">
        <ModalHeader>Create Reserva</ModalHeader>
        <ModalBody>
          <Form>
            <div className="row">
              <div className="col-md-12">
                <Form.Group>
                  <Form.Label>Nombre:</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="El Principito"
                    value={currentUser.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </div>
            </div>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" type="submit" onClick={() => postUser()}>
            Create
          </Button>
          <Button variant="outline-info" onClick={() => openCloseModalCreate()}>
            Back
          </Button>
        </ModalFooter>
      </Modal>

      {/* Update */}
      <Modal isOpen={showModalUpdate}>
        <ModalHeader>Edit User</ModalHeader>
        <ModalBody>
          <Form>
            <div className="row">
              <div className="col-12">
                {/* Detalles del usuario */}
                <Form.Group>
                  <Form.Label>Nombre:</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="El principito"
                    value={currentUser.name}
                    onChange={handleChange}
                  />
                </Form.Group>
              </div>
            </div>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" onClick={() => putUser()}>
            Save
          </Button>
          <Button variant="outline-info" onClick={() => openCloseModalUpdate()}>
            Back
          </Button>
        </ModalFooter>
      </Modal>

      {/* Details */}
      <Modal isOpen={showModalDetails} centered={true}>
        <ModalHeader>Details User</ModalHeader>
        <ModalBody>
          <Form>
            <Form.Group className="col-12 my-1">
              <Form.Label>Id:</Form.Label>
              <Form.Control
                type="text"
                id="txtId"
                name="id"
                readOnly
                value={currentUser && currentUser.id}
              />
            </Form.Group>
            <Form.Group className="col-12 my-1">
              <Form.Label>Nombre:</Form.Label>
              <Form.Control
                type="email"
                id="txtEmail"
                name="email"
                readOnly
                value={currentUser && currentUser.name}
              />
            </Form.Group>

            
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="outline-info"
            onClick={() => openCloseModalDetails()}
          >
            Back
          </Button>
        </ModalFooter>
      </Modal>
      {/* Delete */}
      <Modal isOpen={showModalDelete} centered>
        <ModalHeader>Are you sure to delete this user?</ModalHeader>
        <ModalBody>
          <Form>
            <Form.Group>
              <Form.Label>
                <b>Id:</b>
              </Form.Label>
              <Form.Label> {currentUser && currentUser.id}</Form.Label>
              <br />
              <Form.Label>
                <b>Nombre:</b>
              </Form.Label>
              <Form.Label> {currentUser && currentUser.name}</Form.Label>
            </Form.Group>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button variant="danger" onClick={() => deleteUser(currentUser.id)}>
            Delete
          </Button>
          <Button variant="outline-info" onClick={() => openCloseModalDelete()}>
            Back
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
