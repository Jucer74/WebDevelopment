import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Button, Container, Table, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


export function SportAgent() {
  const baseUrl = "https://localhost:5001/api/SportAgent";

  const navigate = useNavigate();
  const [validationError, setValidationError] = useState('');
  const [data, setData] = useState([]);
  const [currentSportAgent, setCurrentSportAgent] = useState({
    id: '',
    deporte: '',
  });

  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [showModalDetails, setShowModalDetails] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);

  const openCloseModalCreate = () => {
    setShowModalCreate(!showModalCreate);
    setValidationError('');
  }

  const openCloseModalUpdate = () => {
    setShowModalUpdate(!showModalUpdate);
    setValidationError('');
  }

  const openCloseModalDetails = () => {
    setShowModalDetails(!showModalDetails);
  }

  const openCloseModalDelete = () => {
    setShowModalDelete(!showModalDelete);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentSportAgent({
      ...currentSportAgent,
      [name]: value
    });
    setValidationError('');
  }

  const getSportAgents = async () => {
    await axios.get(baseUrl)
      .then(response => {
        setData(response.data);
      }).catch(error => {
        console.log(error);
      })
  }

  useEffect(() => {
    getSportAgents();
  }, []);

  const postSportAgent = async () => {
    if (!currentSportAgent.deporte) {
      setValidationError('Please provide a deporte.');
      return;
    }
  
    const newSportAgent = {
      deporte: currentSportAgent.deporte,
    };
  
    await axios.post(baseUrl, newSportAgent)
      .then(response => {
        getSportAgents();
        openCloseModalCreate();
        setCurrentSportAgent({}); 
      }).catch(error => {
        console.log(error);
      });
  };
  
  const putSportAgent = async () => {
    if (!currentSportAgent.deporte) {
      setValidationError('Please provide a deporte.');
      return;
    }
  
    await axios.put(baseUrl + "/" + currentSportAgent.id, currentSportAgent)
      .then(response => {
        var result = response.data;
        var updatedData = data.map(SportAgent => SportAgent.id === currentSportAgent.id ? result : SportAgent);
        setData(updatedData);
        getSportAgents();
        openCloseModalUpdate();
        setCurrentSportAgent({}); 
      }).catch(error => {
        console.log(error);
      });
  };

  const deleteSportAgent = async (id) => {
    await axios.delete(baseUrl + "/" + id)
      .then(() => {
        setData(data.filter(SportAgent => SportAgent.id !== id));
        openCloseModalDelete();
      }).catch(error => {
        console.log(error);
      })
  }

  const selectCurrentSportAgent = (SportAgent, action) => {
    setCurrentSportAgent(SportAgent);
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
        case "Product":
          navigate(`/Users/${SportAgent.id}`);
          break;
        default:
          break;
    }
  }

  return (
      <Container className="text-center text-md-left" fluid>
        <div style={{ marginTop: '20px' }}>
          <h1>Agente Deportivo deporte List</h1>
        </div>
        <p>
          <Button className="left" variant="success btn-sm" onClick={() => openCloseModalCreate()}>
            <FontAwesomeIcon icon={faPlus} /> New
          </Button>
        </p>
        <Table id="SportAgentsTable">
          <thead>
            <tr>
              <th>Id</th>
              <th>deporte</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map(SportAgent => (
              <tr key={SportAgent.id}>
                <td>{SportAgent.id}</td>
                <td>{SportAgent.deporte}</td>
                <td>
                  <Button variant="outline-primary btn-sm" onClick={() => selectCurrentSportAgent(SportAgent, "Edit")}>Edit</Button>
                  <Button variant="outline-warning btn-sm" onClick={() => selectCurrentSportAgent(SportAgent, "Details")}>Details</Button>
                  <Button variant="outline-danger btn-sm" onClick={() => selectCurrentSportAgent(SportAgent, "Delete")}>Delete</Button>
                  <Button variant="outline-info btn-sm" onClick={() => selectCurrentSportAgent(SportAgent, "Product")}>Product</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
  
      {/* Create */}
      <Modal isOpen={showModalCreate}>
        <ModalHeader>Create Agente Deportivo deporte</ModalHeader>
        <ModalBody>
          <Form>
            <Form.Group>
              <Form.Label>deporte:</Form.Label>
              <Form.Control type="text" id="txtdeporte" name="deporte" required isInvalid={!currentSportAgent.deporte && validationError !== ''} onChange={handleChange} />
              <Form.Control.Feedback type="invalid">{validationError}</Form.Control.Feedback>
            </Form.Group>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" onClick={() => postSportAgent()}>Create</Button>
          <Button variant="outline-info" onClick={() => openCloseModalCreate()}>Back</Button>
        </ModalFooter>
      </Modal>

        {/* Update */}
        <Modal isOpen={showModalUpdate}>
      <ModalHeader>Edit Agente Deportivo deporte </ModalHeader>
      <ModalBody>
        <Form>
          <Form.Group>
            <Form.Label>Id:</Form.Label>
            <Form.Control type="text" id="txtId" name="id" readOnly value={currentSportAgent.id} />
          </Form.Group>
          <Form.Group>
            <Form.Label>deporte:</Form.Label>
            <Form.Control type="text" id="txtdeporte" name="deporte" required isInvalid={!currentSportAgent.deporte && validationError !== ''} onChange={handleChange} value={currentSportAgent.deporte} />
            <Form.Control.Feedback type="invalid">{validationError}</Form.Control.Feedback>
          </Form.Group>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button variant="primary" onClick={() => putSportAgent()}>Save</Button>
        <Button variant="outline-info" onClick={() => openCloseModalUpdate()}>Back</Button>
      </ModalFooter>
    </Modal>

    {/* Details */}
    <Modal isOpen={showModalDetails}>
      <ModalHeader>Details Agente Deportivo deporte</ModalHeader>
      <ModalBody>
        <Form>
          <Form.Group>
            <Form.Label>Id:</Form.Label>
            <Form.Control type="text" id="txtId" name="id" readOnly value={currentSportAgent.id} />
          </Form.Group>
          <Form.Group>
            <Form.Label>deporte:</Form.Label>
            <Form.Control type="text" id="txtdeporte" name="deporte" readOnly value={currentSportAgent.deporte} />
          </Form.Group>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button variant="outline-info" onClick={() => openCloseModalDetails()}>Back</Button>
      </ModalFooter>
    </Modal>

    {/* Delete */}
    <Modal isOpen={showModalDelete}>
      <ModalHeader>Are you sure to delete this Agente Deportivo deporte?</ModalHeader>
      <ModalBody>
        <Form>
          <Form.Group>
            <Form.Label><b>Id:</b></Form.Label>
            <Form.Label>{currentSportAgent.id}</Form.Label><br />
            <Form.Label><b>deporte:</b></Form.Label>
            <Form.Label>{currentSportAgent.deporte}</Form.Label><br />
          </Form.Group>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button variant="danger" onClick={() => deleteSportAgent(currentSportAgent.id)}>Delete</Button>
        <Button variant="outline-info" onClick={() => openCloseModalDelete()}>Back</Button>
      </ModalFooter>
    </Modal>
  </Container>
);
}
