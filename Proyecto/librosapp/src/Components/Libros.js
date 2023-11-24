import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Table, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const baseUrl = "https://localhost:5001/api/Libroes";

export function ListLibros() {
  const [data, setData] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    id: "",
    name: "",
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

  useEffect(() => {
    GetUsers();
  }, []);

  const postUser = async () => {
    console.log(currentUser);
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
      .put(baseUrl + "/" + currentUser.id, currentUser)
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
      .delete(baseUrl + "/" + currentUser.id)
      .then(() => {
        setData(data.filter((usr) => usr.id !== currentUser.id));
        openCloseModalDelete();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="text-center text-md-left col-8 m-auto">
      <h1>Libro List</h1>
      <p>
        <Button
          className="left"
          variant="success btn-sm"
          onClick={() => openCloseModalCreate()}
        >
          {" "}
          <FontAwesomeIcon icon={faPlus} /> New
        </Button>
      </p>
      <Table id="UsersTable">
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((usr) => (
            <tr key={usr.id}>
              <td>{usr.id}</td>
              <td>{usr.name}</td>
              <td>
                <Button
                  variant="outline-primary"
                  onClick={() => selectCurrentUser(usr, "Edit")}
                >
                  Edit
                </Button>
                {"  "}
                <Button
                  variant="outline-warning"
                  onClick={() => selectCurrentUser(usr, "Details")}
                >
                  Details
                </Button>
                {"  "}
                <Button
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

      {/* Create */}
      <Modal isOpen={showModalCreate}>
        <ModalHeader>Create User</ModalHeader>
        <ModalBody>
          <Form>
            <Form.Group>
              <Form.Label>Nombre:</Form.Label>
              <Form.Control
                type="text"
                id="name"
                name="name"
                value={currentUser.name}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" onClick={() => postUser()}>
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
            <Form.Group>
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                id="txtName"
                name="name"
                placeholder="Julio Robles"
                required
                onChange={handleChange}
                value={currentUser && currentUser.name}
              />
            </Form.Group>
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
      <Modal isOpen={showModalDetails}>
        <ModalHeader>Details User</ModalHeader>
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
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                id="txtName"
                name="name"
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
      <Modal isOpen={showModalDelete}>
        <ModalHeader>Are you sure to delete this user?</ModalHeader>
        <ModalBody>
          <Form>
            <Form.Group>
            <Form.Label>
                <b>Id:</b>
              </Form.Label>
              <Form.Label>{currentUser && currentUser.id}</Form.Label>
              <br></br>
              <Form.Label>
                <b>Name:</b>
              </Form.Label>
              <Form.Label>{currentUser && currentUser.name}</Form.Label>
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