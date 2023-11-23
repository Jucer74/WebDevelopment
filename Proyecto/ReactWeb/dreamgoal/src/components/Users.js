import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Table, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";


const baseUrlUser = "https://localhost:5001/api/Users";

const baseUrlAgents = "https://localhost:5001/api/Agents";

export function Users() {
  const [data, setData] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    id: "",
    userEmail: "",
    firstName: "",
    lastName: "",
    password: "",
    Agents: []
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
      .get(baseUrlUser)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  
  const GetAgent = async () => {
    await axios
      .get(baseUrlAgents)
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

  console.log(data);

  const postUser = async () => {
    delete currentUser.id;
    await axios
      .post(baseUrlUser, currentUser)
      .then((response) => {
        GetUsers();
        openCloseModalCreate();
      })
      .catch((error) => {
        console.log(error);
      });
      console.log(currentUser);
  };

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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [showModalDetails, setShowModalDetails] = useState(false);
  const openCloseModalDetails = () => {
    setShowModalDetails(!showModalDetails);
  };

  const [showModalDelete, setShowModalDelete]= useState(false);
  const openCloseModalDelete=()=>{
    setShowModalDelete(!showModalDelete);
  }

  const deleteUser = async() => {
    await axios.delete(baseUrlUser+"/"+ currentUser.id)
    .then (()=>{
      setData(data.filter(usr=>usr.id!==currentUser.id));
      openCloseModalDelete();
    }).catch(error=>{
      console.log(error);
    })
  }  
  
  return (
    <div className=" crud-container m-5 justify-content-between">
    <div className="row col-10 d-flex justify-content-between align-items-center m-auto p-1">
      <h1 className="col-auto text-start">Usuarios</h1>
      <Button className="col-auto text-end" variant="success btn-sm" onClick={() => openCloseModalCreate()}>
        <FontAwesomeIcon icon={faPlus} /> Crear
      </Button>
    </div>


      <div  className=" col-10  m-auto table-responsive">
        <Table  className="table table-striped" id="UsersTable">
          <thead>
            <tr className="justify-content-between">
              <th>Id</th>
              <th>Correo Electrónico</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Password</th>
              <th>Agentes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.filter((usr) => usr.role === 'cliente').map((usr) => (
              <tr key={usr.id}>
              <td>{usr.id}</td>
              <td>{usr.userEmail}</td>
              <td>{usr.firstName}</td>
              <td>{usr.lastName}</td>
              <td>{usr.password}</td>
              <td>
                {usr.agents.length > 0 ? (
                  <ul>
                    {usr.agents.map((agent) => (
                      <div key={agent.id}>{agent.name}</div>
                    ))}
                  </ul>
                ) : (
                  "No Agents"
                )}
              </td>
              <td>
                <Button className="btn-sm" variant="outline-primary" onClick={() => selectCurrentUser(usr, "Edit")}>Edit</Button>{"  "}
                <Button className="btn-sm"variant="outline-warning" onClick={() => selectCurrentUser(usr, "Details")}>Details</Button>{"  "}
                <Button className="btn-sm"variant="outline-danger" onClick={() => selectCurrentUser(usr, "Delete")}>Delete</Button>
              </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
     

      {/* Create */}
      <Modal isOpen={showModalCreate}>
        <ModalHeader>Create User</ModalHeader>
        <ModalBody>
          <Form>
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
            {/* Agregar inputs para los Products si es necesario */}
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
        <Modal isOpen={showModalDetails}     centered={true}>
        <ModalHeader>Details User</ModalHeader>
        <ModalBody>
            <Form>
            <Form.Group className="col-12 my-1">
                <Form.Label>Id:</Form.Label>
                <Form.Control type="text" id="txtId" name="id" readOnly value={currentUser && currentUser.id}/>
            </Form.Group>
            <Form.Group className="col-12 my-1">
                <Form.Label>Correo Electrónico:</Form.Label>
                <Form.Control type="email" id="txtEmail" name="email" readOnly value={currentUser && currentUser.userEmail}/>
            </Form.Group>
            
            <div  className="row my-1"> 
              <Form.Group className="col-6">
                  <Form.Label>Nombre:</Form.Label>
                  <Form.Control type="text" id="txtName" name="Nombre" readOnly value={currentUser && currentUser.firstName}/>
              </Form.Group>
              <Form.Group className="col-6">
                  <Form.Label>Apellido:</Form.Label>
                  <Form.Control type="text" id="txtUsername" name="Apellido" readOnly value={currentUser && currentUser.lastName}/>
              </Form.Group>
            </div>

            <div  className="row my-1"> 
              <Form.Group className="col-6">
                  <Form.Label>Contraseña:</Form.Label>
                  <Form.Control type="text" id="txtName" name="Nombre" readOnly value={currentUser && currentUser.password}/>
              </Form.Group>
              <Form.Group className="col-6">
                  <Form.Label>Rol:</Form.Label>
                  <Form.Control type="text" id="txtUsername" name="Apellido" readOnly value={currentUser && currentUser.role}/>
              </Form.Group>
            </div>

            <Form.Group className="my-1">
              <Form.Label>Agente:</Form.Label>
              <ul>
                  {currentUser && currentUser.agents && currentUser.agents.map((agent, index) => (
                      <li key={index}>
                          {agent.name}
                      </li>
                  ))}
              </ul>
              </Form.Group>
            </Form>
            
        </ModalBody>
        <ModalFooter>
            <Button variant="outline-info" onClick={()=>openCloseModalDetails()}>Back</Button>
        </ModalFooter>
        </Modal>
        {/* Delete */}
        <Modal isOpen={showModalDelete}>
        <ModalHeader>Are you sure to delete this user?</ModalHeader>
        <ModalBody>
            <Form>
            <Form.Group>
                <Form.Label><b>Id:</b></Form.Label>
                <Form.Label>{currentUser && currentUser.id}</Form.Label><br/>
                <Form.Label><b>Email:</b></Form.Label>
                <Form.Label>{currentUser && currentUser.email}</Form.Label><br/>
                <Form.Label><b>Name:</b></Form.Label>
                <Form.Label>{currentUser && currentUser.name}</Form.Label><br/>
                <Form.Label><b>Username:</b></Form.Label>
                <Form.Label>{currentUser && currentUser.username}</Form.Label><br/>
            </Form.Group>
            </Form>
        </ModalBody>
        <ModalFooter>
            <Button variant="danger" onClick={()=>deleteUser(currentUser.id)}>Delete</Button>
            <Button variant="outline-info" onClick={()=>openCloseModalDelete()}>Back</Button>
        </ModalFooter>
        </Modal>
    </div>
  );
}