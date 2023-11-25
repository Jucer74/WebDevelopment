import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Button, Container, Table, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export function List() {
  const baseUrl = "https://localhost:5001/api/citasmedicas";

  const [data, setData] = useState([]);
  const [citasmedicas, setCitasmedicas] = useState({
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
    setCitasmedicas({
      ...citasmedicas,
      [name]: value
    })
  }

  const getCitas = async () => {
    await axios.get(baseUrl)
      .then(response => {
        setData(response.data);
      }).catch(error => {
        console.log(error);
      })
  }

  useEffect(() => {
    getCitas();
  }, []);

  const postCita = async () => {
    delete citasmedicas.id;
    await axios.post(baseUrl, citasmedicas)
      .then(response => {
        getCitas();
        openCloseModalCreate();
      }).catch(error => {
        console.log(error);
      })
  }

  const putCita = async () => {
    await axios.put(baseUrl + "/" + citasmedicas.id, citasmedicas)
      .then(response => {
        var result = response.data;
        var updatedData = data.map(cita => cita.id === citasmedicas.id ? result : cita);
        setData(updatedData);
        getCitas();
        openCloseModalUpdate();
      }).catch(error => {
        console.log(error);
      })
  }

  const deleteCita = async (id) => {
    await axios.delete(baseUrl + "/" + id)
      .then(() => {
        setData(data.filter(cita => cita.id !== id));
        openCloseModalDelete();
      }).catch(error => {
        console.log(error);
      })
  }

  const selectCurrentCita = (cita, action) => {
    setCitasmedicas(cita);
    openModalForAction(action);
  };
  const openModalForAction = (action) => {
    switch (action) {
      case "Edit":
        setShowModalUpdate(true); // Activa el modal de edición
        break;
      case "Details":
        setShowModalDetails(true); // Activa el modal de detalles
        break;
      case "Delete":
        openCloseModalDelete();
        break;
      default:
        break;
    }
  };

  return (
    <Container className="text-center text-md-left">
      <h1>Citas Médicas</h1>
      <p>
        <Button className="left" variant="success btn-sm" onClick={() => openCloseModalCreate()}>
          <FontAwesomeIcon icon={faPlus} /> Nuevo
        </Button>
      </p>
      <Table id="CitasTable">
        <thead>
          <tr>
            <th>Id</th>
            <th>Paciente</th>
            <th>Médico</th>
            <th>Consultorio</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {data.map(cita => (
            <tr key={cita.id}>
              <td>{cita.id}</td>
              <td>{cita.patient}</td>
              <td>{cita.doctor}</td>
              <td>{cita.office}</td>
              <td>{cita.status}</td>
              <td>
                <Button variant="outline-primary btn-sm" onClick={() => selectCurrentCita(cita, "Edit")}>Editar</Button>{"  "}
                <Button variant="outline-warning btn-sm" onClick={() => selectCurrentCita(cita, "Details")}>Detalles</Button>{"  "}
                <Button variant="outline-danger btn-sm" onClick={() => deleteCita(cita.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
       {/* Modales */}
       <Modal isOpen={showModalDetails} toggle={openCloseModalDetails}>
        <ModalHeader>Detalles</ModalHeader>
        <ModalBody>
          {/* Mostrar los detalles de la cita aquí */}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={openCloseModalDetails}>Cerrar</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={showModalUpdate} toggle={openCloseModalUpdate}>
        <ModalHeader>Editar</ModalHeader>
        <ModalBody>
          {/* Formulario para editar los datos */}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={putCita}>Guardar cambios</Button>{' '}
          <Button color="secondary" onClick={openCloseModalUpdate}>Cancelar</Button>
        </ModalFooter>
      </Modal>
      
    </Container>
  );
}
