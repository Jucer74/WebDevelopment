import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, Link } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { FontAwesomeIcon as Fas } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const baseUrl = "http://localhost:8000/api/users";

export const Users = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoggedIn] = useState(!!localStorage.getItem("token"));

  const [currentUser, setCurrentUser] = useState({
    UsuarioID: "",
    Nombre: "",
    CorreoElectronico: "",
    Contrasena: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({
      ...currentUser,
      [name]: value,
    });
  };

  const [showModalCreate, setShowModalCreate] = useState(false);
  const openCloseModalCreate = () => {
    setShowModalCreate(!showModalCreate);
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

  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const openCloseModalUpdate = () => {
    setShowModalUpdate(!showModalUpdate);
  };

  const [showModalDetails, setShowModalDetails] = useState(false);
  const openCloseModalDetails = () => {
    setShowModalDetails(!showModalDetails);
  };

  const [showModalDelete, setShowModalDelete] = useState(false);
  const openCloseModalDelete = () => {
    setShowModalDelete(!showModalDelete);
  };

  const postUser = async () => {
    delete currentUser.UsuarioID;

    if (
      !currentUser.Nombre ||
      !currentUser.CorreoElectronico ||
      !currentUser.Contrasena
    ) {
      alert("Por favor rellena todos los campos.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(currentUser.CorreoElectronico)) {
      alert("Por favor, introduce una dirección de correo electrónico válida.");
      return;
    }

    try {
      const existingUser = data.find(
        (user) => user.CorreoElectronico === currentUser.CorreoElectronico
      );
      if (existingUser) {
        alert("El usuario con este correo electrónico ya existe.");
        return;
      }

      delete currentUser.UsuarioID;
      const response = await axios.post(baseUrl, currentUser);
      if (response.status === 201) {
        alert("¡Usuario creado exitosamente!");
        GetUsers();
        openCloseModalCreate();
      }
    } catch (error) {
      alert(error);
      alert("Se ha producido un error al crear el usuario.");
    }
  };

  const putUser = async () => {
    await axios
      .put(baseUrl + "/" + currentUser.UsuarioID, currentUser)
      .then((response) => {
        var result = response.data;
        var updatedData = data;
        // eslint-disable-next-line array-callback-return
        updatedData.map((usr) => {
          if (usr.UsuarioID === currentUser.UsuarioID) {
            usr.Nombre = result.Nombre;
            usr.CorreoElectronico = result.CorreoElectronico;
            usr.Contrasena = result.Contrasena;
          }
        });
        GetUsers();
        openCloseModalUpdate();
      })
      .catch((error) => {
        alert(error);
      });
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

  const deleteUser = async () => {
    await axios
      .delete(baseUrl + "/" + currentUser.UsuarioID)
      .then(() => {
        setData(data.filter((usr) => usr.UsuarioID !== currentUser.UsuarioID));
        openCloseModalDelete();
      })
      .catch((error) => {
        alert(error);
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
      <h1>Lista De Usuarios</h1>
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

      <thead>
        <tr>
          <th>UsuarioID</th>
          <th>Nombre</th>
          <th>CorreoElectronico</th>
          <th>Contraseña</th>
        </tr>
      </thead>
      <tbody>
        {data
          .filter(
            (usr) =>
              usr.Nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
              usr.CorreoElectronico.toLowerCase().includes(
                searchTerm.toLowerCase()
              )
          )
          .map((usr) => (
            <tr key={usr.UsuarioID}>
              <td>{usr.UsuarioID}</td>
              <td>{usr.Nombre}</td>
              <td>{usr.CorreoElectronico}</td>
              <td>
                {usr.Contrasena.split("")
                  .map(() => "*")
                  .join("")}
              </td>

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
              </td>
            </tr>
          ))}
      </tbody>

      {/* Create User Modal */}
      <Modal isOpen={showModalCreate} toggle={openCloseModalCreate}>
        <ModalHeader>Crear Cuenta</ModalHeader>
        <ModalBody>
          <Form>
            <Form.Group>
              <Form.Label>Nombre:</Form.Label>
              <Form.Control
                type="text"
                id="txtNombre"
                name="Nombre"
                placeholder="Pepito Lopez"
                required
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>CorreoElectronico:</Form.Label>
              <Form.Control
                type="email"
                id="txtCorreoElectronico"
                name="CorreoElectronico"
                placeholder="pepito@domain.com"
                required
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Contraseña:</Form.Label>
              <Form.Control
                type="password"
                id="txtContrasena"
                name="Contrasena"
                placeholder="********"
                onChange={handleChange}
              />
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
              <Form.Label>UsuarioID:</Form.Label>
              <Form.Control
                type="text"
                id="txtUsuarioID"
                name="UsuarioID"
                readOnly
                value={currentUser && currentUser.UsuarioID}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Nombre:</Form.Label>
              <Form.Control
                type="text"
                id="txtNombre"
                name="Nombre"
                required
                onChange={handleChange}
                value={currentUser && currentUser.Nombre}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>CorreoElectronico:</Form.Label>
              <Form.Control
                type="email"
                id="txtCorreoElectronico"
                name="CorreoElectronico"
                required
                onChange={handleChange}
                value={currentUser && currentUser.CorreoElectronico}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Contraseña:</Form.Label>
              <Form.Control
                type="text"
                id="txtContrasena"
                name="Contrasena"
                onChange={handleChange}
                value={currentUser && currentUser.Contrasena}
              />
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
          <tbody>
            <tr>
              <td>
                <b>UsuarioID:</b>
              </td>
              <td>{currentUser && currentUser.UsuarioID}</td>
            </tr>
            <tr>
              <td>
                <b>Nombre:</b>
              </td>
              <td>{currentUser && currentUser.Nombre}</td>
            </tr>

            <tr>
              <td>
                <b>CorreoElectronico:</b>
              </td>
              <td>{currentUser && currentUser.CorreoElectronico}</td>
            </tr>
            <tr>
              <td>
                <b>Contraseña:</b>
              </td>
              <td>{currentUser && currentUser.Contrasena}</td>
            </tr>
          </tbody>
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
          <tbody>
            <tr>
              <td>
                <b>UsuarioID:</b>
              </td>
              <td>{currentUser && currentUser.UsuarioID}</td>
            </tr>
            <tr>
              <td>
                <b>Nombre:</b>
              </td>
              <td>{currentUser && currentUser.Nombre}</td>
            </tr>
            <tr>
              <td>
                <b>CorreoElectronico:</b>
              </td>
              <td>{currentUser && currentUser.CorreoElectronico}</td>
            </tr>
          </tbody>
        </ModalBody>
        <ModalFooter>
          <Button variant="danger" onClick={() => deleteUser(currentUser.ID)}>
            Eliminar
          </Button>
          <Button variant="outline-info" onClick={() => openCloseModalDelete()}>
            Volver
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};
