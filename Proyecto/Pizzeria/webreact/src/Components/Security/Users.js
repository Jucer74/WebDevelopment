import React, { useState } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';

const CrudComponent = () => {
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    username: '',
    password: '',
  });

  const users = [
    { id: 1, email: 'user1@email.com', name: 'User One', username: 'user1', password: 'password1' },
    { id: 2, email: 'user2@email.com', name: 'User Two', username: 'user2', password: 'password2' },
    { id: 3, email: 'user3@email.com', name: 'User Three', username: 'user3', password: 'password3' },
    { id: 4, email: 'user4@email.com', name: 'User Four', username: 'user4', password: 'password4' },
    { id: 5, email: 'user5@email.com', name: 'User Five', username: 'user5', password: 'password5' },
  ];

  const openCloseModalCreate = () => setShowModalCreate(!showModalCreate);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const postUser = () => {
    console.log(formData);
    openCloseModalCreate();
  };

  return (
    <>
      <div className="container">
        <h1>User List</h1>
        <p>
          <Button variant="success" onClick={openCloseModalCreate}>
            <i className="fas fa-plus"></i> New
          </Button>
        </p>
      </div>

      <Modal show={showModalCreate} onHide={openCloseModalCreate}>
        <Modal.Header closeButton>
          <Modal.Title>Create User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" id="txtEmail" name="email" placeholder="username@domain.com" required onChange={handleChange}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Name:</Form.Label>
              <Form.Control type="text" id="txtName" name="name" placeholder="Bon Jovi" required onChange={handleChange}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Username:</Form.Label>
              <Form.Control type="text" id="txtUsername" name="username" placeholder="username" required onChange={handleChange}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" id="txtPassword" name="password" onChange={handleChange}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={postUser}>Create</Button>
          <Button variant="outline-info" onClick={openCloseModalCreate}>Back</Button>
        </Modal.Footer>
      </Modal>

      <div className="container">
        <Table striped bordered hover>
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
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.password}</td>
                <td>
                  <Button variant="outline-primary" className="mr-2">Edit</Button>
                  <Button variant="outline-warning" className="mr-2">Details</Button>
                  <Button variant="outline-danger">Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default CrudComponent;
