import React from 'react';
<<<<<<< HEAD
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, Table, Form } from 'react-bootstrap';
import { FontAwesomeIcon as Fas } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';


const baseUrl = "https://localhost:5001/api/v1/People";

export function List() {
  const [data, setData] = useState([]);

  const GetPerson = async () => {
    await axios.get(baseUrl)
      .then(response => {
        setData(response.data);
      }).catch(error => {
        console.log(error);
      })
  }

  useEffect(() => {
    GetPerson();
  }, []);

  // Control data
  const [currentUser, setCurrentUser] = useState({
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    sex: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setCurrentUser({
      ...currentUser,
      [name]: value
    })
  }

  // Create 
  const [showModalCreate, setShowModalCreate] = useState(false);
  const openCloseModalCreate = () => {
    setShowModalCreate(!showModalCreate);
  }

  const postPerson = async () => {
    delete currentUser.id;
    await axios.post(baseUrl, currentUser)
      .then(response => {
        GetPerson();
        openCloseModalCreate();
      }).catch(error => {
        console.log(error);
      })
  }

  // Update
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const openCloseModalUpdate = () => {
    setShowModalUpdate(!showModalUpdate);
  }

  const selectCurrentUser = (people, action) => {
    setCurrentUser(people);
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

  const putPerson = async () => {
    await axios.put(baseUrl + "/" + currentUser.id, currentUser)
      .then(response => {
        var result = response.data;
        var updatedData = data;
        updatedData.map(obj => {
          if (obj.id === currentUser.id) {
            obj.firstName = result.firstName;
            obj.lastName = result.lastName;
            obj.dateOfBirth = result.dateOfBirth;
            obj.sex = result.sex;
          }
        });
        GetPerson();
        openCloseModalUpdate();
      }).catch(error => {
        console.log(error);
      })
  }

  // Details
  const [showModalDetails, setShowModalDetails] = useState(false);
  const openCloseModalDetails = () => {
    setShowModalDetails(!showModalDetails);
  }

  // Delete
  const [showModalDelete, setShowModalDelete] = useState(false);
  const openCloseModalDelete = () => {
    setShowModalDelete(!showModalDelete);
  }

  const deletePerson = async () => {
    await axios.delete(baseUrl + "/" + currentUser.id)
      .then(() => {
        setData(data.filter(data => data.id !== currentUser.id));
        openCloseModalDelete();
      }).catch(error => {
        console.log(error);
      })
  }

  
  return (
    <Container className="text-center text-md-left">
      <h1>People List</h1>
      <p>
        <Button className="left" variant="success btn-sm" onClick={() => openCloseModalCreate()}> <Fas icon={faPlus} /> New</Button>
      </p>
      <Table id="PeopleTable">
        <thead>
          <tr>
            <th>Id</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>DateOfBirth</th>
            <th>Sex</th>
          </tr>
        </thead>
        <tbody>
          {data.map(obj => (
            <tr key={obj.id}>
              <td>{obj.id}</td>
              <td>{obj.firstName}</td>
              <td>{obj.lastName}</td>
              <td>{obj.dateOfBirth}</td>
              <td>{obj.sex}</td>
              <td>
                <Button variant="outline-primary" onClick={() => selectCurrentUser(obj, "Edit")}>Edit</Button>{"  "}
                <Button variant="outline-warning" onClick={() => selectCurrentUser(obj, "Details")}>Details</Button>{"  "}
                <Button variant="outline-danger" onClick={() => selectCurrentUser(obj, "Delete")}>Delete</Button>
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
              <Form.Label>First Name:</Form.Label>
              <Form.Control type="text" id="txtFirstName" name="firstName" placeholder="Juan Camilo" required onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Last Name:</Form.Label>
              <Form.Control type="text" id="txtLastName" name="lastName" placeholder="Rendon" required onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Date Of Birth:</Form.Label>
              <Form.Control type="Date" id="txtDateOfBirth" name="dateOfBirth" placeholder="DateOfBirth" required onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Sex:</Form.Label>
              <Form.Control type="text" id="txtsex" name="sex" onChange={handleChange} />
            </Form.Group>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" onClick={() => postPerson()}>Create</Button>
          <Button variant="outline-info" onClick={() => openCloseModalCreate()}>Back</Button>
        </ModalFooter>
      </Modal>

      {/* Edit */}
      <Modal isOpen={showModalUpdate}>
        <ModalHeader>Edit person</ModalHeader>
        <ModalBody>
          <Form>
            <Form.Group>
              <Form.Label>Id:</Form.Label>
              <Form.Control type="text" id="txtId" name="id" readOnly value={currentUser && currentUser.id} />
            </Form.Group>
            <Form.Group>
              <Form.Label>First Name:</Form.Label>
              <Form.Control type="text" id="txtFirstName" name="firstName" placeholder="Juan Camilo" required onChange={handleChange} value={currentUser && currentUser.firstName} />
            </Form.Group>
            <Form.Group>
              <Form.Label >Last Name:</Form.Label>
              <Form.Control type="text" id="txtLastName" name="lastName" placeholder="Rendon" required onChange={handleChange} value={currentUser && currentUser.lastName} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Date Of Birth:</Form.Label>
              <Form.Control type="text" id="txtDateOfBirth" name="dateOfBirth" placeholder="DateOfBirth" required onChange={handleChange} value={currentUser && currentUser.dateOfBirth} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Sex:</Form.Label>
              <Form.Control type="text" id="txtsex" name="sex" onChange={handleChange} value={currentUser && currentUser.sex} />
            </Form.Group>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" onClick={() => putPerson()}>Save</Button>
          <Button variant="outline-info" onClick={() => openCloseModalUpdate()}>Back</Button>
        </ModalFooter>
      </Modal>

      {/* Details */}
      <Modal isOpen={showModalDetails}>
        <ModalHeader>Details User</ModalHeader>
        <ModalBody>
          <Form>
            <Form.Group>
              <Form.Label>Id:</Form.Label>
              <Form.Control type="text" id="txtId" name="id" readOnly value={currentUser && currentUser.id} />
            </Form.Group>
            <Form.Group>
              <Form.Label>First Name:</Form.Label>
              <Form.Control type="text" id="txtFirstName" name="firstName" readOnly value={currentUser && currentUser.firstName} />
            </Form.Group>
            <Form.Group>
              <Form.Label >Last Name:</Form.Label>
              <Form.Control type="text" id="txtLastName" name="lastName" readOnly value={currentUser && currentUser.lastName} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Date Of Birth:</Form.Label>
              <Form.Control type="text" id="txtDateOfBirth" name="dateOfBirth" readOnly value={currentUser && currentUser.dateOfBirth} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Sex:</Form.Label>
              <Form.Control type="text" id="txtsex" name="sex" readOnly value={currentUser && currentUser.sex} />
            </Form.Group>    </Form>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline-info" onClick={() => openCloseModalDetails()}>Back</Button>
        </ModalFooter>
      </Modal>

      {/* Delete */}
      <Modal isOpen={showModalDelete}>
        <ModalHeader>Are you sure to delete this person?</ModalHeader>
        <ModalBody>
          <Form>
            <Form.Group>
              <Form.Label><b>Id ::</b></Form.Label>
              <Form.Label>{currentUser && currentUser.id}</Form.Label><br />
              <Form.Label><b>First Name :: </b></Form.Label>
              <Form.Label>{currentUser && currentUser.firstName}</Form.Label><br />
              <Form.Label><b>Last Name :: </b></Form.Label>
              <Form.Label>{currentUser && currentUser.lastName}</Form.Label><br />
              <Form.Label><b>Date Of Birth :: </b></Form.Label>
              <Form.Label>{currentUser && currentUser.dateOfBirth}</Form.Label><br />
              <Form.Label><b>Sex ::</b></Form.Label>
              <Form.Label>{currentUser && currentUser.sex}</Form.Label><br />
            </Form.Group>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button variant="danger" onClick={() => deletePerson(currentUser.id)}>Delete</Button>
          <Button variant="outline-info" onClick={() => openCloseModalDelete()}>Back</Button>
        </ModalFooter>
      </Modal>

    </Container>
  );
}
=======

export const People = () => (
  <h1>People</h1>
)
>>>>>>> main
