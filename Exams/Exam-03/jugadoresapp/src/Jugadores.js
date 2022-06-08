import ReactBootstrap, {Table, Container, Row, Col, Button, ButtonGroup, Form, Navbar, Nav} from "react-bootstrap";
import axios from 'axios';
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import React, { useState } from 'react';
import {useEffect} from 'react';

const api = "http://localhost:5000/jugadores";
const api2 = "http://localhost:5000/equipos";
const initialState = {
  Imagen: "",
  Nombre: "",
  Numero: "",
  Posicion: "",
  Pais: "",
  Equipo: "",
}
function Jugadores() {
  const [image, setImage]=useState(''); 
  const [loading, setLoading]=useState(false);
  const [state, setState]=useState(initialState);
  const [data, setData] = useState([]);
  const [jugadorId, setJugadorId] = useState(null); 
  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState("");
  const{ Nombre, Numero, Posicion, Pais, Equipo}=state;

  useEffect(()=>{
    loadJugadores();
  },[]);
  
  const getMarks = async () =>{
        const response = axios.get(api2);
        return response;
    }

    const [list, setList] = useState ([])

    useEffect(() => {
        getMarks().then((response)=>{
            setList(response.data);
        })
    },[])
    
  const loadJugadores = async () =>{
    const response = await axios.get(api);
    setData(response.data);
  };

  const handleChange = (e) =>{
    let {name, value} = e.target; 
    setState({...state,[name]: value});
  };

  const handleDelete = async (id) =>{
    if(window.confirm("Estás seguro que desea eliminar?")){
      axios.delete(`${api}/${id}`);
      toast.success("Jugador eliminado");
      setTimeout(() => loadJugadores(), 500);
    }
  };
  const handleUpdate = (id) => {
    const singleJugador = data.find((item)=>item.id === id);
    setState({...singleJugador});
    setJugadorId(id); 
    setEditMode(true); 
  }

  const handleReset =  () => {
    loadJugadores();
  }
  
  const handleSearch =  async(e) => {
    e.preventDefault();
    return await axios.get(`http://localhost:5000/jugadores?q=${value}`).then((response)=>{
      setData(response.data); 
      setValue("");
    }).catch((err)=>console.log(err));
  };
  const handleSubmit = (e) =>{
    e.preventDefault();
    if( !Nombre || !Numero || !Posicion || !Pais || !Equipo){
      toast.error("Por favor llene los campos");
    }else{
      if(!editMode){
        axios.post(api, state);
        toast.success("Jugador agregado");
        setState({Imagen:"", Nombre:"", Numero:"", Posicion:"", Pais:"", Equipo:""});
        setTimeout(() => loadJugadores(), 500);
      }else{
        axios.put(`${api}/${jugadorId}`, state);
        toast.success("Jugador actualizado");
        setState({Imagen:"", Nombre:"", Numero:"", Posicion:"", Pais:"", Equipo:""});
        setTimeout(() => loadJugadores(), 500);
        setJugadorId(null); 
        setEditMode(false);
      }
    }
  };
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
  return (
    <>
    <ToastContainer/>
    <Container style={{ marginTop:"20px"}}>
    <Row>
      <Col md={2}>
        <Form style={{marginRight:"5px", marginTop:"10px"}}  Name="d-flex input-group w-auto" onClick={handleSearch}>
        <input type="text" className="form-control" placeholder="Buscar por equipo" value={value} onChange={(e)=>setValue(e.target.value)}/>
        <ButtonGroup>
          <Button style={{marginRight:"5px", marginTop:"10px"}} variant="outline-primary">Buscar</Button>
          <Button style={{marginRight:"5px", marginTop:"10px"}} variant="outline-info" onClick={()=>handleReset()}>Limpiar</Button>
        </ButtonGroup>
       </Form>
      </Col>
    </Row>  
    </Container>
    <Container style={{marginTop:"10px"}}>
      <Row>
        <Col md={4}>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
          <h1>Subir Imagen</h1>
          <div class="inputWrapper">
            <p style={{fontSize: "100%", marginLeft:"10px" }}>Subir archivo</p>
            <input class="fileInput" type="file" name="file" onChange={uploadImage}/>
            </div>      
            {loading ? (
              <h4>Subiendo...</h4>
              ) : (
              <img src={image} style={{ width: '100px' }} />
            )}       
          </Form.Group>
          <Form.Group>
          <Form.Label style={{textAlign:"left"}}>Nombre</Form.Label>
          <Form.Control type="text" placeholder="Nombre" name="Nombre" value={Nombre} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
          <Form.Label style={{textAlign:"left"}}>Numero</Form.Label>
          <Form.Control type="text" placeholder="Numero" name="Numero"  value={Numero} onChange={handleChange}/>
          </Form.Group>
          <Form.Group>
          <Form.Label style={{textAlign:"left"}}>Posicion</Form.Label>
          <Form.Control type="text" placeholder="Posicion" name="Posicion" value={Posicion}  onChange={handleChange}/>
          </Form.Group>
          <Form.Group>
          <Form.Label style={{textAlign:"left"}}>Pais</Form.Label>
          <Form.Control type="text" placeholder="Pais" name="Pais" value={Pais}  onChange={handleChange}/>
          </Form.Group>
          <Form.Group>
          <Form.Label style={{textAlign:"left"}}>Equipo</Form.Label>
          <Form.Select name="Equipo"onChange={handleChange}>
            <option value="">Selecciona equipo</option>{
              list.map((Equipo) => (
                  <option value={Equipo.Nombre}>{Equipo.Nombre}</option>
                        ))}
          </Form.Select>
          </Form.Group>
          <div className="d-grid gap-2 mt-2">
            <Button type="Submit" variant="outline-success" sizs="lg">
              {editMode ? "Actualizar" : "Crear"}
            </Button>
          </div></Form></Col>
        <Col md={8}>
          <Table border hover responsive size="sm">
            <thead>
              <tr>
                <th>Id</th>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Numero</th>
                <th>Posicion</th>
                <th>Pais</th>
                <th>Equipo</th>
              </tr>
            </thead>
            {data && data.map((item, index)=>(
              <tbody key={index}>
              <tr><td>{index+1}</td>
              <td>{item.Imagen}</td>
              <td>{item.Nombre}</td>
              <td>{item.Numero}</td>
              <td>{item.Posicion}</td>
              <td>{item.Pais}</td>
              <td>{item.Equipo}</td>
              <td><ButtonGroup>
                <Button style={{marginRight:"5px"}}  variant="outline-primary" onClick={()=>handleUpdate(item.id)}>Editar</Button>
                <Button style={{marginRight:"5px"}}  variant="outline-danger" onClick={()=>handleDelete(item.id)}>Elimiar</Button>
                </ButtonGroup></td>
              </tr>              
              </tbody>
            ))}
          </Table>
        </Col>
      </Row>
    </Container>
    </>
  );}
export default Jugadores;