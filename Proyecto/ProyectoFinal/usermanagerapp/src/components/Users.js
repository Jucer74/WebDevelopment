import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, Table, Form } from "react-bootstrap";
import { FontAwesomeIcon as Fas } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const baseUrl = "http://localhost:8000/api/users";

export function Users() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [currentUser, setCurrentUser] = useState({
    id: "",
    email: "",
    username: "",
    name: "",
    password: "",
    address: "",
    city: "",
    balance: 0.0,
    account_type: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({
      ...currentUser,
      [name]: value,
    });
  };

  // Create
  const [showModalCreate, setShowModalCreate] = useState(false);
  const openCloseModalCreate = () => {
    setShowModalCreate(!showModalCreate);
  };

  const postUser = async () => {
    delete currentUser.id;
    await axios
      .post(baseUrl, currentUser)
      .then((response) => {
        GetUsers();
        openCloseModalCreate();
      })
      .catch((error) => {
        console.log(error);
      });

    // Validaciones
    if (
      !currentUser.email ||
      !currentUser.name ||
      !currentUser.username ||
      !currentUser.password ||
      !currentUser.address ||
      !currentUser.city ||
      currentUser.balance === undefined ||
      !currentUser.account_type
    ) {
      toast.error("Por favor rellena todos los campos.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(currentUser.email)) {
      toast.error(
        "Por favor, introduce una dirección de correo electrónico válida."
      );
      return;
    }

    try {
      const existingUser = data.find(
        (user) => user.email === currentUser.email
      );
      if (existingUser) {
        toast.error("El usuario con este correo electrónico ya existe.");
        return;
      }

      delete currentUser.id;
      const response = await axios.post(baseUrl, currentUser);
      if (response.status === 201) {
        toast.success("¡Usuario creado exitosamente!");
        GetUsers();
        openCloseModalCreate();
      }
    } catch (error) {
      console.error(error);

      toast.error("Se ha producido un error al crear el usuario.");
    }
  };

  // Update
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
      .put(baseUrl + "/" + currentUser.id, currentUser)
      .then((response) => {
        var result = response.data;
        var updatedData = data;
        // eslint-disable-next-line array-callback-return
        updatedData.map((usr) => {
          if (usr.id === currentUser.id) {
            usr.email = result.email;
            usr.name = result.name;
            usr.username = result.username;
            usr.password = result.password;
            usr.address = result.address;
            usr.city = result.city;
            usr.balance = result.balance;
            usr.account_type = result.account_type;
          }
        });
        GetUsers();
        openCloseModalUpdate();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Details
  const [showModalDetails, setShowModalDetails] = useState(false);
  const openCloseModalDetails = () => {
    setShowModalDetails(!showModalDetails);
  };

  // Delete
  const [showModalDelete, setShowModalDelete] = useState(false);
  const openCloseModalDelete = () => {
    setShowModalDelete(!showModalDelete);
  };

  const deleteUser = async () => {
    await axios
      .delete(baseUrl + "/" + currentUser.id)
      .then(() => {
        setData(data.filter((usr) => usr.id !== currentUser.id));
        openCloseModalDelete();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const GetUsers = async () => {
    await axios
      .get(baseUrl)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    GetUsers();
  }, []);

  if (!isLoggedIn) {
    return <Navigate to="/Login" />;
  }
  return (
    <Container className="text-center text-md-left mt-4">
      <h1>Lista De Cuentas</h1>
      <p>
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />{" "}
        <Button variant="success btn-sm" onClick={() => openCloseModalCreate()}>
          {" "}
          <Fas icon={faPlus} /> Nuevo
        </Button>
      </p>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Id</th>
            <th>Correo Electrónico</th>
            <th>Nombre</th>
            <th>Nombre De Usuario</th>
            <th>Contraseña</th>
            <th>Dirección</th>
            <th>Ciudad</th>
            <th>Balance</th>
            <th>Tipo De Cuenta</th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter(
              (usr) =>
                usr.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                usr.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                usr.email.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((usr) => (
              <tr key={usr.id}>
                <td>{usr.id}</td>
                <td>{usr.email}</td>
                <td>{usr.name}</td>
                <td>{usr.username}</td>
                <td>
                  {usr.password
                    .split("")
                    .map(() => "*")
                    .join("")}
                </td>
                <td>{usr.address}</td>
                <td>{usr.city}</td>
                <td>{usr.balance}</td>
                <td>{usr.account_type}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    onClick={() => selectCurrentUser(usr, "Edit")}
                    className="ms-1 mb-1"
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outline-warning"
                    onClick={() => selectCurrentUser(usr, "Details")}
                    className="ms-1 mb-1"
                  >
                    Detalles
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => selectCurrentUser(usr, "Delete")}
                    className="ms-1 mb-1"
                  >
                    Eliminar
                  </Button>
                  <Button
                    variant="outline-info"
                    as={Link}
                    to="/Transactions"
                    className="ms-1 mb-1"
                  >
                    Transacción
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      {/* Create User Modal */}
      <Modal isOpen={showModalCreate} toggle={openCloseModalCreate}>
        <ModalHeader>Crear Cuenta</ModalHeader>
        <ModalBody>
          <Form>
            <Form.Group>
              <Form.Label>Correo Electrónico:</Form.Label>
              <Form.Control
                type="email"
                id="txtEmail"
                name="email"
                placeholder="pepito@domain.com"
                required
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Nombre:</Form.Label>
              <Form.Control
                type="text"
                id="txtName"
                name="name"
                placeholder="Pepito Lopez"
                required
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Nombre De Usuario:</Form.Label>
              <Form.Control
                type="text"
                id="txtUsername"
                name="username"
                placeholder="Pepineitor"
                required
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Contraseña:</Form.Label>
              <Form.Control
                type="password"
                id="txtPassword"
                name="password"
                placeholder="********"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Dirección:</Form.Label>
              <Form.Control
                type="text"
                name="address"
                id="txtaddress"
                placeholder="Cra xx #yy-zz"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Ciudad:</Form.Label>
              <Form.Control
                type="text"
                name="city"
                id="txtcity"
                placeholder="Bolivia"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Balance:</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                id="txtbalance"
                value={currentUser && currentUser.balance}
                name="balance"
                placeholder="20,15"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Tipo De Cuenta:</Form.Label>
              <Form.Select
                id="txttype"
                name="account_type"
                onChange={handleChange}
                defaultValue=""
              >
                <option value="" disabled>
                  Selecione Tipo De Cuenta
                </option>
                <option value="Checking">Corriente</option>
                <option value="Savings">Ahorros</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" onClick={() => postUser()}>
            Crear
          </Button>
          <Button variant="outline-info" onClick={openCloseModalCreate}>
            Volver
          </Button>
        </ModalFooter>
      </Modal>

      {/* Update */}
      <Modal isOpen={showModalUpdate}>
        <ModalHeader>Editar Cuenta</ModalHeader>
        <ModalBody>
          <Form>
            <Form.Group>
              <Form.Label>Id:</Form.Label>
              <Form.Control
                type="text"
                id="txtId"
                name="id"
                readOnly
                value={currentUser && currentUser.id}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Correo Electrónico:</Form.Label>
              <Form.Control
                type="email"
                id="txtEmail"
                name="email"
                required
                onChange={handleChange}
                value={currentUser && currentUser.email}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Nombre:</Form.Label>
              <Form.Control
                type="text"
                id="txtName"
                name="name"
                required
                onChange={handleChange}
                value={currentUser && currentUser.name}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Nombre De Usuario:</Form.Label>
              <Form.Control
                type="text"
                id="txtUsername"
                name="username"
                required
                onChange={handleChange}
                value={currentUser && currentUser.username}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Contraseña:</Form.Label>
              <Form.Control
                type="text"
                id="txtPassword"
                name="password"
                onChange={handleChange}
                value={currentUser && currentUser.password}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Dirección:</Form.Label>
              <Form.Control
                type="text"
                id="txtaddress"
                name="address"
                onChange={handleChange}
                value={currentUser && currentUser.address}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Ciudad:</Form.Label>
              <Form.Control
                type="text"
                id="txtcity"
                name="city"
                onChange={handleChange}
                value={currentUser && currentUser.city}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Balance:</Form.Label>
              <Form.Control
                type="text"
                id="txtbalance"
                name="balance"
                onChange={handleChange}
                value={currentUser && currentUser.balance}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Tipo De Cuenta:</Form.Label>
              <Form.Select
                id="txttype"
                name="account_type"
                onChange={handleChange}
                defaultValue=""
              >
                <option value="" disabled>
                  Selecione Tipo De Cuenta
                </option>
                <option value="Checking">Corriente</option>
                <option value="Savings">Ahorros</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" onClick={() => putUser()}>
            Guardar
          </Button>
          <Button variant="outline-info" onClick={() => openCloseModalUpdate()}>
            Volver
          </Button>
        </ModalFooter>
      </Modal>

      {/* Details */}
      <Modal isOpen={showModalDetails}>
        <ModalHeader>Detalles</ModalHeader>
        <ModalBody>
          <Table striped bordered hover>
            <tbody>
              <tr>
                <td>
                  <b>Id:</b>
                </td>
                <td>{currentUser && currentUser.id}</td>
              </tr>
              <tr>
                <td>
                  <b>Correo Electrónico:</b>
                </td>
                <td>{currentUser && currentUser.email}</td>
              </tr>
              <tr>
                <td>
                  <b>Nombre:</b>
                </td>
                <td>{currentUser && currentUser.name}</td>
              </tr>
              <tr>
                <td>
                  <b>Nombre De Usuario:</b>
                </td>
                <td>{currentUser && currentUser.username}</td>
              </tr>
              <tr>
                <td>
                  <b>Contraseña:</b>
                </td>
                <td>{currentUser && currentUser.password}</td>
              </tr>
              <tr>
                <td>
                  <b>Dirección:</b>
                </td>
                <td>{currentUser && currentUser.address}</td>
              </tr>
              <tr>
                <td>
                  <b>Ciudad:</b>
                </td>
                <td>{currentUser && currentUser.city}</td>
              </tr>
              <tr>
                <td>
                  <b>Balance:</b>
                </td>
                <td>{currentUser && currentUser.balance}</td>
              </tr>
              <tr>
                <td>
                  <b>Tipo De Cuenta:</b>
                </td>
                <td>{currentUser && currentUser.account_type}</td>
              </tr>
            </tbody>
          </Table>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="outline-info"
            onClick={() => openCloseModalDetails()}
          >
            Volver
          </Button>
        </ModalFooter>
      </Modal>

      {/* Delete */}
      <Modal isOpen={showModalDelete}>
        <ModalHeader>¿Estás seguro de eliminar esta cuenta?</ModalHeader>
        <ModalBody>
          <Table striped bordered hover>
            <tbody>
              <tr>
                <td>
                  <b>Id:</b>
                </td>
                <td>{currentUser && currentUser.id}</td>
              </tr>
              <tr>
                <td>
                  <b>Correo Electrónico:</b>
                </td>
                <td>{currentUser && currentUser.email}</td>
              </tr>
              <tr>
                <td>
                  <b>Nombre:</b>
                </td>
                <td>{currentUser && currentUser.name}</td>
              </tr>
              <tr>
                <td>
                  <b>Nombre De Usuario:</b>
                </td>
                <td>{currentUser && currentUser.username}</td>
              </tr>
              <tr>
                <td>
                  <b>Dirección:</b>
                </td>
                <td>{currentUser && currentUser.address}</td>
              </tr>
              <tr>
                <td>
                  <b>Ciudad:</b>
                </td>
                <td>{currentUser && currentUser.city}</td>
              </tr>
              <tr>
                <td>
                  <b>Balance:</b>
                </td>
                <td>{currentUser && currentUser.balance}</td>
              </tr>
              <tr>
                <td>
                  <b>Tipo de Cuenta:</b>
                </td>
                <td>{currentUser && currentUser.account_type}</td>
              </tr>
            </tbody>
          </Table>
        </ModalBody>
        <ModalFooter>
          <Button variant="danger" onClick={() => deleteUser(currentUser.id)}>
            Eliminar
          </Button>
          <Button variant="outline-info" onClick={() => openCloseModalDelete()}>
            Volver
          </Button>
        </ModalFooter>
      </Modal>
      <ToastContainer />
    </Container>
  );
}
