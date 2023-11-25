import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Button, Container, Table, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export function RealEstateList() {
  const baseUrl = "https://localhost:5001/api/realestates";

  const navigate = useNavigate();
  const [validationError, setValidationError] = useState('');
  const [data, setData] = useState([]);
  const [currentRealEstate, setCurrentRealEstate] = useState({
    id: '',
    propertyType: '',
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
    setCurrentRealEstate({
      ...currentRealEstate,
      [name]: value
    });
    setValidationError('');
  }

  const getRealEstates = async () => {
    await axios.get(baseUrl)
      .then(response => {
        setData(response.data);
      }).catch(error => {
        console.log(error);
      })
  }

  useEffect(() => {
    getRealEstates();
  }, []);

  const postRealEstate = async () => {
    if (!currentRealEstate.propertyType) {
      setValidationError('Please provide a property type.');
      return;
    }
  
    const newRealEstate = {
      propertyType: currentRealEstate.propertyType,
    };
  
    await axios.post(baseUrl, newRealEstate)
      .then(response => {
        getRealEstates();
        openCloseModalCreate();
        setCurrentRealEstate({}); 
      }).catch(error => {
        console.log(error);
      });
  };
  
  const putRealEstate = async () => {
    if (!currentRealEstate.propertyType) {
      setValidationError('Please provide a property type.');
      return;
    }
  
    await axios.put(baseUrl + "/" + currentRealEstate.id, currentRealEstate)
      .then(response => {
        var result = response.data;
        var updatedData = data.map(realEstate => realEstate.id === currentRealEstate.id ? result : realEstate);
        setData(updatedData);
        getRealEstates();
        openCloseModalUpdate();
        setCurrentRealEstate({}); 
      }).catch(error => {
        console.log(error);
      });
  };

  const deleteRealEstate = async (id) => {
    await axios.delete(baseUrl + "/" + id)
      .then(() => {
        setData(data.filter(realEstate => realEstate.id !== id));
        openCloseModalDelete();
      }).catch(error => {
        console.log(error);
      })
  }

  const selectCurrentRealEstate = (realEstate, action) => {
    setCurrentRealEstate(realEstate);
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
        case "Property":
          navigate(`/RealEstateProducts/${realEstate.id}`);
          break;
        default:
          break;
    }
  }

  return (
      <Container className="text-center text-md-left" fluid>
        <div style={{ marginTop: '20px' }}>
          <h1>Real Estate Property Type List</h1>
        </div>
        <p>
          <Button className="left" variant="success btn-sm" onClick={() => openCloseModalCreate()}>
            <FontAwesomeIcon icon={faPlus} /> New
          </Button>
        </p>
        <Table id="RealEstatesTable">
          <thead>
            <tr>
              <th>Id</th>
              <th>Property Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map(realEstate => (
              <tr key={realEstate.id}>
                <td>{realEstate.id}</td>
                <td>{realEstate.propertyType}</td>
                <td>
                  <Button variant="outline-primary btn-sm" onClick={() => selectCurrentRealEstate(realEstate, "Edit")}>Edit</Button>
                  <Button variant="outline-warning btn-sm" onClick={() => selectCurrentRealEstate(realEstate, "Details")}>Details</Button>
                  <Button variant="outline-danger btn-sm" onClick={() => selectCurrentRealEstate(realEstate, "Delete")}>Delete</Button>
                  <Button variant="outline-info btn-sm" onClick={() => selectCurrentRealEstate(realEstate, "Property")}>Properties</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
  
      {/* Create */}
      <Modal isOpen={showModalCreate}>
        <ModalHeader>Create Real Estate Property Type</ModalHeader>
        <ModalBody>
          <Form>
            <Form.Group>
              <Form.Label>Property Type:</Form.Label>
              <Form.Control type="text" id="txtPropertyType" name="propertyType" required isInvalid={!currentRealEstate.propertyType && validationError !== ''} onChange={handleChange} />
              <Form.Control.Feedback type="invalid">{validationError}</Form.Control.Feedback>
            </Form.Group>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" onClick={() => postRealEstate()}>Create</Button>
          <Button variant="outline-info" onClick={() => openCloseModalCreate()}>Back</Button>
        </ModalFooter>
      </Modal>

        {/* Update */}
        <Modal isOpen={showModalUpdate}>
      <ModalHeader>Edit Real Estate Property Type </ModalHeader>
      <ModalBody>
        <Form>
          <Form.Group>
            <Form.Label>Id:</Form.Label>
            <Form.Control type="text" id="txtId" name="id" readOnly value={currentRealEstate.id} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Property Type:</Form.Label>
            <Form.Control type="text" id="txtPropertyType" name="propertyType" required isInvalid={!currentRealEstate.propertyType && validationError !== ''} onChange={handleChange} value={currentRealEstate.propertyType} />
            <Form.Control.Feedback type="invalid">{validationError}</Form.Control.Feedback>
          </Form.Group>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button variant="primary" onClick={() => putRealEstate()}>Save</Button>
        <Button variant="outline-info" onClick={() => openCloseModalUpdate()}>Back</Button>
      </ModalFooter>
    </Modal>

    {/* Details */}
    <Modal isOpen={showModalDetails}>
      <ModalHeader>Details Real Estate Property Type</ModalHeader>
      <ModalBody>
        <Form>
          <Form.Group>
            <Form.Label>Id:</Form.Label>
            <Form.Control type="text" id="txtId" name="id" readOnly value={currentRealEstate.id} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Property Type:</Form.Label>
            <Form.Control type="text" id="txtPropertyType" name="propertyType" readOnly value={currentRealEstate.propertyType} />
          </Form.Group>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button variant="outline-info" onClick={() => openCloseModalDetails()}>Back</Button>
      </ModalFooter>
    </Modal>

    {/* Delete */}
    <Modal isOpen={showModalDelete}>
      <ModalHeader>Are you sure to delete this Real Estate Property Type?</ModalHeader>
      <ModalBody>
        <Form>
          <Form.Group>
            <Form.Label><b>Id:</b></Form.Label>
            <Form.Label>{currentRealEstate.id}</Form.Label><br />
            <Form.Label><b>Property Type:</b></Form.Label>
            <Form.Label>{currentRealEstate.propertyType}</Form.Label><br />
          </Form.Group>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button variant="danger" onClick={() => deleteRealEstate(currentRealEstate.id)}>Delete</Button>
        <Button variant="outline-info" onClick={() => openCloseModalDelete()}>Back</Button>
      </ModalFooter>
    </Modal>
  </Container>
);
}
