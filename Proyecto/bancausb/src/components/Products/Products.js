import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Table, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Link } from 'react-router-dom';

const baseUrlUser = "https://localhost:5001/api/Users";

const baseUrlProducts = "https://localhost:5001/api/Products";

export function Products() {
  const [data, setData] = useState([]);
  const [currentProduct, setcurrentProduct] = useState({
    id: "",
    name: "",
    Users: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setcurrentProduct({
      ...currentProduct,
      [name]: value,
    });
    console.log(currentProduct)
  };

  const [showModalCreate, setShowModalCreate] = useState(false);

  const openCloseModalCreate = () => {
    setShowModalCreate(!showModalCreate);
  };

  const GetUsers = async () => {
    await axios
      .get(baseUrlUser)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  
  const GetProducts = async () => {
    await axios
      .get(baseUrlProducts)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  useEffect(() => {
    GetProducts();
  }, []);

  const postProduct = async () => {
    delete currentProduct.id;
    await axios
      .post(baseUrlProducts, currentProduct)
      .then((response) => {
        GetProducts();
        openCloseModalCreate();
      })
      .catch((error) => {
        console.log(error);
      });
      console.log(currentProduct);
  };

  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const openCloseModalUpdate = () => {
    setShowModalUpdate(!showModalUpdate);
  };

  const selectcurrentProduct=(user, action)=>{
    setcurrentProduct(user);
    switch (action) {
      case "Edit":
        openCloseModalUpdate();
        break;  
      case "Delete":
        openCloseModalDelete();
        break;             
      default:
        break;
    }     
  }

  const putProduct = async () => {
    await axios
      .put(baseUrlProducts + "/" + currentProduct.id, currentProduct)
      .then((response) => {
        var result = response.data;
        var updatedData = data;
        updatedData.map((usr) => {
            if (usr.id === currentProduct.id) {
              usr.name = result.firstName;
            }
            return usr;
          });
        GetProducts();
        openCloseModalUpdate();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [showModalDelete, setShowModalDelete]= useState(false);
  const openCloseModalDelete=()=>{
    setShowModalDelete(!showModalDelete);
  }

  const deleteUser = async() => {
    await axios.delete(baseUrlProducts+"/"+ currentProduct.id)
    .then (()=>{
      setData(data.filter(usr=>usr.id!==currentProduct.id));
      openCloseModalDelete();
    }).catch(error=>{
      console.log(error);
    })
  }  
  
  return (
    <div className=" m-5 justify-content-between">
    <div className="row col-10 d-flex justify-content-between align-items-center m-auto p-1">
      <h1 className="col-auto text-start">Productos</h1>
      <Button className="col-auto text-end" variant="success btn-sm" onClick={() => openCloseModalCreate()}>
        <FontAwesomeIcon icon={faPlus} /> Crear
      </Button>
    </div>


      <div  class=" col-10  m-auto table-responsive">
        <Table  className="table table-striped" id="UsersTable">
          <thead>
            <tr >
              <th>Id</th>
              <th>Nombre</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((usr) => (
              <tr key={usr.id}>
              <td>{usr.id}</td>
              <td>{usr.name}</td>
              <td>
                <Button className="btn-sm" variant="outline-primary" onClick={() => selectcurrentProduct(usr, "Edit")}>Edit</Button>{"  "}
                <Link to={`/Products/${usr.id}`}> 
                <Button className="btn-sm" variant="outline-warning">Details</Button> 
                </Link>
                <Button className="btn-sm"variant="outline-danger" onClick={() => selectcurrentProduct(usr, "Delete")}>Delete</Button>
              </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
     

      {/* Create */}
      <Modal isOpen={showModalCreate} centered>
        <ModalHeader>Crear Producto</ModalHeader>
        <ModalBody>
          <Form>
            <Form.Group>
              <Form.Label>Nombre del producto:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Cuenta Ahorro"
                value={currentProduct.userEmail}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" onClick={() => postProduct()}>
            Create
          </Button>
          <Button variant="outline-info" onClick={() => openCloseModalCreate()}>
            Back
          </Button>
        </ModalFooter>
      </Modal>

      {/* Update */}
      <Modal isOpen={showModalUpdate } centered>
        <ModalHeader>Edit User</ModalHeader>
        <ModalBody>
          <Form>
            <Form.Group>
              <Form.Label>Id:</Form.Label>
              <Form.Control
                type="text"
                id="txtId"
                name="id"
                readOnly
                value={currentProduct && currentProduct.id}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                id="txtName"
                name="name"
                placeholder="Julio Robles"
                required
                onChange={handleChange}
                value={currentProduct && currentProduct.name}
              />
            </Form.Group>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" onClick={() => putProduct()}>
            Save
          </Button>
          <Button variant="outline-info" onClick={() => openCloseModalUpdate()}>
            Back
          </Button>
        </ModalFooter>
      </Modal>

        {/* Delete */}
        <Modal isOpen={showModalDelete} centered>
        <ModalHeader>Are you sure to delete this user?</ModalHeader>
        <ModalBody>
            <Form>
            <Form.Group>
                <Form.Label><b>Id:</b></Form.Label>
                <Form.Label>{currentProduct && currentProduct.id}</Form.Label><br/>
                <Form.Label><b>Name:</b></Form.Label>
                <Form.Label>{currentProduct && currentProduct.name}</Form.Label><br/>
            </Form.Group>
            </Form>
        </ModalBody>
        <ModalFooter>
            <Button variant="danger" onClick={()=>deleteUser(currentProduct.id)}>Delete</Button>
            <Button variant="outline-info" onClick={()=>openCloseModalDelete()}>Back</Button>
        </ModalFooter>
        </Modal>
    </div>
  );
}
