import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon as Fas } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Button, Container, Table, Form } from 'react-bootstrap';

const baseUrl = "https://localhost:5001/api/cars";


export function CarList() {


    const [data, setData] = useState([]);

    // Control data
    const [currentCar, setCurrentCar] = useState({
        id: '',
        name: '',
        brand: '',
        model: '',
        color: ''
    });


    const getCars = async () => {
        await axios.get(baseUrl)
            .then(response => {
                setData(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setCurrentCar({
            ...currentCar,
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





    const postCar = async () => {
        delete currentCar.id;
        await axios.post(baseUrl, currentCar)
            .then(response => {
                getCars();
                openCloseModalCreate();
            }).catch(error => {
                console.log(error);
            })
    }


    useEffect(() => {
        getCars();
    }, []);

    // Update
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const openCloseModalUpdate = () => {
        setShowModalUpdate(!showModalUpdate);
    }









    const selectCurrentCar = (car, action) => {
        setCurrentCar(car);
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



    const deleteCar = async () => {
        await axios.delete(baseUrl + "/" + currentCar.id)
            .then(() => {
                setData(data.filter(ca => ca.id !== currentCar.id));
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





    const putCar = async () => {
        await axios.put(baseUrl + "/" + currentCar.id, currentCar)
            .then(response => {
                var result = response.data;
                var updatedData = data;
                updatedData.map(ca => {
                    if (ca.id === currentCar.id) {
                        ca.name = result.name;
                        ca.brand = result.brand;
                        ca.model = result.model;
                        ca.color = result.color;
                    }
                });
                getCars();
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
            <h1>Car List</h1>
            <p>
                <Button className="left" variant="success btn-sm" onClick={() => openCloseModalCreate()}> <Fas icon={faPlus} /> New</Button>
            </p>
            <Table id="UsersTable">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>name</th>
                        <th>brand</th>
                        <th>model</th>
                        <th>color</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(ca => (
                        <tr key={ca.id}>
                            <td>{ca.id}</td>
                            <td>{ca.name}</td>
                            <td>{ca.brand}</td>
                            <td>{ca.model}</td>
                            <td>{ca.color}</td>
                            <td>
                                <Button variant="outline-primary" onClick={() => selectCurrentCar(ca, "Edit")}>Edit</Button>{"  "}
                                <Button variant="outline-warning" onClick={() => selectCurrentCar(ca, "Details")}>Details</Button>{"  "}
                                <Button variant="outline-danger" onClick={() => selectCurrentCar(ca, "Delete")}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>



            {/* Create */}
            <Modal isOpen={showModalCreate}>
                <ModalHeader>Create Car</ModalHeader>
                <ModalBody>
                    <Form>
           
                        <Form.Group>
                            <Form.Label>name:</Form.Label>
                            <Form.Control type="name" id="txtName" name="name" placeholder=" Ferrari SP48" required onChange={handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>brand:</Form.Label>
                            <Form.Control type="text" id="txtBrand" name="brand" placeholder="ferrari" required onChange={handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>model:</Form.Label>
                            <Form.Control type="text" id="txtModel" name="model" placeholder=" 2023" required onChange={handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>color:</Form.Label>
                            <Form.Control type="text" id="txtColor" name="color" placeholder='rojo' onChange={handleChange} />
                        </Form.Group>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button variant="primary" onClick={() => postCar()}>Create</Button>
                    <Button variant="outline-info" onClick={() => openCloseModalCreate()}>Back</Button>
                </ModalFooter>
            </Modal>


            {/* Details */}
            <Modal isOpen={showModalDetails}>
                <ModalHeader>Details Car</ModalHeader>
                <ModalBody>
                    <Form>
                        <Form.Group>
                            <Form.Label>id:</Form.Label>
                            <Form.Control type="text" id="txtId" name="id" readOnly value={currentCar && currentCar.id} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>name:</Form.Label>
                            <Form.Control type="name" id="txtName" name="name" readOnly value={currentCar && currentCar.namel} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>brand:</Form.Label>
                            <Form.Control type="text" id="txtBrand" name="brand" readOnly value={currentCar && currentCar.brand} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>model:</Form.Label>
                            <Form.Control type="text" id="txtModel" name="model" readOnly value={currentCar && currentCar.model} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>color:</Form.Label>
                            <Form.Control type="text" id="txtColor" name="color" readOnly value={currentCar && currentCar.color} />
                        </Form.Group>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button variant="outline-info" onClick={() => openCloseModalDetails()}>Back</Button>
                </ModalFooter>
            </Modal>


            {/* Delete */}
            <Modal isOpen={showModalDelete}>
                <ModalHeader>Are you sure to delete this car?</ModalHeader>
                <ModalBody>
                    <Form>
                        <Form.Group>
                            <Form.Label><b>Id:</b></Form.Label>
                            <Form.Label>{currentCar && currentCar.id}</Form.Label><br />
                            <Form.Label><b>name:</b></Form.Label>
                            <Form.Label>{currentCar && currentCar.name}</Form.Label><br />
                            <Form.Label><b>brand:</b></Form.Label>
                            <Form.Label>{currentCar && currentCar.brand}</Form.Label><br />
                            <Form.Label><b>model:</b></Form.Label>
                            <Form.Label>{currentCar && currentCar.model}</Form.Label><br />
                            <Form.Label><b>color:</b></Form.Label>
                            <Form.Label>{currentCar && currentCar.color}</Form.Label><br />
                        </Form.Group>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button variant="danger" onClick={() => deleteCar(currentCar.id)}>Delete</Button>
                    <Button variant="outline-info" onClick={() => openCloseModalDelete()}>Back</Button>
                </ModalFooter>
            </Modal>

            {/* Update */}
            <Modal isOpen={showModalUpdate}>
                <ModalHeader>Edit Car</ModalHeader>
                <ModalBody>
                    <Form>
                        <Form.Group>
                            <Form.Label>Id:</Form.Label>
                            <Form.Control type="text" id="txtId" name="id" readOnly value={currentCar && currentCar.id} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>name:</Form.Label>
                            <Form.Control type="text" id="txtName" name="name" placeholder="ferrari 5678" required onChange={handleChange} value={currentCar && currentCar.name} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label >brand:</Form.Label>
                            <Form.Control type="text" id="txtBrand" name="brand" placeholder="ferrari" required onChange={handleChange} value={currentCar && currentCar.brand} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>model:</Form.Label>
                            <Form.Control type="text" id="txtModel" name="model" placeholder="2023" required onChange={handleChange} value={currentCar && currentCar.model} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>color:</Form.Label>
                            <Form.Control type="text" id="txtColor" name="color" onChange={handleChange} value={currentCar && currentCar.color} />
                        </Form.Group>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button variant="primary" onClick={() => putCar()}>Save</Button>
                    <Button variant="outline-info" onClick={() => openCloseModalUpdate()}>Back</Button>
                </ModalFooter>
            </Modal>

        </Container>


    );
}
export default CarList;
