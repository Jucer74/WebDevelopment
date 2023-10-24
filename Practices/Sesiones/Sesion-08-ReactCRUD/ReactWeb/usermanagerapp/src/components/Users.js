import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, Table, Modal, ModalBody, ModalFooter, ModalHeader, Form } from 'react-bootstrap';
import { FontAwesomeIcon as Fas } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export function Users() {
  const baseUrl = "https://localhost:44314/Api/Users";

  const [data, setData] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    id: '',
    email: '',
    username: '',
    name: '',
    password: ''
  });

  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [showModalDetails, setShowModalDetails] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);

  const openCloseModalCreate = () => setShowModalCreate(!showModalCreate);
  const openCloseModalUpdate = () => setShowModalUpdate(!showModalUpdate);
  const openCloseModalDetails = () => setShowModalDetails(!showModalDetails);
  const openCloseModalDelete = () => setShowModalDelete(!showModalDelete);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({
      ...currentUser,
      [name]: value
    });
  };

  const GetUsers = async () => {
    try {
      const response = await axios.get(baseUrl);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    GetUsers();
  }, []);

  const postUser = async () => {
    delete currentUser.id;
    try {
      await axios.post(baseUrl, currentUser);
      GetUsers();
      openCloseModalCreate();
    } catch (error) {
      console.log("Error creating user:", error);
    }
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
    try {
      await axios.put(baseUrl + "/" + currentUser.id, currentUser);
      GetUsers();
      openCloseModalUpdate();
    } catch (error) {
      console.log("Error updating user:", error);
    }
  };

  const deleteUser = async () => {
    try {
      await axios.delete(baseUrl + "/" + currentUser.id);
      setData(data.filter((usr) => usr.id !== currentUser.id));
      openCloseModalDelete();
    } catch (error) {
      console.log("Error deleting user:", error);
    }
  };

  return (
    <Container className="text-center text-md-left">
      <h1>User List</h1>
      <p>
        <Button className="left" variant="success btn-sm" onClick={() => openCloseModalCreate()}>
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
                <Button variant="outline-primary btn-sm" onClick={() => selectCurrentUser(usr, "Edit")}>
                  Edit
                </Button>{" "}
                <Button variant="outline-warning btn-sm" onClick={() => selectCurrentUser(usr, "Details")}>
                  Details
                </Button>{" "}
                <Button variant="outline-danger btn-sm" onClick={() => selectCurrentUser(usr, "Delete")}>
                  Delete
                </Button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Create */}
      <Modal show={showModalCreate} onHide={() => openCloseModalCreate()}>
        <ModalHeader>Create User</ModalHeader>
        <ModalBody>
          <Form>
            <Form.Group>
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" id="txtEmail" name="email" placeholder="username@domain.com" required onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Name:</Form.Label>
              <Form.Control type="text" id="txtName" name="name" placeholder="Julio Robles" required onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Username:</Form.Label>
              <Form.Control type="text" id="txtUsername" name="username" placeholder="username" required onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" id="txtPassword" name="password" onChange={handleChange} />
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
      <Modal show={showModalUpdate} onHide={() => openCloseModalUpdate()}>
        <ModalHeader>Edit User</ModalHeader>
        <ModalBody>
          <Form>
            <Form.Group>
              <Form.Label>Id:</Form.Label>
              <Form.Control type="text" id="txtId" name="id" readOnly value={currentUser && currentUser.id} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" id="txtEmail" name="email" placeholder="username@domain.com" required onChange={handleChange} value={currentUser && currentUser.email} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Name:</Form.Label>
              <Form.Control type="text" id="txtName" name="name" placeholder="Julio Robles" required onChange={handleChange} value={currentUser && currentUser.name} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Username:</Form.Label>
              <Form.Control type="text" id="txtUsername" name="username" placeholder="username" required onChange={handleChange} value={currentUser && currentUser.username} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" id="txtPassword" name="password" onChange={handleChange} value={currentUser && currentUser.password} />
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
      <Modal show={showModalDetails} onHide={() => openCloseModalDetails()}>
        <ModalHeader>Details User</ModalHeader>
        <ModalBody>
          <Form>
            <Form.Group>
              <Form.Label>Id:</Form.Label>
              <Form.Control type="text" id="txtId" name="id" readOnly value={currentUser && currentUser.id} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" id="txtEmail" name="email" readOnly value={currentUser && currentUser.email} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Name:</Form.Label>
              <Form.Control type="text" id="txtName" name="name" readOnly value={currentUser && currentUser.name} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Username:</Form.Label>
              <Form.Control type="text" id="txtUsername" name="username" readOnly value={currentUser && currentUser.username} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password:</Form.Label>
              <Form.Control type="text" id="txtPassword" name="password" readOnly value={currentUser && currentUser.password} />
            </Form.Group>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline-info" onClick={() => openCloseModalDetails()}>
            Back
          </Button>
        </ModalFooter>
      </Modal>

      {/* Delete */}
      <Modal show={showModalDelete} onHide={() => openCloseModalDelete()}>
        <ModalHeader>Are you sure to delete this user?</ModalHeader>
        <ModalBody>
          <Form>
            <Form.Group>
              <Form.Label><b>Id:</b></Form.Label>
              <Form.Label>{currentUser && currentUser.id}</Form.Label><br />
              <Form.Label><b>Email:</b></Form.Label>
              <Form.Label>{currentUser && currentUser.email}</Form.Label><br />
              <Form.Label><b>Name:</b></Form.Label>
              <Form.Label>{currentUser && currentUser.name}</Form.Label><br />
              <Form.Label><b>Username:</b></Form.Label>
              <Form.Label>{currentUser && currentUser.username}</Form.Label><br />
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
