import React, { useState, useEffect } from 'react';
import { Button, Container, Table, Form } from 'react-bootstrap';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export function RealEstateProducts() {
  const baseUrl = "https://localhost:5001/api/realestates";
  const baseUrlCategory = "https://localhost:5001/api/realestatescategory";

  const { categoryId } = useParams();
 
  const [data, setData] = useState([]);
  const [currentRealEstateCategory, setCurrentRealEstateCategory] = useState({
    id: '',
    realestateId: categoryId,
    urlImagen: '',
    description: '',
    address: '',
    location: '',
    price: '',
    rooms: '',
    bathrooms: '',
    builtArea: '',
    stratum: '',
    contact: '', 
  });

  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [showModalDetails, setShowModalDetails] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [validationErrorCreate, setValidationErrorCreate] = useState('');
  const [validationErrorUpdate, setValidationErrorUpdate] = useState('');

  const openCloseModalCreate = () => {
    setShowModalCreate(!showModalCreate);
    setValidationErrorCreate('');
  }

  const openCloseModalUpdate = () => {
    setShowModalUpdate(!showModalUpdate);
    setValidationErrorUpdate('');
  }

  const openCloseModalDetails = () => {
    setShowModalDetails(!showModalDetails);
  }

  const openCloseModalDelete = () => {
    setShowModalDelete(!showModalDelete);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentRealEstateCategory({
      ...currentRealEstateCategory,
      [name]: value
    });
    setValidationErrorCreate(''); 
    setValidationErrorUpdate('');
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/${categoryId}/Category`);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, [categoryId]);
  
  
  const postRealEstateCategory = async () => {
    if (!currentRealEstateCategory.urlImagen || !currentRealEstateCategory.description || !currentRealEstateCategory.address || !currentRealEstateCategory.location || !currentRealEstateCategory.price || !currentRealEstateCategory.rooms || !currentRealEstateCategory.bathrooms || !currentRealEstateCategory.builtArea || !currentRealEstateCategory.stratum) {
      setValidationErrorCreate('This field is required');
      return;
    }

    delete currentRealEstateCategory.id;
    await axios
      .post(baseUrlCategory, currentRealEstateCategory)
      .then((response) => {
        fetchData();
        openCloseModalCreate();
        setCurrentRealEstateCategory({}); 
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const putRealEstateCategory = async () => {
    if (!currentRealEstateCategory.urlImagen || !currentRealEstateCategory.description || !currentRealEstateCategory.address || !currentRealEstateCategory.location || !currentRealEstateCategory.price || !currentRealEstateCategory.rooms || !currentRealEstateCategory.bathrooms || !currentRealEstateCategory.builtArea || !currentRealEstateCategory.stratum) {
      setValidationErrorUpdate('This field is required');
      return;
    }

    await axios
      .put(baseUrlCategory + "/" + currentRealEstateCategory.id, currentRealEstateCategory)
      .then((response) => {
        var result = response.data;
        var updatedData = data.map(
          (realEstateCategory) =>
            realEstateCategory.id === currentRealEstateCategory.id ? result : realEstateCategory
        );
        setData(updatedData);
        fetchData();
        openCloseModalUpdate();
        setCurrentRealEstateCategory({}); 
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteRealEstateCategory = async (id) => {
    await axios.delete(baseUrlCategory + "/" + id)
      .then(() => {
        setData(data.filter(realEstateCategory => realEstateCategory.id !== id));
        openCloseModalDelete();
      }).catch(error => {
        console.log(error);
      })
  }

  const selectCurrentRealEstateCategory = (realEstateCategory, action) => {
    setCurrentRealEstateCategory(realEstateCategory);
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
          <h1>Real Estate List</h1>
        </div>
        <p>
          <Button className="left" variant="success btn-sm" onClick={() => openCloseModalCreate()}>
            <FontAwesomeIcon icon={faPlus} /> New
          </Button>
        </p>
        <Table id="RealEstatesTable" responsive>
          <thead>
            <tr>
              <th>Image URL</th>
              <th className="d-none d-md-table-cell">Description</th>
              <th>Address</th>
              <th>Price</th>
              <th className="d-none d-md-table-cell">Rooms</th>
              <th className="d-none d-md-table-cell">Bathrooms</th>
              <th className="d-none d-md-table-cell">Built Area</th>
              <th className="d-none d-md-table-cell">Stratum</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map(realEstateCategory => (
              <tr key={realEstateCategory.id}>
                <td><img src={`${process.env.PUBLIC_URL}/images/${realEstateCategory.urlImagen}`} alt="" style={{ maxWidth: '100px' }}/></td>
                <td className="d-none d-md-table-cell">{realEstateCategory.description}</td>
                <td>{realEstateCategory.address}</td>
                <td>{realEstateCategory.price}</td>
                <td className="d-none d-md-table-cell">{realEstateCategory.rooms}</td>
                <td className="d-none d-md-table-cell">{realEstateCategory.bathrooms}</td>
                <td className="d-none d-md-table-cell">{realEstateCategory.builtArea}</td>
                <td className="d-none d-md-table-cell">{realEstateCategory.stratum}</td>
                <td>
                  <Button variant="outline-primary btn-sm" onClick={() => selectCurrentRealEstateCategory(realEstateCategory, "Edit")}>Edit</Button>
                  <Button variant="outline-warning btn-sm" onClick={() => selectCurrentRealEstateCategory(realEstateCategory, "Details")}>Details</Button>
                  <Button variant="outline-danger btn-sm" onClick={() => selectCurrentRealEstateCategory(realEstateCategory, "Delete")}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Create */}
      <Modal isOpen={showModalCreate} size="lg">
        <ModalHeader>Create Real Estate</ModalHeader>
        <ModalBody>
          <Form>
            <Form.Group>
              <Form.Label>Image URL:</Form.Label>
              <Form.Control type="text" id="txtURLImagen" name="urlImagen" required isInvalid={!currentRealEstateCategory.urlImagen && validationErrorCreate !== ''} onChange={handleChange} />
              <Form.Control.Feedback type="invalid">{validationErrorCreate}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>RealestateId:</Form.Label>
              <Form.Control type="text" id="txtPropertyType" name="propertyType" readOnly onChange={handleChange} value={currentRealEstateCategory.realestateId} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description:</Form.Label>
              <Form.Control type="text" id="txtDescription" name="description" required isInvalid={!currentRealEstateCategory.description && validationErrorCreate !== ''} onChange={handleChange} />
              <Form.Control.Feedback type="invalid">{validationErrorCreate}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Address:</Form.Label>
              <Form.Control type="text" id="txtAddress" name="address" required isInvalid={!currentRealEstateCategory.address && validationErrorCreate !== ''} onChange={handleChange} />
              <Form.Control.Feedback type="invalid">{validationErrorCreate}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Location:</Form.Label>
              <Form.Control type="text" id="txtLocation" name="location" required isInvalid={!currentRealEstateCategory.location && validationErrorCreate !== ''} onChange={handleChange} />
              <Form.Control.Feedback type="invalid">{validationErrorCreate}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Price:</Form.Label>
              <Form.Control type="number" id="txtPrice" name="price" required isInvalid={!currentRealEstateCategory.price && validationErrorCreate !== ''} onChange={handleChange} />
              <Form.Control.Feedback type="invalid">{validationErrorCreate}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Rooms:</Form.Label>
              <Form.Control type="number" id="txtRooms" name="rooms" required isInvalid={!currentRealEstateCategory.rooms && validationErrorCreate !== ''} onChange={handleChange} />
              <Form.Control.Feedback type="invalid">{validationErrorCreate}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Bathrooms:</Form.Label>
              <Form.Control type="number" id="txtBathrooms" name="bathrooms" required isInvalid={!currentRealEstateCategory.bathrooms && validationErrorCreate !== ''} onChange={handleChange} />
              <Form.Control.Feedback type="invalid">{validationErrorCreate}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Built Area:</Form.Label>
              <Form.Control type="number" id="txtBuiltArea" name="builtArea" required isInvalid={!currentRealEstateCategory.builtArea && validationErrorCreate !== ''} onChange={handleChange} />
              <Form.Control.Feedback type="invalid">{validationErrorCreate}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Stratum:</Form.Label>
              <Form.Control type="number" id="txtStratum" name="stratum" required isInvalid={!currentRealEstateCategory.stratum && validationErrorCreate !== ''} onChange={handleChange} />
              <Form.Control.Feedback type="invalid">{validationErrorCreate}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Contact:</Form.Label>
              <Form.Control type="text" id="txtContact" name="contact" required isInvalid={!currentRealEstateCategory.contact && validationErrorCreate !== ''} onChange={handleChange} />
              <Form.Control.Feedback type="invalid">{validationErrorCreate}</Form.Control.Feedback>
            </Form.Group>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" onClick={() => postRealEstateCategory()}>Create</Button>
          <Button variant="outline-info" onClick={() => openCloseModalCreate()}>Back</Button>
        </ModalFooter>
      </Modal>

        {/* Update */}
        <Modal isOpen={showModalUpdate} size="lg">
      <ModalHeader>Edit Real Estate</ModalHeader>
      <ModalBody>
        <Form>
          <Form.Group>
            <Form.Label>Id:</Form.Label>
            <Form.Control type="text" id="txtId" name="id" readOnly value={currentRealEstateCategory.id} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Image URL:</Form.Label>
            <Form.Control type="text" id="txtURLImagen" name="urlImagen" required isInvalid={!currentRealEstateCategory.urlImagen && validationErrorUpdate !== ''} onChange={handleChange} value={currentRealEstateCategory.urlImagen} />
            <Form.Control.Feedback type="invalid">{validationErrorUpdate}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>RealestateId:</Form.Label>
            <Form.Control type="text" id="txtPropertyType" name="propertyType" readOnly onChange={handleChange} value={currentRealEstateCategory.realestateId} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description:</Form.Label>
            <Form.Control type="text" id="txtDescription" name="description" required isInvalid={!currentRealEstateCategory.description && validationErrorUpdate !== ''} onChange={handleChange} value={currentRealEstateCategory.description} />
            <Form.Control.Feedback type="invalid">{validationErrorUpdate}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Address:</Form.Label>
            <Form.Control type="text" id="txtAddress" name="address" required isInvalid={!currentRealEstateCategory.address && validationErrorUpdate !== ''} onChange={handleChange} value={currentRealEstateCategory.address} />
            <Form.Control.Feedback type="invalid">{validationErrorUpdate}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Location:</Form.Label>
            <Form.Control type="text" id="txtLocation" name="location" required isInvalid={!currentRealEstateCategory.location && validationErrorUpdate !== ''} onChange={handleChange} value={currentRealEstateCategory.location} />
            <Form.Control.Feedback type="invalid">{validationErrorUpdate}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Price:</Form.Label>
            <Form.Control type="number" id="txtPrice" name="price" required isInvalid={!currentRealEstateCategory.price && validationErrorUpdate !== ''} onChange={handleChange} value={currentRealEstateCategory.price} />
            <Form.Control.Feedback type="invalid">{validationErrorUpdate}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Rooms:</Form.Label>
            <Form.Control type="number" id="txtRooms" name="rooms" required isInvalid={!currentRealEstateCategory.rooms && validationErrorUpdate !== ''} onChange={handleChange} value={currentRealEstateCategory.rooms} />
            <Form.Control.Feedback type="invalid">{validationErrorUpdate}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Bathrooms:</Form.Label>
            <Form.Control type="number" id="txtBathrooms" name="bathrooms" required isInvalid={!currentRealEstateCategory.bathrooms && validationErrorUpdate !== ''} onChange={handleChange} value={currentRealEstateCategory.bathrooms} />
            <Form.Control.Feedback type="invalid">{validationErrorUpdate}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Built Area:</Form.Label>
            <Form.Control type="number" id="txtBuiltArea" name="builtArea" required isInvalid={!currentRealEstateCategory.builtArea && validationErrorUpdate !== ''} onChange={handleChange} value={currentRealEstateCategory.builtArea} />
            <Form.Control.Feedback type="invalid">{validationErrorUpdate}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Stratum:</Form.Label>
            <Form.Control type="number" id="txtStratum" name="stratum" required isInvalid={!currentRealEstateCategory.stratum && validationErrorUpdate !== ''} onChange={handleChange} value={currentRealEstateCategory.stratum} />
            <Form.Control.Feedback type="invalid">{validationErrorUpdate}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Contact:</Form.Label>
            <Form.Control type="text" id="txtContact" name="contact" isInvalid={!currentRealEstateCategory.contact && validationErrorUpdate !== ''} onChange={handleChange} value={currentRealEstateCategory.contact} />
            <Form.Control.Feedback type="invalid">{validationErrorUpdate}</Form.Control.Feedback>
          </Form.Group>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button variant="primary" onClick={() => putRealEstateCategory()}>Save</Button>
        <Button variant="outline-info" onClick={() => openCloseModalUpdate()}>Back</Button>
      </ModalFooter>
    </Modal>

    {/* Details */}
    <Modal isOpen={showModalDetails} size="lg">
      <ModalHeader>Details Real Estate</ModalHeader>
      <ModalBody>
        <Form>
          <Form.Group>
            <Form.Label>Id:</Form.Label>
            <Form.Control type="text" id="txtId" name="id" readOnly value={currentRealEstateCategory.id} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Image URL:</Form.Label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={`${process.env.PUBLIC_URL}/images/${currentRealEstateCategory.urlImagen}`}
                alt=""
                style={{ maxWidth: '100px', marginRight: '10px' }}
              />
            </div>
          </Form.Group>
          <Form.Group>
            <Form.Label>RealestateId:</Form.Label>
            <Form.Control type="text" id="txtPropertyType" name="propertyType" readOnly value={currentRealEstateCategory.realestateId} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description:</Form.Label>
            <Form.Control type="text" id="txtDescription" name="description" readOnly value={currentRealEstateCategory.description} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Address:</Form.Label>
            <Form.Control type="text" id="txtAddress" name="address" readOnly value={currentRealEstateCategory.address} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Location:</Form.Label>
            <Form.Control type="text" id="txtLocation" name="location" readOnly value={currentRealEstateCategory.location} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Price:</Form.Label>
            <Form.Control type="number" id="txtPrice" name="price" readOnly value={currentRealEstateCategory.price} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Rooms:</Form.Label>
            <Form.Control type="number" id="txtRooms" name="rooms" readOnly value={currentRealEstateCategory.rooms} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Bathrooms:</Form.Label>
            <Form.Control type="number" id="txtBathrooms" name="bathrooms" readOnly value={currentRealEstateCategory.bathrooms} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Built Area:</Form.Label>
            <Form.Control type="number" id="txtBuiltArea" name="builtArea" readOnly value={currentRealEstateCategory.builtArea} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Stratum:</Form.Label>
            <Form.Control type="number" id="txtStratum" name="stratum" readOnly value={currentRealEstateCategory.stratum} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Contact:</Form.Label>
            <Form.Control type="text" id="txtContact" name="contact" readOnly value={currentRealEstateCategory.contact} />
          </Form.Group>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button variant="outline-info" onClick={() => openCloseModalDetails()}>Back</Button>
      </ModalFooter>
    </Modal>

    {/* Delete */}
    <Modal isOpen={showModalDelete} size="lg">
      <ModalHeader>Are you sure to delete this Real Estate?</ModalHeader>
      <ModalBody>
        <Form>
          <Form.Group>
            <Form.Label><b>Id:</b></Form.Label>
            <Form.Label>{currentRealEstateCategory.id}</Form.Label><br />
            <Form.Label><b>Image URL:</b></Form.Label>
            <Form.Label>{currentRealEstateCategory.urlImagen}</Form.Label><br />
            <Form.Label><b>RealestateId</b></Form.Label>
            <Form.Label>{currentRealEstateCategory.realestateId}</Form.Label><br />
            <Form.Label><b>Description:</b></Form.Label>
            <Form.Label>{currentRealEstateCategory.description}</Form.Label><br />
            <Form.Label><b>Address:</b></Form.Label>
            <Form.Label>{currentRealEstateCategory.address}</Form.Label><br />
            <Form.Label><b>Location:</b></Form.Label>
            <Form.Label>{currentRealEstateCategory.location}</Form.Label><br />
            <Form.Label><b>Price:</b></Form.Label>
            <Form.Label>{currentRealEstateCategory.price}</Form.Label><br />
            <Form.Label><b>Rooms:</b></Form.Label>
            <Form.Label>{currentRealEstateCategory.rooms}</Form.Label><br />
            <Form.Label><b>Bathrooms:</b></Form.Label>
            <Form.Label>{currentRealEstateCategory.bathrooms}</Form.Label><br />
            <Form.Label><b>Built Area:</b></Form.Label>
            <Form.Label>{currentRealEstateCategory.builtArea}</Form.Label><br />
            <Form.Label><b>Stratum:</b></Form.Label>
            <Form.Label>{currentRealEstateCategory.stratum}</Form.Label><br />
            <Form.Label><b>Contact:</b></Form.Label>
            <Form.Label>{currentRealEstateCategory.contact}</Form.Label><br />
          </Form.Group>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button variant="danger" onClick={() => deleteRealEstateCategory(currentRealEstateCategory.id)}>Delete</Button>
        <Button variant="outline-info" onClick={() => openCloseModalDelete()}>Back</Button>
      </ModalFooter>
    </Modal>
  </Container>
);
}