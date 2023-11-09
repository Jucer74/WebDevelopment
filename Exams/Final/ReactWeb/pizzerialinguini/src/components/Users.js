import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Button, Container, Table, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export function List() {
  const baseUrl = "https://localhost:5001/api/Pizzeria";

  const [data, setData] = useState([]);
  const [currentPizzeria, setCurrentPizzeria] = useState({
    id: '',
    nombre: '',
    tamaño: '',
    precio: ''
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
    setCurrentPizzeria({
      ...currentPizzeria,
      [name]: value
    })
  }

  const getPizzeria = async () => {
    await axios.get(baseUrl)
      .then(response => {
        setData(response.data);
      }).catch(error => {
        console.log(error);
      })
  }

  useEffect(() => {
    getPizzeria();
  }, []);

  const postPizzeria = async () => {
    delete currentPizzeria.id;
    await axios.post(baseUrl, currentPizzeria)
      .then(response => {
        getPizzeria();
        openCloseModalCreate();
      }).catch(error => {
        console.log(error);
      })
  }

  const putPizzeria = async () => {
    await axios.put(baseUrl + "/" + currentPizzeria.id, currentPizzeria)
      .then(response => {
        var result = response.data;
        var updatedData = data.map(pizzeria => pizzeria.id === currentPizzeria.id ? result : pizzeria);
        setData(updatedData);
        getPizzeria();
        openCloseModalUpdate();
      }).catch(error => {
        console.log(error);
      })
  }

  const deletePizzeria = async (id) => {
    await axios.delete(baseUrl + "/" + id)
      .then(() => {
        setData(data.filter(pizzeria => pizzeria.id !== id));
        openCloseModalDelete();
      }).catch(error => {
        console.log(error);
      })
  }

  const selectCurrentPizzeria = (pizzeria, action) => {
    setCurrentPizzeria(pizzeria);
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
      <h1>Nuestras Pizzas</h1>
      <p>
        <Button className="left" variant="success btn-sm" onClick={() => openCloseModalCreate()}>
          <FontAwesomeIcon icon={faPlus} /> New
        </Button>
      </p>
      <Table id="PizzeriaTable">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Tamaño</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {data.map(pizzeria => (
            <tr key={pizzeria.id}>
              <td>{pizzeria.id}</td>
              <td>{pizzeria.nombre}</td>
              <td>{pizzeria.tamaño}</td>
              <td>{pizzeria.precio}</td>
              <td>
                <Button variant="outline-primary btn-sm" onClick={() => selectCurrentPizzeria(pizzeria, "Edit")}>Edit</Button>{"  "}
                <Button variant="outline-warning btn-sm" onClick={() => selectCurrentPizzeria(pizzeria, "Details")}>Details</Button>{"  "}
                <Button variant="outline-danger btn-sm" onClick={() => selectCurrentPizzeria(pizzeria, "Delete")}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

    {/* Create */}
    <Modal isOpen={showModalCreate}>
      <ModalHeader>Create Pizzeria</ModalHeader>
      <ModalBody>
        <Form>
          <Form.Group>
            <Form.Label>Nombre:</Form.Label>
            <Form.Control type="text" id="txtNombre" name="nombre" placeholder="Pizza de Tocineta" required onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Tamaño:</Form.Label>
            <Form.Control type="text" id="txtTamaño" name="tamaño" placeholder="Pequeña/Mediana/Grande" required onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Precio:</Form.Label>
            <Form.Control type="number" id="txtPrecio" name="precio" placeholder="el que quieras" required onChange={handleChange} />
          </Form.Group>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button variant="primary" onClick={() => postPizzeria()}>Create</Button>
        <Button variant="outline-info" onClick={() => openCloseModalCreate()}>Back</Button>
      </ModalFooter>
    </Modal>

    {/* Update */}
    <Modal isOpen={showModalUpdate}>
      <ModalHeader>Edit Pizzeria</ModalHeader>
      <ModalBody>
        <Form>

          <Form.Group>
            <Form.Label>Id:</Form.Label>
            <Form.Control type="number" id="txtId" name="id" readOnly value={currentPizzeria.id} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Nombre:</Form.Label>
            <Form.Control type="text" id="txtNombre" name="nombre" placeholder="No lo se rick" required onChange={handleChange} value={currentPizzeria.nombre} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Tamaño:</Form.Label>
            <Form.Control type="text" id="txtTamaño" name="tamaño" placeholder="Grande" required onChange={handleChange} value={currentPizzeria.tamaño} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Precio:</Form.Label>
            <Form.Control type="number" id="txtPrecio" name="precio" placeholder="No lo se rick" required onChange={handleChange} value={currentPizzeria.precio} />
          </Form.Group>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button variant="primary" onClick={() => putPizzeria()}>Save</Button>
        <Button variant="outline-info" onClick={() => openCloseModalUpdate()}>Back</Button>
      </ModalFooter>
    </Modal>

    {/* Details */}
    <Modal isOpen={showModalDetails}>
      <ModalHeader>Details Pizzeria</ModalHeader>
      <ModalBody>
        <Form>
          <Form.Group>
            <Form.Label>Id:</Form.Label>
            <Form.Control type="number" id="txtId" name="id" readOnly value={currentPizzeria.id} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Nombre:</Form.Label>
            <Form.Control type="text" id="txtNombre" name="nombre" readOnly value={currentPizzeria.nombre} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Tamaño:</Form.Label>
            <Form.Control type="text" id="txtTamaño" name="tamaño" readOnly value={currentPizzeria.tamaño} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Precio:</Form.Label>
            <Form.Control type="number" id="txtPrecio" name="precio" readOnly value={currentPizzeria.precio} />
          </Form.Group>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button variant="outline-info" onClick={() => openCloseModalDetails()}>Back</Button>
      </ModalFooter>
    </Modal>

    {/* Delete */}
    <Modal isOpen={showModalDelete}>
      <ModalHeader>Estas seguro de borrar esta Pizza?</ModalHeader>
      <ModalBody>
        <Form>
          <Form.Group>
            <Form.Label><b>Id:</b></Form.Label>
            <Form.Label>{currentPizzeria.id}</Form.Label><br />
            <Form.Label><b>Nombre:</b></Form.Label>
            <Form.Label>{currentPizzeria.nombre}</Form.Label><br />
            <Form.Label><b>Tamaño:</b></Form.Label>
            <Form.Label>{currentPizzeria.tamaño}</Form.Label><br />
            <Form.Label><b>Precio:</b></Form.Label>
            <Form.Label>{currentPizzeria.precio}</Form.Label><br />
          </Form.Group>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button variant="danger" onClick={() => deletePizzeria(currentPizzeria.id)}>Delete</Button>
        <Button variant="outline-info" onClick={() => openCloseModalDelete()}>Back</Button>
      </ModalFooter>
    </Modal>
  </Container>
  );
}