import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Button, Container, Table, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export function List() {
  const baseUrl = "https://localhost:5001/api/Libros";

  const [data, setData] = useState([]);
  const [currentLibro, setCurrentLibro] = useState({
    id: '',
    titulo: '',
    autor: '',
    precio: 0,
    cantidad: 0,
    imagen: ''
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
    setCurrentLibro({
      ...currentLibro,
      [name]: value
    })
  }

  const getLibros = async () => {
    try {
      const response = await axios.get(baseUrl);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getLibros();
  }, []);

  const postLibro = async () => {
    delete currentLibro.id;
    try {
      await axios.post(baseUrl, currentLibro);
      getLibros();
      openCloseModalCreate();
    } catch (error) {
      console.log(error);
    }
  }

  const putLibro = async () => {
    try {
      await axios.put(baseUrl + "/" + currentLibro.id, currentLibro);
      getLibros();
      openCloseModalUpdate();
    } catch (error) {
      console.log(error);
    }
  }

  const deleteLibro = async (id) => {
    try {
      await axios.delete(baseUrl + "/" + id);
      setData(data.filter(libro => libro.id !== id));
      openCloseModalDelete();
    } catch (error) {
      console.log(error);
    }
  }

  const selectCurrentLibro = (libro, action) => {
    setCurrentLibro(libro);
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
      <h1>Libro List</h1>
      <p>
        <Button className="left" variant="success btn-sm" onClick={() => openCloseModalCreate()}>
          <FontAwesomeIcon icon={faPlus} /> New
        </Button>
      </p>
      <Table id="LibrosTable">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre Producto</th>
            <th>Marca</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Imagen</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(libro => (
            <tr key={libro.id}>
              <td>{libro.id}</td>
              <td>{libro.titulo}</td>
              <td>{libro.autor}</td>
              <td>{libro.precio}</td>
              <td>{libro.cantidad}</td>
              <td>{libro.imagen}</td>
              <td>
                <Button variant="outline-primary btn-sm" onClick={() => selectCurrentLibro(libro, "Edit")}>Edit</Button>{"  "}
                <Button variant="outline-warning btn-sm" onClick={() => selectCurrentLibro(libro, "Details")}>Details</Button>{"  "}
                <Button variant="outline-danger btn-sm" onClick={() => selectCurrentLibro(libro, "Delete")}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Create */}
      <Modal isOpen={showModalCreate}>
        <ModalHeader>Create Libro</ModalHeader>
        <ModalBody>
          <Form>
            <Form.Group>
              <Form.Label>Titulo:</Form.Label>
              <Form.Control type="text" id="txtTitulo" name="titulo" placeholder="Nombre del libro" required onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Autor:</Form.Label>
              <Form.Control type="text" id="txtAutor" name="autor" placeholder="Nombre del autor" required onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Precio:</Form.Label>
              <Form.Control type="number" id="txtPrecio" name="precio" placeholder="Precio del libro" required onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Cantidad:</Form.Label>
              <Form.Control type="number" id="txtCantidad" name="cantidad" placeholder="Cantidad disponible" required onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Imagen:</Form.Label>
              <Form.Control type="text" id="txtImagen" name="imagen" placeholder="URL de la imagen" required onChange={handleChange} />
            </Form.Group>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" onClick={() => postLibro()}>Create</Button>
          <Button variant="outline-info" onClick={() => openCloseModalCreate()}>Back</Button>
        </ModalFooter>
      </Modal>

      {/* Update */}
      <Modal isOpen={showModalUpdate}>
        <ModalHeader>Edit Libro</ModalHeader>
        <ModalBody>
          <Form>
            <Form.Group>
              <Form.Label>Id:</Form.Label>
              <Form.Control type="text" id="txtId" name="id" readOnly value={currentLibro.id} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Titulo:</Form.Label>
              <Form.Control type="text" id="txtTitulo" name="titulo" placeholder="Nombre del libro" required onChange={handleChange} value={currentLibro.titulo} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Autor:</Form.Label>
              <Form.Control type="text" id="txtAutor" name="autor" placeholder="Nombre del autor" required onChange={handleChange} value={currentLibro.autor} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Precio:</Form.Label>
              <Form.Control type="number" id="txtPrecio" name="precio" placeholder="Precio del libro" required onChange={handleChange} value={currentLibro.precio} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Cantidad:</Form.Label>
              <Form.Control type="number" id="txtCantidad" name="cantidad" placeholder="Cantidad disponible" required onChange={handleChange} value={currentLibro.cantidad} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Imagen:</Form.Label>
              <Form.Control type="text" id="txtImagen" name="imagen" placeholder="URL de la imagen" required onChange={handleChange} value={currentLibro.imagen} />
            </Form.Group>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" onClick={() => putLibro()}>Save</Button>
          <Button variant="outline-info" onClick={() => openCloseModalUpdate()}>Back</Button>
        </ModalFooter>
      </Modal>

      {/* Details */}
      <Modal isOpen={showModalDetails}>
        <ModalHeader>Details Libro</ModalHeader>
        <ModalBody>
          <Form>
            <Form.Group>
              <Form.Label>Id:</Form.Label>
              <Form.Control type="text" id="txtId" name="id" readOnly value={currentLibro.id} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Titulo:</Form.Label>
              <Form.Control type="text" id="txtTitulo" name="titulo" readOnly value={currentLibro.titulo} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Autor:</Form.Label>
              <Form.Control type="text" id="txtAutor" name="autor" readOnly value={currentLibro.autor} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Precio:</Form.Label>
              <Form.Control type="text" id="txtPrecio" name="precio" readOnly value={currentLibro.precio} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Cantidad:</Form.Label>
              <Form.Control type="text" id="txtCantidad" name="cantidad" readOnly value={currentLibro.cantidad} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Imagen:</Form.Label>
              <Form.Control type="text" id="txtImagen" name="imagen" readOnly value={currentLibro.imagen} />
            </Form.Group>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline-info" onClick={() => openCloseModalDetails()}>Back</Button>
        </ModalFooter>
      </Modal>


      {/* Delete */}
<Modal isOpen={showModalDelete}>
  <ModalHeader>Are you sure to delete this book?</ModalHeader>
  <ModalBody>
    <Form>
      <Form.Group>
      <Form.Label><b>Id:</b></Form.Label>
            <Form.Label>{currentLibro && currentLibro.id}</Form.Label><br />
            <Form.Label><b>Titulo:</b></Form.Label>
            <Form.Label>{currentLibro && currentLibro.titulo}</Form.Label><br />
            <Form.Label><b>Autor:</b></Form.Label>
            <Form.Label>{currentLibro && currentLibro.autor}</Form.Label><br />
            <Form.Label><b>Precio:</b></Form.Label>
            <Form.Label>{currentLibro && currentLibro.precio}</Form.Label><br />
            <Form.Label><b>Cantidad:</b></Form.Label>
            <Form.Label>{currentLibro && currentLibro.cantidad}</Form.Label><br />
            <Form.Label><b>Imagen:</b></Form.Label>
            <Form.Label>{currentLibro && currentLibro.imagen}</Form.Label><br />
          </Form.Group>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button variant="danger" onClick={() => deleteLibro(currentLibro.id)}>Delete</Button>
        <Button variant="outline-info" onClick={() => openCloseModalDelete()}>Back</Button>
      </ModalFooter>
    </Modal>

        </Container>
        );
      }








    