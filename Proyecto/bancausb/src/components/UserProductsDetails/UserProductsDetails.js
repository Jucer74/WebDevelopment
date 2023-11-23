import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { Button, Table, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const baseUrlUser = "https://localhost:5001/api/Users";

const baseUrlProducts = "https://localhost:5001/api/Products";

export function UserProductsDetails() {
  const { ProductId } = useParams();
  const [data, setData] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    id: "",
    userEmail: "",
    firstName: "",
    lastName: "",
    password: "",
    role: "",
    products: [],
  });

  const clearUserData = () => {
    setCurrentUser({
      id: "",
      userEmail: "",
      firstName: "",
      lastName: "",
      password: "",
      role: "",
      products: [],
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
      .get(baseUrlProducts+'/'+ProductId+'/Users')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const GetProducts = async () => {
    await axios
      .get(baseUrlProducts+'/'+ProductId+'/Users')
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
    delete currentUser.id;

    console.log(currentUser);
    await axios
      .post(baseUrlUser, currentUser)
      .then((response) => {
        openCloseModalCreate();
        GetUsers();
        addUserProduct(response.data.id, selectedProducts);
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
    console.log(currentUser.products);
    await axios
      .put(baseUrlUser + "/" + currentUser.id, currentUser)
      .then((response) => {
        var result = response.data;
        var updatedData = data;
        updatedData.map((usr) => {
          if (usr.id === currentUser.id) {
            usr.email = result.userEmail;
            usr.name = result.firstName;
            usr.username = result.lastName;
            usr.password = result.password;
          }
          return usr;
        });
        GetUsers();
        openCloseModalUpdate();
        addUserProduct(
          currentUser.id,
          currentUser.products.map((p) => p.id)
        );
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
        <h1 className="col-auto text-start">Usuarios</h1>
        <Button
          className="col-auto text-end"
          variant="success btn-sm"
          onClick={() => openCloseModalCreate()}
        >
          <FontAwesomeIcon icon={faPlus} /> Crear
        </Button>
      </div>

      <div class=" col-10  m-auto table-responsive">
        <Table className="table table-striped" id="UsersTable">
          <thead>
            <tr className="justify-content-between">
              <th>Id</th>
              <th>Correo Electrónico</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Password</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data
              .filter((usr) => usr.role === "cliente")
              .map((usr) => (
                <tr key={usr.id}>
                  <td>{usr.id}</td>
                  <td>{usr.userEmail}</td>
                  <td>{usr.firstName}</td>
                  <td>{usr.lastName}</td>
                  <td>{usr.password}</td>

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
        <ModalHeader>Create User</ModalHeader>
        <ModalBody>
          <Form>
            <div className="row">
              <div className="col-md-6">
                {/* Detalles del usuario */}
                <Form.Group>
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    name="userEmail"
                    placeholder="username@domain.com"
                    value={currentUser.userEmail}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Name:</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    placeholder="Julio"
                    value={currentUser.firstName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Last Name:</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    placeholder="Robles"
                    value={currentUser.lastName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={currentUser.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Role:</Form.Label>
                  <Form.Control
                    as="select"
                    name="role"
                    value={currentUser.role}
                    onChange={handleChange}
                  >
                    <option value="">Seleccionar rol</option>
                    <option value="cliente">Cliente</option>
                    <option value="administrador">Administrador</option>
                  </Form.Control>
                </Form.Group>
              </div>
              <div className="col-md-6">
                {/* Productos */}
                <Form.Group>
                  <Form.Label>Products:</Form.Label>
                  {availableProducts.map((product) => (
                    <Form.Check
                      key={product.id}
                      type="checkbox"
                      id={`product-${product.id}`}
                      label={product.name}
                      checked={selectedProducts.includes(product.id)}
                      onChange={(e) => {
                        const selectedProductId = product.id;
                        const isChecked = e.target.checked;
                        let updatedSelectedProducts = [...selectedProducts];

                        if (isChecked) {
                          updatedSelectedProducts.push(selectedProductId);
                        } else {
                          updatedSelectedProducts =
                            updatedSelectedProducts.filter(
                              (id) => id !== selectedProductId
                            );
                        }

                        setSelectedProducts(updatedSelectedProducts);
                      }}
                    />
                  ))}
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
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    name="userEmail"
                    placeholder="username@domain.com"
                    value={currentUser.userEmail}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Name:</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    placeholder="Julio"
                    value={currentUser.firstName}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Last Name:</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    placeholder="Robles"
                    value={currentUser.lastName}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={currentUser.password}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Role:</Form.Label>
                  <Form.Control
                    as="select"
                    name="role"
                    value={currentUser.role}
                    onChange={handleChange}
                  >
                    <option value="cliente">Cliente</option>
                    <option value="administrador">Administrador</option>
                  </Form.Control>
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
              <Form.Label>Correo Electrónico:</Form.Label>
              <Form.Control
                type="email"
                id="txtEmail"
                name="email"
                readOnly
                value={currentUser && currentUser.userEmail}
              />
            </Form.Group>

            <div className="row my-1">
              <Form.Group className="col-6">
                <Form.Label>Nombre:</Form.Label>
                <Form.Control
                  type="text"
                  id="txtName"
                  name="Nombre"
                  readOnly
                  value={currentUser && currentUser.firstName}
                />
              </Form.Group>
              <Form.Group className="col-6">
                <Form.Label>Apellido:</Form.Label>
                <Form.Control
                  type="text"
                  id="txtUsername"
                  name="Apellido"
                  readOnly
                  value={currentUser && currentUser.lastName}
                />
              </Form.Group>
            </div>

            <div className="row my-1">
              <Form.Group className="col-6">
                <Form.Label>Contraseña:</Form.Label>
                <Form.Control
                  type="text"
                  id="txtName"
                  name="Nombre"
                  readOnly
                  value={currentUser && currentUser.password}
                />
              </Form.Group>
              <Form.Group className="col-6">
                <Form.Label>Rol:</Form.Label>
                <Form.Control
                  type="text"
                  id="txtUsername"
                  name="Apellido"
                  readOnly
                  value={currentUser && currentUser.role}
                />
              </Form.Group>
            </div>
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
                <b>Email:</b>
              </Form.Label>
              <Form.Label> {currentUser && currentUser.userEmail}</Form.Label>
              <br />
              <Form.Label>
                <b>Name:</b>
              </Form.Label>
              <Form.Label> {currentUser && currentUser.firstName}</Form.Label>
              <br />
              <Form.Label>
                <b>Username:</b>
              </Form.Label>
              <Form.Label> {currentUser && currentUser.lastName}</Form.Label>
              <br />
              <Form.Label>
                <b>Password:</b>
              </Form.Label>
              <Form.Label> {currentUser && currentUser.password}</Form.Label>
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
