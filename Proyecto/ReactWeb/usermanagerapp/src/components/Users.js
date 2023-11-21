import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon as Fas } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Button, Container, Table, Form } from 'react-bootstrap';

const baseUrl = "https://localhost:5001/api/Users";

export function List() {


    const [data, setData] = useState([]);

    // Control data
    const [currentUser, setCurrentUser] = useState({
        id: '',
        nombre_receta: '',
        tipo_cocina: '',
        dificultad: '',
        tiempo_coccion: '',
        tiempo_preparacion: '',
        imagen: '',
    });


    const getUsers = async () => {
        await axios.get(baseUrl)
            .then(response => {
                setData(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setCurrentUser({
            ...currentUser,
            [name]: value
        })
    }

    // Create 
    const [showModalCreate, setShowModalCreate] = useState(false);
    const openCloseModalCreate = () => {
        console.log(showModalCreate);
        setShowModalCreate(!showModalCreate);
        console.log(showModalCreate);
    }





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


    useEffect(() => {
        getUsers();
    }, []);

    // Update
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const openCloseModalUpdate = () => {
        setShowModalUpdate(!showModalUpdate);
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



    const deleteUser = async () => {
        await axios.delete(baseUrl + "/" + currentUser.id)
            .then(() => {
                setData(data.filter(usr => usr.id !== currentUser.id));
                openCloseModalDelete();
            }).catch(error => {
                console.log(error);
            })
    }


    // Delete
    const [showModalDelete, setShowModalDelete] = useState(false);
    const openCloseModalDelete = () => {
        setShowModalDelete(!showModalDelete);
    }





    const putUser = async () => {
        await axios.put(baseUrl + "/" + currentUser.id, currentUser)
            .then(response => {
                var result = response.data;
                var updatedData = data;
                updatedData.map(usr => {
                    if (usr.id === currentUser.id) {
                        usr.nombre_receta = result.nombre_receta;
                        usr.tipo_cocina = result.tipo_cocina;
                        usr.dificultad = result.dificultad;
                        usr.tiempo_coccion = result.tiempo_coccion;
                        usr.tiempo_preparacion = result.tiempo_preparacion;
                        usr.imagen = result.imagen;
                    }
                });
                getUsers();
                openCloseModalUpdate();
            }).catch(error => {
                console.log(error);
            })
    }

    // Details
    const [showModalDetails, setShowModalDetails] = useState(false);
    const openCloseModalDetails = () => {
        setShowModalDetails(!showModalDetails);
    }






    return (
        <Container className="text-center text-md-left">
            <h1>Lista de Recetas</h1>
            <p>
                <Button className="left" variant="success btn-sm" onClick={() => openCloseModalCreate()}> <Fas icon={faPlus} /> New</Button>
            </p>
            <Table id="UsersTable">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre Receta</th>
                        <th>Tipo cocina</th>
                        <th>Dificultad</th>
                        <th>Tiempo de coccino</th>
                        <th>Tiempo de preparacion</th>
                        <th>Imagen</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(usr => (
                        <tr key={usr.id}>
                            <td>{usr.id}</td>
                            <td>{usr.nombre_receta}</td>
                            <td>{usr.tipo_cocina}</td>
                            <td>{usr.dificultad}</td>
                            <td>{usr.tiempo_coccion}</td>
                            <td>{usr.tiempo_preparacion}</td>
                            <td>{usr.imagen}</td>
                            <td>
                                <Button variant="outline-primary" onClick={() => selectCurrentUser(usr, "Edit")}>Edit</Button>{"  "}
                                <Button variant="outline-warning" onClick={() => selectCurrentUser(usr, "Details")}>Details</Button>{"  "}
                                <Button variant="outline-danger" onClick={() => selectCurrentUser(usr, "Delete")}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>



            {/* Create */}
            <Modal isOpen={showModalCreate}>
                <ModalHeader>Crear Receta</ModalHeader>
                <ModalBody>
                    <Form>
                        <Form.Group>
                            <Form.Label>Nombre:</Form.Label>
                            <Form.Control type="text" id="txtNombre_receta" name="nombre_receta" placeholder="Nombre" required onChange={handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Tipo de cocina:</Form.Label>
                            <Form.Control type="text" id="txtTipo_cocina" name="tipo_cocina" placeholder="Tipo cocina" required onChange={handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Dificultad:</Form.Label>
                            <Form.Control type="text" id="txtDificultad" name="dificultad" placeholder="Dificultad" required onChange={handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Tiempo  coccion:</Form.Label>
                            <Form.Control type="text" id="txtTiempo_coccion" name="tiempo_coccion" placeholder="tiempo coccion" required onChange={handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Tiempo preparacion:</Form.Label>
                            <Form.Control type="text" id="txtTiempo_preparacion" name="tiempo_preparacion" placeholder="tiempo preparacion" required onChange={handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>imagen:</Form.Label>
                            <Form.Control type="text" id="txtImagen" name="imagen" placeholder="imagen" required onChange={handleChange} />
                        </Form.Group>
                        
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button variant="primary" onClick={() => postUser()}>Create</Button>
                    <Button variant="outline-info" onClick={() => openCloseModalCreate()}>Back</Button>
                </ModalFooter>
            </Modal>


            {/* Details */}
            <Modal isOpen={showModalDetails}>
                <ModalHeader>Detalles receta</ModalHeader>
                <ModalBody>
                    <Form>
                        <Form.Group>
                            <Form.Label>Id:</Form.Label>
                            <Form.Control type="text" id="txtId" name="id" readOnly value={currentUser && currentUser.id} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Nombre receta:</Form.Label>
                            <Form.Control type="text" id="txtNombre_receta" name="nombre_receta" readOnly value={currentUser && currentUser.nombre_receta} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Tipo cocina:</Form.Label>
                            <Form.Control type="text" id="txtTipo_cocina" name="tipo_cocina" readOnly value={currentUser && currentUser.tipo_cocina} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Dificultad:</Form.Label>
                            <Form.Control type="text" id="txtDificultad" name="dificultad" readOnly value={currentUser && currentUser.dificultad} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Tiempo coccion:</Form.Label>
                            <Form.Control type="text" id="txtTiempo_coccion" name="tiempo_coccion" readOnly value={currentUser && currentUser.tiempo_coccion} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Tiempo preparacion:</Form.Label>
                            <Form.Control type="text" id="txtTiempo_preparacion" name="tiempo_preparacion" readOnly value={currentUser && currentUser.tiempo_preparacion} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Imagen:</Form.Label>
                            <Form.Control type="text" id="txtImagen" name="imagen" readOnly value={currentUser && currentUser.imagen} />
                        </Form.Group>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button variant="outline-info" onClick={() => openCloseModalDetails()}>Back</Button>
                </ModalFooter>
            </Modal>


            {/* Delete */}
            <Modal isOpen={showModalDelete}>
                <ModalHeader>Quieres eliminar esta receta?</ModalHeader>
                <ModalBody>
                    <Form>
                        <Form.Group>
                            <Form.Label><b>Id:</b></Form.Label>
                            <Form.Label>{currentUser && currentUser.id}</Form.Label><br />
                            <Form.Label><b>Nombre receta:</b></Form.Label>
                            <Form.Label>{currentUser && currentUser.nombre_receta}</Form.Label><br />
                            <Form.Label><b>Tipo cocina:</b></Form.Label>
                            <Form.Label>{currentUser && currentUser.tipo_cocina}</Form.Label><br />
                            <Form.Label><b>Dificultad:</b></Form.Label>
                            <Form.Label>{currentUser && currentUser.dificultad}</Form.Label><br />
                            <Form.Label><b>Tiempo coccion:</b></Form.Label>
                            <Form.Label>{currentUser && currentUser.tiempo_coccion}</Form.Label><br />
                            <Form.Label><b>Tiempo preparacion:</b></Form.Label>
                            <Form.Label>{currentUser && currentUser.tiempo_preparacion}</Form.Label><br />
                            <Form.Label><b>Imagen:</b></Form.Label>
                            <Form.Label>{currentUser && currentUser.imagen}</Form.Label><br />
                        </Form.Group>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button variant="danger" onClick={() => deleteUser(currentUser.id)}>Delete</Button>
                    <Button variant="outline-info" onClick={() => openCloseModalDelete()}>Back</Button>
                </ModalFooter>
            </Modal>

            {/* Update */}
            <Modal isOpen={showModalUpdate}>
                <ModalHeader>Edit User</ModalHeader>
                <ModalBody>
                    <Form>
                        <Form.Group>
                            <Form.Label>Id:</Form.Label>
                            <Form.Control type="text" id="txtId" name="id" readOnly value={currentUser && currentUser.id} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Nombre receta:</Form.Label>
                            <Form.Control type="text" id="txtNombre_receta" name="nombre_receta" placeholder="nombre_receta" required onChange={handleChange} value={currentUser && currentUser.nombre_receta} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label >Tipo cocina:</Form.Label>
                            <Form.Control type="text" id="txtTipo_cocina" name="tipo_cocina" placeholder="tipo_cocina" required onChange={handleChange} value={currentUser && currentUser.tipo_cocina} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Dificultad:</Form.Label>
                            <Form.Control type="text" id="txtDificultad" name="dificultad" placeholder="dificultad" required onChange={handleChange} value={currentUser && currentUser.dificultad} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Tiempo de coccion:</Form.Label>
                            <Form.Control type="text" id="txtTiempo_coccion" name="tiempo_coccion" placeholder="tiempo_coccion" required onChange={handleChange} value={currentUser && currentUser.tiempo_coccion} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Tiempo de preparacion:</Form.Label>
                            <Form.Control type="text" id="txtTiempo_preparacion" name="tiempo_preparacion" placeholder="tiempo_preparacion" required onChange={handleChange} value={currentUser && currentUser.tiempo_preparacion} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Imagen:</Form.Label>
                            <Form.Control type="text" id="txtImagen" name="imagen" placeholder="imagen" required onChange={handleChange} value={currentUser && currentUser.imagen} />
                        </Form.Group>
                        
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button variant="primary" onClick={() => putUser()}>Save</Button>
                    <Button variant="outline-info" onClick={() => openCloseModalUpdate()}>Back</Button>
                </ModalFooter>
            </Modal>

        </Container>


    );
}
export default List;