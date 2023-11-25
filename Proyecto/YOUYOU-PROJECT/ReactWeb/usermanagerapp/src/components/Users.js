import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Button, Container, Table, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';

export function AgentDeportivoList() {
  const baseUrlCategory = "https://localhost:5001/api/Sportagent";
  const baseUrl = "https://localhost:5001/api/TipoagenteDeportivo";
  const { deporteId } = useParams();
  const [data, setData] = useState([]);
  const [currentagentDeportivo, setCurrentagentDeportivo] = useState({
    id: '',
    agente_deportivo_id: deporteId,
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    phone: '',
    agent: '',
    country: '',
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
    setCurrentagentDeportivo({
      ...currentagentDeportivo,
      [name]: value
    });
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrlCategory}/${deporteId}/Category`);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, [deporteId]);

  const postagentDeportivo = async () => {
    delete currentagentDeportivo.id;
    await axios.post(baseUrl, currentagentDeportivo)
      .then(response => {
        fetchData();
        openCloseModalCreate();
      }).catch(error => {
        console.log(error);
      })
  }

  const putagentDeportivo = async () => {
    await axios.put(baseUrl + "/" + currentagentDeportivo.id, currentagentDeportivo)
      .then(response => {
        var result = response.data;
        var updatedData = data.map(agent => agent.id === currentagentDeportivo.id ? result : agent);
        setData(updatedData);
        fetchData();
        openCloseModalUpdate();
      }).catch(error => {
        console.log(error);
      })
  }

  const deleteagentDeportivo = async (id) => {
    await axios.delete(baseUrl + "/" + id)
      .then(() => {
        setData(data.filter(agent => agent.id !== id));
        openCloseModalDelete();
      }).catch(error => {
        console.log(error);
      })
  }

  const selectCurrentagentDeportivo = (agent, action) => {
    setCurrentagentDeportivo(agent);
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
    <Container className="text-center text-md-left" fluid>
      <div style={{ marginTop: '20px' }}>
        <h1>agent Deportivo List</h1>
      </div>
      <p>
        <Button className="left" variant="success btn-sm" onClick={() => openCloseModalCreate()}>
          <FontAwesomeIcon icon={faPlus} /> New
        </Button>
      </p>
      <Table id="agentDeportivosTable">
        <thead>
          <tr>
            <th>first_name</th>
            <th>last_name</th>
            <th>email</th>
            <th>gender</th>
            <th>phone</th>
            <th>agent</th>
            <th>country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(agent => (
            <tr key={agent.id}>
              <td>{agent.first_name}</td>
              <td>{agent.last_name}</td>
              <td>{agent.email}</td>
              <td>{agent.gender}</td>
              <td>{agent.phone}</td>
              <td>{agent.agent}</td>
              <td>{agent.country}</td>
              <td>
                <Button variant="outline-primary btn-sm" onClick={() => selectCurrentagentDeportivo(agent, "Edit")}>Edit</Button>
                <Button variant="outline-warning btn-sm" onClick={() => selectCurrentagentDeportivo(agent, "Details")}>Details</Button>
                <Button variant="outline-danger btn-sm" onClick={() => selectCurrentagentDeportivo(agent, "Delete")}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Create */}
      <Modal isOpen={showModalCreate}>
        <ModalHeader>Create agent Deportivo</ModalHeader>
        <ModalBody>
          <Form>
            <Form.Group>
              <Form.Label>agente_deportivo_id:</Form.Label>
              <Form.Control type="text" id="txtagente_deportivo_id" name="agente_deportivo_id" required onChange={handleChange} value={currentagentDeportivo.SportAgentId} />
            </Form.Group>
            <Form.Group>
              <Form.Label>first_name:</Form.Label>
              <Form.Control type="text" id="txtfirst_name" name="first_name" placeholder="Enter first name" required onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>last_name:</Form.Label>
              <Form.Control type="text" id="txtlast_name" name="last_name" placeholder="Enter last name" required onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>email:</Form.Label>
              <Form.Control type="email" id="txtemail" name="email" placeholder="Enter email" required onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>gender:</Form.Label>
              <Form.Control type="text" id="txtgender" name="gender" placeholder="Enter gender" required onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>phone:</Form.Label>
              <Form.Control type="text" id="txtphone" name="phone" placeholder="Enter phone" required onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>agent:</Form.Label>
              <Form.Control type="text" id="txtagent" name="agent" placeholder="Enter agent" required onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>country:</Form.Label>
              <Form.Control type="text" id="txtcountry" name="country" placeholder="Enter country" required onChange={handleChange} />
            </Form.Group>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" onClick={() => postagentDeportivo()}>Create</Button>
          <Button variant="outline-info" onClick={() => openCloseModalCreate()}>Back</Button>
        </ModalFooter>
      </Modal>

      {/* Update */}
      <Modal isOpen={showModalUpdate}>
        <ModalHeader>Edit agent Deportivo</ModalHeader>
        <ModalBody>
          <Form>
            <Form.Group>
              <Form.Label>Id:</Form.Label>
              <Form.Control type="text" id="txtId" name="Id" readOnly value={currentagentDeportivo.id} />
            </Form.Group>
            <Form.Group>
              <Form.Label>agente_deportivo_id</Form.Label>
              <Form.Control type="text" id="txtagente_deportivo_id" name="agente_deportivo_id" readOnly value={currentagentDeportivo.agente_deportivo_id} />
            </Form.Group>
            <Form.Group>
              <Form.Label>first_name:</Form.Label>
              <Form.Control type="text" id="txtfirst_name" name="first_name" required onChange={handleChange} value={currentagentDeportivo.first_name} />
            </Form.Group>
            <Form.Group>
              <Form.Label>last_name:</Form.Label>
              <Form.Control type="text" id="txtlast_name" name="last_name" required onChange={handleChange} value={currentagentDeportivo.last_name} />
            </Form.Group>
            <Form.Group>
              <Form.Label>email:</Form.Label>
              <Form.Control type="email" id="txtemail" name="email" required onChange={handleChange} value={currentagentDeportivo.email} />
            </Form.Group>
            <Form.Group>
              <Form.Label>gender:</Form.Label>
              <Form.Control type="text" id="txtgender" name="gender" required onChange={handleChange} value={currentagentDeportivo.gender} />
            </Form.Group>
            <Form.Group>
              <Form.Label>phone:</Form.Label>
              <Form.Control type="text" id="txtphone" name="phone" required onChange={handleChange} value={currentagentDeportivo.phone} />
            </Form.Group>
            <Form.Group>
              <Form.Label>agent:</Form.Label>
              <Form.Control type="text" id="txtagent" name="agent" required onChange={handleChange} value={currentagentDeportivo.agent} />
            </Form.Group>
            <Form.Group>
              <Form.Label>country:</Form.Label>
              <Form.Control type="text" id="txtcountry" name="country" required onChange={handleChange} value={currentagentDeportivo.country} />
            </Form.Group>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" onClick={() => putagentDeportivo()}>Save</Button>
          <Button variant="outline-info" onClick={() => openCloseModalUpdate()}>Back</Button>
        </ModalFooter>
      </Modal>

      {/* Details */}
      <Modal isOpen={showModalDetails}>
        <ModalHeader>Details agent Deportivo</ModalHeader>
        <ModalBody>
          <Form>
            <Form.Group>
              <Form.Label>Id:</Form.Label>
              <Form.Control type="text" id="txtId" name="Id" readOnly value={currentagentDeportivo.id} />
            </Form.Group>
            <Form.Group>
              <Form.Label>agente_deportivo_id:</Form.Label>
              <Form.Control type="text" id="txtagente_deportivo_id" name="agente_deportivo_id" readOnly value={currentagentDeportivo.agente_deportivo_id} />
            </Form.Group>
            <Form.Group>
              <Form.Label>first_name:</Form.Label>
              <Form.Control type="text" id="txtfirst_name" name="first_name" readOnly value={currentagentDeportivo.first_name} />
            </Form.Group>
            <Form.Group>
              <Form.Label>last_name:</Form.Label>
              <Form.Control type="text" id="txtlast_name" name="last_name" readOnly value={currentagentDeportivo.last_name} />
            </Form.Group>
            <Form.Group>
              <Form.Label>email:</Form.Label>
              <Form.Control type="email" id="txtemail" name="email" readOnly value={currentagentDeportivo.email} />
            </Form.Group>
            <Form.Group>
              <Form.Label>gender:</Form.Label>
              <Form.Control type="text" id="txtgender" name="gender" readOnly value={currentagentDeportivo.gender} />
            </Form.Group>
            <Form.Group>
              <Form.Label>phone:</Form.Label>
              <Form.Control type="text" id="txtphone" name="phone" readOnly value={currentagentDeportivo.phone} />
            </Form.Group>
            <Form.Group>
              <Form.Label>agent:</Form.Label>
              <Form.Control type="text" id="txtagent" name="agent" readOnly value={currentagentDeportivo.agent} />
            </Form.Group>
            <Form.Group>
              <Form.Label>country:</Form.Label>
              <Form.Control type="text" id="txtcountry" name="country" readOnly value={currentagentDeportivo.country} />
            </Form.Group>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline-info" onClick={() => openCloseModalDetails()}>Back</Button>
        </ModalFooter>
      </Modal>

      {/* Delete */}
      <Modal isOpen={showModalDelete}>
        <ModalHeader>Are you sure to delete this agent Deportivo?</ModalHeader>
        <ModalBody>
          <Form>
            <Form.Group>
              <Form.Label><b>Id:</b></Form.Label>
              <Form.Label>{currentagentDeportivo.id}</Form.Label><br />
              <Form.Label><b>agente_deportivo_id:</b></Form.Label>
              <Form.Label>{currentagentDeportivo.agente_deportivo_id}</Form.Label><br />
              <Form.Label><b>first_name:</b></Form.Label>
              <Form.Label>{currentagentDeportivo.first_name}</Form.Label><br />
              <Form.Label><b>last_name:</b></Form.Label>
              <Form.Label>{currentagentDeportivo.last_name}</Form.Label><br />
              <Form.Label><b>email:</b></Form.Label>
              <Form.Label>{currentagentDeportivo.email}</Form.Label><br />
              <Form.Label><b>gender:</b></Form.Label>
              <Form.Label>{currentagentDeportivo.gender}</Form.Label><br />
              <Form.Label><b>phone:</b></Form.Label>
              <Form.Label>{currentagentDeportivo.phone}</Form.Label><br />
              <Form.Label><b>agent:</b></Form.Label>
              <Form.Label>{currentagentDeportivo.agent}</Form.Label><br />
              <Form.Label><b>country:</b></Form.Label>
              <Form.Label>{currentagentDeportivo.country}</Form.Label><br />
            </Form.Group>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button variant="danger" onClick={() => deleteagentDeportivo(currentagentDeportivo.id)}>Delete</Button>
          <Button variant="outline-info" onClick={() => openCloseModalDelete()}>Back</Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
}