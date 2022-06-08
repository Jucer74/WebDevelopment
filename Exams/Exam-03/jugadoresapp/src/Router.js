import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import Jugadores from './Jugadores';
import Equipos from './Equipos';
import Login  from './Login';
import  NavBar  from './NavBar';
import App from './App';

function Router() {
  return (
        <BrowserRouter>
        <NavBar />
        <Routes>
            <Route path="/" element={<App />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/jugadores" element={<Jugadores />}/>
            <Route path="/equipos" element={<Equipos />}/>
        </Routes>
        </BrowserRouter>
  );
}

export default Router;