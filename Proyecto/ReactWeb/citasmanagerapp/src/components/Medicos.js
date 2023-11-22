import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

const url = 'http://127.0.0.1:8000/api/v1/medicos/medicos';

class Medicos extends Component {
  state = {
    data: [],
    modalInsertar: false,
    modalEliminar: false,
    form: {
      clinica: '',
      medico_id: 0,
      especialidad: '',
      nombre: '',
      imagen: '',
      tipoModal: '',
    },
  };

  peticionGet = () => {
    axios
      .get(url)
      .then((response) => {
        this.setState({ data: response.data });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  peticionPost = async () => {
    // Eliminar medico_id del formulario (se generará en el servidor)
    const { medico_id, ...formData } = this.state.form;

    try {
      const response = await axios.post(url, formData);
      this.modalInsertar();
      this.peticionGet();
    } catch (error) {
      console.log(error.message);
    }
  };

  peticionPut = async () => {
    const { medico_id, ...formData } = this.state.form;
    try {
      const response = await axios.put(`${url}/${medico_id}`, formData);
      this.modalInsertar();
      this.peticionGet();
    } catch (error) {
      console.log(error.message);
    }
  };

  peticionDelete = async () => {
    try {
      const response = await axios.delete(`${url}/${this.state.form.medico_id}`);
      this.setState({ modalEliminar: false });
      this.peticionGet();
    } catch (error) {
      console.log(error.message);
    }
  };

  modalInsertar = () => {
    this.setState({ modalInsertar: !this.state.modalInsertar });
  };

  seleccionarMedico = (medico) => {
    this.setState({
      tipoModal: 'actualizar',
      form: {
        clinica: medico.clinica,
        medico_id: medico.medico_id,
        especialidad: medico.especialidad,
        nombre: medico.nombre,
        imagen: medico.imagen,
      },
    });
  };

  handleChange = (e) => {
    e.persist();
    this.setState((prevState) => ({
      form: {
        ...prevState.form,
        [e.target.name]: e.target.value,
      },
    }));
  };

  componentDidMount() {
    this.peticionGet();
  }

  render() {
    const { form } = this.state;
    return (
      <div className="App">
        <br />
        <br />
        <br />
        <button
          className="btn btn-success"
          onClick={() => {
            this.setState({ form: null, tipoModal: 'insertar' });
            this.modalInsertar();
          }}
        >
          Agregar Médico
        </button>
        <br />
        <br />
        <table className="table">
          <thead>
            <tr>
              <th>Clinica</th>
              <th>Medico ID</th>
              <th>Especialidad</th>
              <th>Nombre</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((medico) => {
              return (
                <tr key={medico.medico_id}>
                  <td>{medico.clinica}</td>
                  <td>{medico.medico_id}</td>
                  <td>{medico.especialidad}</td>
                  <td>{medico.nombre}</td>
                  <td>
  <img src={medico.imagen} width="100px" height="100px" />
</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        this.seleccionarMedico(medico);
                        this.modalInsertar();
                      }}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    {'   '}
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        this.seleccionarMedico(medico);
                        this.setState({ modalEliminar: true });
                      }}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader style={{ display: 'block' }}>
            <span style={{ float: 'right' }} onClick={() => this.modalInsertar()}>
              x
            </span>
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label htmlFor="clinica">Clinica</label>
              <input
                className="form-control"
                type="text"
                name="clinica"
                id="clinica"
                onChange={this.handleChange}
                value={form ? form.clinica : ''}
              />
              <br />
              <label htmlFor="nombre">Nombre</label>
              <input
                className="form-control"
                type="text"
                name="nombre"
                id="nombre"
                onChange={this.handleChange}
                value={form ? form.nombre : ''}
              />
              <br />
              <label htmlFor="especialidad">Especialidad</label>
              <input
                className="form-control"
                type="text"
                name="especialidad"
                id="especialidad"
                onChange={this.handleChange}
                value={form ? form.especialidad : ''}
              />
              <br />
              <label htmlFor="imagen">Imagen</label>
              <input
                className="form-control"
                type="text"
                name="imagen"
                id="imagen"
                onChange={this.handleChange}
                value={form ? form.imagen : ''}
              />
            </div>
          </ModalBody>

          <ModalFooter>
            {this.state.tipoModal === 'insertar' ? (
              <button className="btn btn-success" onClick={() => this.peticionPost()}>
                Insertar
              </button>
            ) : (
              <button className="btn btn-primary" onClick={() => this.peticionPut()}>
                Actualizar
              </button>
            )}
            <button className="btn btn-danger" onClick={() => this.modalInsertar()}>
              Cancelar
            </button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalEliminar}>
          <ModalBody>Estás seguro que deseas eliminar al médico {form && form.nombre}</ModalBody>
          <ModalFooter>
            <button className="btn btn-danger" onClick={() => this.peticionDelete()}>
              Sí
            </button>
            <button className="btn btn-secondary" onClick={() => this.setState({ modalEliminar: false })}>
              No
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Medicos;
