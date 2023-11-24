import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Button, Container, Table, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export function List() {
  const baseUrl = "https://localhost:5001/api/Users";

  const [data, setData] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    id: '',
    patient: '',
    doctor: '',
    office: '',
    status: ''
  });
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
    setCurrentUser({
      ...currentUser,
      [name]: value
    })
  }

  const getUsers = async () => {
    await axios.get(baseUrl)
      .then(response => {
        setData(response.data);
      }).catch(error => {
        console.log(error);
      })
  }

  useEffect(() => {
    getUsers();
  }, []);

  const postUser = async () => {
    delete currentUser.id;
    await axios.post(baseUrl, currentUser)
      .then(response => {
        getUsers();
        openCloseModalCreate();
      }).catch(error => {
        console.log(error);
      })
  }

  const putUser = async () => {
    await axios.put(baseUrl + "/" + currentUser.id, currentUser)
      .then(response => {
        var result = response.data;
        var updatedData = data.map(usr => usr.id === currentUser.id ? result : usr);
        setData(updatedData);
        getUsers();
        openCloseModalUpdate();
      }).catch(error => {
        console.log(error);
      })
  }

  const deleteUser = async (id) => {
    await axios.delete(baseUrl + "/" + id)
      .then(() => {
        setData(data.filter(usr => usr.id !== id));
        openCloseModalDelete();
      }).catch(error => {
        console.log(error);
      })
  }

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
  }

  return (
    <Container className="text-center text-md-left">
      <h1>User List</h1>
      <p>
        <Button className="left" variant="success btn-sm" onClick={() => openCloseModalCreate()}>
          <FontAwesomeIcon icon={faPlus} /> New
        </Button>
      </p>
      <Table id="UsersTable">
        <thead>
          <tr>
            <th>Id</th>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Office</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map(usr => (
            <tr key={usr.id}>
              <td>{usr.id}</td>
              <td>{usr.patient}</td>
              <td>{usr.doctor}</td>
              <td>{usr.office}</td>
              <td>{usr.status}</td>
              <td>
                <Button variant="outline-primary btn-sm" onClick={() => selectCurrentUser(usr, "Edit")}>Edit</Button>{"  "}
                <Button variant="outline-warning btn-sm" onClick={() => selectCurrentUser(usr, "Details")}>Details</Button>{"  "}
                <Button variant="outline-danger btn-sm" onClick={() => selectCurrentUser(usr, "Delete")}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      
      {/* Resto del código para los modales... */}
    </Container>
  );
}
