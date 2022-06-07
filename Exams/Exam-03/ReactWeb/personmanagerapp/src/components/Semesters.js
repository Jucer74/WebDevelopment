import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, Table, Form } from 'react-bootstrap';
import { FontAwesomeIcon as Fas} from '@fortawesome/react-fontawesome';
import { faFile, faPlus, faTrashCan, faPencil, faList } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Assignatures } from './Asignaturas';



export const Semesters = () => {

  const urlSemesters = "http://localhost:4000/semesters";
  const urlAssignatures = "http://localhost:4000/assignatures";
  let len;
  const [ data, setData]=useState([]); 
  const [image, setImage]=useState('');
  const [loading, setLoading]=useState(false);
  const [assignature, setAssignature] = useState({
    id: "",
    idSemester: "",
    nombreMateria: "",
    description: "",
  });

  const uploadImage = async e => {
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'WebDev')
    setLoading(true)
    const res = await fetch(
      '	https://api.cloudinary.com/v1_1/dddbf676z/image/upload',
      {
        method: 'POST',
        body: data
      }
    )
    const file = await res.json()
    setImage(file.secure_url)
    setLoading(false)
  }

  const getSemesters=async()=>{
    await axios.get(urlSemesters)
    .then (response=>{
      console.log(response.data);
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  const getAssignatures=async()=>{
    await axios.get(urlAssignatures)
    .then (response=>{
      console.log(response.data);
      setAssignature(response.data);
      len = response.data.length;
    }).catch(error=>{
      console.log(error);
    })
  }
  

  const deleteSemester = async() => {
    await axios.delete(urlSemesters+"/"+ semester.id)
    .then (()=>{
      getAssignatures();
      console.log(assignature.length);
      for (let index = 0; index < assignature.length; index++) {
        
        if(parseInt(assignature[index].idSemester) === semester.id){
          console.log(assignature.length)
          axios.delete(urlAssignatures+"/"+ assignature[index].id)
        }
      }
      openCloseModalDelete();
    }).catch(error=>{
      console.log(error);
    })
  }  
  


  const putSemester = async() => {
    await axios.put(urlSemesters+"/"+ semester.id, semester)
    .then (response=>{
      var result = response.data;
      var updatedData = data;
      updatedData.map(smr=>{
        if(smr.id===semester.id){
          smr.description = result.description;
        }
      });
      getSemesters();
      openCloseModalUpdate();
    }).catch(error=>{
      console.log(error);
    })
  }

  useEffect(()=>{
    getSemesters();
  },[]);

  // Control data
  const [semester, setSemester]= useState({
    id: '', 
    description: ''
  });

  

  const handleChange=e=>{
    const {name, value}= e.target;
    setSemester({
      ...semester,
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

  // Show Assignatures
  const [showModalShowAssignatures, setShowModalShowAssignatures]= useState(false);
  const openCloseModalShowAssignatures=()=>{
    setShowModalShowAssignatures(!showModalShowAssignatures);
  }

  // Show Assignatures By Semester
  const [showModalShowAssignaturesBySemester, setShowModalShowAssignaturesBySemester]= useState(false);
  const openCloseModalShowAssignaturesBySemester=()=>{
    setShowModalShowAssignaturesBySemester(!showModalShowAssignaturesBySemester);
  }

  const postUser = async() => {
    delete semester.id;
    await axios.post(urlSemesters, semester)
    .then (response=>{
      getSemesters();
      openCloseModalCreate();
      getAssignatures();
    }).catch(error=>{
      console.log(error);
    })
  }

  const selectCurrentUser=(semestre, action)=>{
    setSemester(semestre);
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
      case "Show Assignatures":
        openCloseModalShowAssignatures();
        break; 
      case "Show Assignatures By Semester":
        openCloseModalShowAssignaturesBySemester();
        break; 
      default:
        break;
    }     
    }



  return (
    <Container className="text-center text-md-left bg-black">
      {/* Create Modal Save*/}
    <Modal isOpen={showModalCreate} >
      <ModalHeader style={{justifyContent: "center",background: "black"}}><strong className='text-white'>Nuevo Semestre</strong></ModalHeader>
      <ModalBody style={{background: "black"}}>
        <Form>
          <Form.Group className='my-2'>
            <Form.Label className = 'text-white'>Id:</Form.Label>
            <Form.Control type="email" id="txtEmail" name="id" placeholder="Identification" required onChange={handleChange}/>
          </Form.Group>
          <Form.Group className='my-2'>
            <Form.Label className = 'text-white'>Desciption:</Form.Label>
            <Form.Control type="text" id="txtName" name="description" placeholder="Pepito" required onChange={handleChange}/>
          </Form.Group>      
          <Form.Group>
            <Form.Label className = 'text-white'>Subir Imagen:</Form.Label>
            <Form.Control type="file" name="file" placeholder="Upload an image" onChange={uploadImage}/>
            {loading ? (
              
              <div class="spinner-border text-success" role="status">
                <span class="sr-only">Loading...</span>
              </div>
              ) : (
              <img src={image} style={{ width: '100px' }} />
            )}          
          </Form.Group>        
          
        </Form>
      </ModalBody>
      <ModalFooter style={{justifyContent: "center", background: 'black'}}>
        <Button variant="primary" onClick={()=>postUser()}>Create</Button>
        
        <Button variant="outline-info" onClick={()=>openCloseModalCreate()}>Volver</Button>
      </ModalFooter>
    </Modal>

    {/* Update */}
<Modal isOpen={showModalUpdate}>
  <ModalHeader style={{justifyContent: "center",background: "black"}} className='text-white'>Editar</ModalHeader>
  <ModalBody style={{justifyContent: "center", background: 'black'}}>
    <Form>
    
      <Form.Group className='my-2 text-white'>
            <Form.Label>Desciption:</Form.Label>
            <Form.Control type="text" id="txtName" name="description" placeholder="First Name" required onChange={handleChange} value={semester && semester.desciption}/>
        </Form.Group>
    </Form>
  </ModalBody>
  <ModalFooter style={{justifyContent: "center",background: "black"}}>
    <Button variant="primary" onClick={()=>putSemester()}>Save</Button>
    <Button variant="outline-info" onClick={()=>openCloseModalUpdate()}>Volver</Button>
  </ModalFooter>
</Modal>
{/* Details */}
<Modal isOpen={showModalDetails}>
  <ModalHeader style={{justifyContent: "center",background: "black"}} className='text-white'>Semestre {semester.id}</ModalHeader>
  <ModalBody style={{justifyContent: "center",background: "black"}}>
    <Form>
      
      <Form.Group className='my-2 text-white'>
            <Form.Label>Description: {semester.description}</Form.Label>
        </Form.Group>
    </Form>
    
  </ModalBody>
  <ModalFooter style={{justifyContent: "center",background: "black"}}>
    <Button variant="outline-info" onClick={()=>openCloseModalDetails()}>Volver</Button>
  </ModalFooter>
</Modal>
{/* Delete */}
<Modal isOpen={showModalDelete}>
  <ModalHeader style={{justifyContent: "center",background: "black"}} className='text-white'>Quieres eliminar el Semestre {semester.id}?</ModalHeader>
  <ModalBody style={{justifyContent: "center",background: "black"}}>
    <Form>
      <Form.Group className='text-white'>
        <Form.Label><b>Semestre: {semester.id}</b></Form.Label><br/>
        <Form.Label><b>Descripcion: {semester && semester.description} </b></Form.Label><br/>
      </Form.Group>
    </Form>
  </ModalBody>
  <ModalFooter style={{justifyContent: "center",background: "black"}}>
    <Button variant="danger" onClick={()=>deleteSemester(semester.id)}>Eliminar</Button>
    <Button variant="outline-info" onClick={()=>openCloseModalDelete()}>Volver</Button>
  </ModalFooter>
</Modal>
  {/* Show Assignatures */}
  <Modal isOpen={showModalShowAssignatures} style={{background: "black"}}>
  <ModalHeader className='text-white' style={{background: "black"}}>Asignaturas</ModalHeader>
  <ModalBody style={{background: "black"}}>
 
    <Assignatures/>

  </ModalBody>
  <ModalFooter style={{background: "black"}}>
    <Button variant="outline-info" onClick={()=>openCloseModalShowAssignatures()}>Volver</Button>
  </ModalFooter>
</Modal>
{/* Show Assignatures By Semester*/}
<Modal isOpen={showModalShowAssignaturesBySemester}>
  <ModalHeader className='text-white' style={{background: "black"}}>Materias Por Semestre</ModalHeader>
  <ModalBody style={{background: "black"}}>
  <Table id="AssugnaturesTable" borderless>
        <tbody>
          {data.map(ast=>(
            <tr key={ast.id}>
              <td>
              <Button variant="success" title = "Semestre"  onClick={()=>selectCurrentUser(ast, "Details")}>Semestre {ast.id}</Button>{" "}
              </td><td>
              <Button variant="primary btn-xl" class="bg-primary border border-primary text-white" title = "Editar" onClick={()=>selectCurrentUser(ast, "Edit")}><Fas icon= {faPencil}/></Button>{"  "}
              <Button variant="danger btn-xl" class="bg-danger border border-danger text-white" title = "Eliminar" onClick={()=>selectCurrentUser(ast, "Delete")}><Fas icon={faTrashCan}/></Button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
  </ModalBody>
  <ModalFooter style={{background: "black"}}>
    <Button variant="outline-info" onClick={()=>openCloseModalShowAssignaturesBySemester()}>Volver</Button>
  </ModalFooter>
</Modal>
      <h1 class="text-white">Semestres
      {" "}
      <Button className="center rounded-circle" variant="success btn-xl" title = "Añadir Semestre" onClick={()=>openCloseModalCreate()}> <Fas icon={faPlus} /></Button>
      {" "}
      <Button className="center rounded-circle" variant="primary btn-xl" title= "Ver Asignaturas" onClick={()=>openCloseModalShowAssignatures()}> <Fas icon={faList} /></Button>
      </h1>
      <p>
      </p>
      <Table id="UsersTable" borderless>
        
        <tbody>
          {data.map(smr=>(
            <tr key={smr.id}>
              <td>
              <h3 title = "Semestre" className='text-white'  onClick={()=>selectCurrentUser(smr, "Details")}>Semestre {smr.id}</h3>
              </td><td>
              <Button variant="warning btn-xl" class="bg-warning border border-warning text-white" title = "Informacion"  onClick={()=>selectCurrentUser(smr, "Details")}><Fas icon ={faFile}/></Button>{" "}
              <Button variant="primary btn-xl" class="bg-primary border border-primary text-white" title = "Editar" onClick={()=>selectCurrentUser(smr, "Edit")}><Fas icon= {faPencil}/></Button>{"  "}
              <Button variant="danger btn-xl" class="bg-danger border border-danger text-white" title = "Eliminar" onClick={()=>selectCurrentUser(smr, "Delete")}><Fas icon={faTrashCan}/></Button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      
    </Container>

    
  );
}