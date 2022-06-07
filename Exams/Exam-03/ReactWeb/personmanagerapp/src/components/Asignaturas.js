import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, Table, Form  } from 'react-bootstrap';
import { FontAwesomeIcon as Fas} from '@fortawesome/react-fontawesome';
import { faPencil, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';


export const Assignatures = () => {

  const urlAssignatures = "http://localhost:4000/assignatures";

  const [ data, setData]=useState([]); 

  const addAssignature = async() => {
    delete assignature.id;
    await axios.post(urlAssignatures, assignature)
    .then (response=>{
      getAssignatures();
      openCloseModalCreate();
    }).catch(error=>{
      console.log(error);
    })
  }

  const getAssignatures=async()=>{
    await axios.get(urlAssignatures)
    .then (response=>{
      console.log(response.data);
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  const deleteAssignature = async() => {
    await axios.delete(urlAssignatures+"/"+assignature.id)
    .then (()=>{
      setData(data.filter(ast=>ast.id!==assignature.id));
      openCloseModalDelete();
    }).catch(error=>{
      console.log(error);
    })
  }  

  const editAssignature = async() => {
    await axios.put(urlAssignatures+"/"+ assignature.id, assignature)
    .then (response=>{
      var result = response.data;
      var updatedData = data;
      updatedData.map(ast=>{
        if(ast.id===assignature.id){
          ast.description = result.description;
        }
      });
      getAssignatures();
      openCloseModalUpdate();
    }).catch(error=>{
      console.log(error);
    })
  }

  useEffect(()=>{
    getAssignatures();
  },[]);

  // Control data
  const [assignature, setAssignature]= useState({
    id: '', 
    idSemester: '',
    nombreMateria: '',
    description: ''
  });

  const handleChange=e=>{
    const {name, value}= e.target;
    setAssignature({
      ...assignature,
      [name]: value
    });
    }

  // Create 
  const [showModalCreate, setShowModalCreate]= useState(false);
  const openCloseModalCreate=()=>{
  setShowModalCreate(!showModalCreate);
  }  

  // Update
const [showModalUpdate, setShowModalUpdate]= useState(false);
const openCloseModalUpdate=()=>{
  setShowModalUpdate(!showModalUpdate);
}

// Details
const [showModalDetails, setShowModalDetails]= useState(false);
const openCloseModalDetails=()=>{
  setShowModalDetails(!showModalDetails);
}
  // Delete
  const [showModalDelete, setShowModalDelete]= useState(false);
  const openCloseModalDelete=()=>{
    setShowModalDelete(!showModalDelete);
  }

  // Show Users
  const [showModalShowUsers, setShowModalShowUsers]= useState(false);
  const openCloseModalShowUsers=()=>{
    setShowModalShowUsers(!showModalShowUsers);
  }


  const selectAssignature=(assignature, action)=>{
    setAssignature(assignature);
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
      case "Show Users":
        openCloseModalShowUsers();
        break; 
      default:
        break;
    }     
    }



  return (
    <Container className="text-center text-md-left bg-black">
      {/* Create Modal Save*/}
    <Modal isOpen={showModalCreate} >
      <ModalHeader style={{justifyContent: "center",background: "black"}}><strong className='text-white'>Nueva Materia</strong></ModalHeader>
      <ModalBody style={{background: "black"}}>
        <Form>
          <Form.Group className='my-2 text-white'>
            <Form.Label>Id:</Form.Label>
            <Form.Control type="number" id="txtEmail" name="id" placeholder="Identification" required onChange={handleChange}/>
          </Form.Group>
          <Form.Group className='my-2 text-white'>
            <Form.Label>Id del Semestre:</Form.Label>
            <Form.Control type="number" id="txtName" name="idSemester" placeholder="Number" required onChange={handleChange}/>
          </Form.Group>
          <Form.Group className='my-2 text-white'>
            <Form.Label>Nombre:</Form.Label>
            <Form.Control type="text" id="txtName" name="nombreMateria" placeholder="Materia" required onChange={handleChange}/>
          </Form.Group>
          <Form.Group className='my-2 text-white'>
            <Form.Label>Desciption:</Form.Label>
            <Form.Control type="text" id="txtName" name="description" placeholder="Pepito" required onChange={handleChange}/>
          </Form.Group>                    
          
        </Form>
      </ModalBody>
      <ModalFooter style={{justifyContent: "center",background: "black"}}>
        <Button variant="primary" onClick={()=>addAssignature()}>Añadir</Button>
        <Button variant="outline-info" onClick={()=>openCloseModalCreate()}>Atras</Button>
      </ModalFooter>
    </Modal>

    {/* Update */}
<Modal isOpen={showModalUpdate}>
  <ModalHeader className='text-white' style={{background: "black"}}>Editar Materia</ModalHeader>
  <ModalBody style={{background: "black"}}>
    <Form>
    <Form.Group className='my-2 text-white'>
            <Form.Label>Id: {assignature.id}</Form.Label>
        </Form.Group>
        <Form.Group className='my-2 text-white'>
            <Form.Label>Id del Semestre:</Form.Label>
            <Form.Control type="number" id="txtName" name="idSemester" placeholder="Number" required onChange={handleChange}/>
          </Form.Group>
          <Form.Group className='my-2 text-white'>
            <Form.Label>Nombre de la Materia:</Form.Label>
            <Form.Control type="number" id="txtName" name="nombreMateria" placeholder="Materia" required onChange={handleChange}/>
          </Form.Group>
      <Form.Group className='my-2 text-white'>
            <Form.Label>Desciption:</Form.Label>
            <Form.Control type="text" id="txtName" name="description" placeholder="First Name" required onChange={handleChange} value={assignature && assignature.desciption}/>
        </Form.Group>
    </Form>
  </ModalBody>
  <ModalFooter style={{background: "black"}}>
    <Button variant="primary" onClick={()=>editAssignature()}>Save</Button>
    <Button variant="outline-info" onClick={()=>openCloseModalUpdate()}>Back</Button>
  </ModalFooter>
</Modal>
{/* Details */}
<Modal isOpen={showModalDetails}>
  <ModalHeader className='text-white' style={{background: "black"}}>{assignature.nombreMateria}</ModalHeader>
  <ModalBody style={{background: "black"}}>
    <Form>
    <Form.Group className='my-2 text-white'>
            <Form.Label>Semestre: {assignature.idSemester}</Form.Label>
        </Form.Group>
      <Form.Group className='my-2 text-white'>
            <Form.Label>Description: {assignature.description}</Form.Label>
        </Form.Group>
    </Form>
  </ModalBody>
  <ModalFooter style={{background: "black"}}>
    <Button variant="outline-info" onClick={()=>openCloseModalDetails()}>Volver</Button>
  </ModalFooter>
</Modal>
{/* Delete */}
<Modal isOpen={showModalDelete}>
  <ModalHeader className='text-white' style={{background: "black"}}>Quieres eliminar esta materia?</ModalHeader>
  <ModalBody style={{background: "black"}}>
    <Form>
      <Form.Group>
        <Form.Label className='text-white'><b>Nombre: {assignature.nombreMateria}</b></Form.Label><br/>
        <Form.Label className='text-white'><b>Semestre: {assignature && assignature.idSemester} </b></Form.Label><br/>
        <Form.Label className='text-white'><b>Descripcion: {assignature && assignature.description} </b></Form.Label><br/>
      </Form.Group>
    </Form>
  </ModalBody>
  <ModalFooter style={{background: "black"}}>
    <Button variant="danger" onClick={()=>deleteAssignature(assignature.id)}>Eliminar</Button>
    <Button variant="outline-info" onClick={()=>openCloseModalDelete()}>Volver</Button>
  </ModalFooter>
</Modal>
      <h1 class="text-white" style={{justifyContent: 'left'}}>
      {" "}
      <Button className="center rounded-circle" title = "Añadir Asignatura" variant="success btn-xl" onClick={()=>openCloseModalCreate()}> <Fas icon={faPlus} /></Button>
      </h1>
      <p>
      </p>
      <Table id="UsersTable" borderless>
        
        <tbody>
          {data.map(ast=>(
            <tr key={ast.id}>
              <td>
              <Button variant="success btn-xl" class="bg-warning" onClick={()=>selectAssignature(ast, "Details")}>{ast.nombreMateria}</Button>{" "}
              </td><td>
              <Button variant="primary" class="rounded-circle bg-primary border border-primary text-white" onClick={()=>selectAssignature(ast, "Edit")}><Fas icon= {faPencil}/></Button>{"  "}
              <Button variant="danger" class="rounded-pill bg-danger border border-danger text-white" onClick={()=>selectAssignature(ast, "Delete")}><Fas icon={faTrashCan}/></Button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      
    </Container>

    
  );
}