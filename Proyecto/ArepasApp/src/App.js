import React, { useEffect } from 'react';
import { Link, Route, Routes ,BrowserRouter, Router } from "react-router-dom";


import botonUsuario from './assets/icons/boton usuario (2).svg'
import botonCarrito from './assets/icons/boton de carrito (2).svg'
import logo from './assets/icons/logo.svg'




import Registro from './pages/registro';
import Login from './pages/login';
import AdminView from './pages/AdminView';
import HomeView from './pages/HomeView'
import PagoView from './pages/PagoView'
import ConfirmacionPedido from './component/ConfirmacionPedido';
import { useSelector,useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Button } from 'react-bootstrap';
import {setUserLogoutSesion } from './store/slicesUser/userSlice';
import {cleanOrder} from './store/slicesOrders/ordersSlice';

function App() {

  const [showConfirmacion, setShowConfimacion] = React.useState(false);
  const handleConfirmacion = () => setShowConfimacion(!showConfirmacion);

  const task = useSelector(state => state.usuarioSesion);
  const dispatch = useDispatch();


  
  // función quedebe migrarse al componente que tendrá el cierre de sesión
  const CerrarSeion = () =>{
    dispatch(setUserLogoutSesion({}));
    dispatch(cleanOrder());

  }
  

  return (
    <>
    <BrowserRouter>
     <Navbar   style={{border:'none',backgroundColor: '#FEC151'}} expand="lg">
      <Container >
        <Navbar.Brand href="/">
        <img src={logo} alt="Logo" width="50" height="50" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">

            <NavDropdown  title={<img src={botonUsuario} alt="Usuario" width="45" height="45" />} id="nav-usuario-dropdown">

              {
                (task.status) ?
                <div>
                    <div className='mx-3 my-1'>
                    <p className='fs-6  fw-light'>{task.dataUser.data[0].fullName}</p> 
                      <p className='fs-6 fw-light'>{task.dataUser.data[0].userEmail}</p>
                      <p className='fs-6  fw-light'>{task.dataUser.data[0].address}</p>
                    </div>

                  <Nav.Link className='mx-3 rounded-pill p-2 text-center' style={{ border:'none', backgroundColor: '#FEC151'}} href="#">
                  <Link className='text-black fw-semibold' onClick={()=>{CerrarSeion()}} style={{textDecoration:'none'}}>cerrar sesion </Link>
                  </Nav.Link> 
                </div>
                 : <div>
                 <NavDropdown.Item >            
                   <Nav.Link href="#link">
                     <Link to="/login" >Login </Link>
                   </Nav.Link>
                 </NavDropdown.Item>
                 <NavDropdown.Item >            
                   <Nav.Link href="#link">
                     <Link to="/registrarse" >Registrarse </Link>
                   </Nav.Link>
                 </NavDropdown.Item>
               </div>
              }  
            </NavDropdown>
            <Nav.Link>
              <img src={botonCarrito} alt="Pago" width="45" height="45" onClick={handleConfirmacion}/>
            </Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div>
      <Routes>
        <Route path="/registrarse" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/token" element={<Registro />} />
        <Route path="/adminView" element={<AdminView/>} />
        <Route path="/Pago" element={<PagoView/>} />
        <Route path="/" element={<HomeView/>} />
      </Routes>
    </div>  
    {showConfirmacion && <ConfirmacionPedido show={showConfirmacion} handleClose={handleConfirmacion}  ConfirmacionPedido/>}
    </BrowserRouter>

    </>
    
  );
}

export default App;
