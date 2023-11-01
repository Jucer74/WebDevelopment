import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, Table, Form } from "react-bootstrap";
import { FontAwesomeIcon as Fas } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const baseUrl = "https://localhost:5001/api/Users";

export function List() {
  const [data, setData] = useState([]);

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

  // Control data
  const [currentUser, setCurrentUser] = useState({
    id: "",
    email: "",
    username: "",
    name: "",
    password: "",
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
  };

  // Update
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const openCloseModalUpdate = () => {
    setShowModalUpdate(!showModalUpdate);
  };

  const selectCurrentUser=(user, action)=>{
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
  }

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

  return (
    <Container className="text-center text-md-left">
      <h1>User List</h1>
      <p>
        <Button
          className="left"
          variant="success btn-sm"
          onClick={() => openCloseModalCreate()}
        >
          {" "}
          <Fas icon={faPlus} /> New
        </Button>
      </p>
      <Table id="UsersTable">
        <thead>
          <tr>
            <th>Id</th>
            <th>Email</th>
            <th>Name</th>
            <th>Username</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((usr) => (
            <tr key={usr.id}>
              <td>{usr.id}</td>
              <td>{usr.email}</td>
              <td>{usr.name}</td>
              <td>{usr.username}</td>
              <td>{usr.password}</td>
              <td>
              <Button variant="outline-primary" onClick={()=>selectCurrentUser(usr, "Edit")}>Edit</Button>{"  "}
                <Button variant="outline-warning" onClick={()=>selectCurrentUser(usr, "Details")}>Details</Button>{"  "}
                <Button variant="outline-danger" onClick={()=>selectCurrentUser(usr, "Delete")}>Delete</Button>
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
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                id="txtEmail"
                name="email"
                placeholder="username@domain.com"
                required
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                id="txtName"
                name="name"
                placeholder="Julio Robles"
                required
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                id="txtUsername"
                name="username"
                placeholder="username"
                required
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                id="txtPassword"
                name="password"
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
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                id="txtEmail"
                name="email"
                placeholder="username@domain.com"
                required
                onChange={handleChange}
                value={currentUser && currentUser.email}
              />
            </Form.Group>
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
            <Form.Group>
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                id="txtUsername"
                name="username"
                placeholder="username"
                required
                onChange={handleChange}
                value={currentUser && currentUser.username}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                id="txtPassword"
                name="password"
                onChange={handleChange}
                value={currentUser && currentUser.password}
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
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                id="txtEmail"
                name="email"
                readOnly
                value={currentUser && currentUser.email}
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
            <Form.Group>
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                id="txtUsername"
                name="username"
                readOnly
                value={currentUser && currentUser.username}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="text"
                id="txtPassword"
                name="password"
                readOnly
                value={currentUser && currentUser.password}
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
              <br />
              <Form.Label>
                <b>Email:</b>
              </Form.Label>
              <Form.Label>{currentUser && currentUser.email}</Form.Label>
              <br />
              <Form.Label>
                <b>Name:</b>
              </Form.Label>
              <Form.Label>{currentUser && currentUser.name}</Form.Label>
              <br />
              <Form.Label>
                <b>Username:</b>
              </Form.Label>
              <Form.Label>{currentUser && currentUser.username}</Form.Label>
              <br />
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
    </Container>
  );
}
