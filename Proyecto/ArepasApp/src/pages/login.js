import React, { useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import {userFindByCorreoAndPass} from '../services/usuario/usuarioPeticiones';
import {setUserLoginSesion,setUserLogoutSesion } from '../store/slicesUser/userSlice';
import {cleanOrder} from '../store/slicesOrders/ordersSlice';


function Login (){
  const dispatch = useDispatch();

  const [correo, setCorreo] = useState('');
  const [contrasenna, setContrasenna] = useState('');
  const [confirmaciConcontrasenna, setConfirmaciConcontrasenna] = useState('');
  const [alerta, setAlerta] = useState(false);

  const task =  useSelector(state => state.usuarioSesion);
  const InciarSesion = (data) =>{
    dispatch(setUserLoginSesion({status:true,dataUser:{data}}));
    dispatch(cleanOrder());
  }
  // función quedebe migrarse al componente que tendrá el cierre de sesión
  const CerrarSeion = () =>{
    dispatch(setUserLogoutSesion({}));
    dispatch(cleanOrder());
  }
  // ****


  const navigate = useNavigate();


  const redirectToHome = () => {
      navigate('/');
  };

  function loginUsuario(){
    userFindByCorreoAndPass(correo, contrasenna)
    .then(data => {
      if( Object.keys(data).length === 0){
        setAlerta(true);
        console.log('Usuario No registrado');
        CerrarSeion(); 
      }else{
        setAlerta(false);
        InciarSesion(data);
        redirectToHome();
      
      }
    })
    .catch(error => {
      // Manejo de errores
      console.error(error);
    });
    

  }
  return (
    <>
      <Card className='m-5 align-center' id="card-login">
      <Card.Header className='p-3 text-center' style={{backgroundColor: '#FEC151'}}>
      <Card.Title >Login</Card.Title> 
      </Card.Header>
      <Card.Body className='d-flex flex-column align-items-center justify-content-center'>
        <InputGroup className="m-3 w-75 " >
          <InputGroup.Text id="inputGroup-correo-usuario">
            Correo @
          </InputGroup.Text>
          <Form.Control
            value = {correo}
            onChange={(e) => setCorreo(e.target.value)} 
            aria-label="Default"
            placeholder="Correo *"
            aria-describedby="inputGroup-correo-usuario"
          />
        </InputGroup>

        <InputGroup className="m-3 w-75" >
          <InputGroup.Text id="inputGroup-pass-usuario">
            contraseña
          </InputGroup.Text>
          <Form.Control
            value = {contrasenna}
            onChange={(e) => setContrasenna(e.target.value)} 
            aria-label="Default"
            placeholder="Contraseña"
            type='password'
            aria-describedby="inputGroup-pass-usuario"
          />
        </InputGroup> 


          <Button className='rounded-pill text-black p-2 w-100' style={{backgroundColor: '#FEC151', border: 'none'}} id= "card-registrarse-boton" type="submit" onClick={() => loginUsuario()}>Iniciar Sesion</Button>
          {
            (alerta)? <Alert key='danger' variant='danger'>
            Error con las credenciales </Alert> : ''
          }
        </Card.Body>
      </Card>

      
  </>
  )
}

export default Login;