import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavigationBar } from './Components/NavigationBar';
import { ListUsers } from './Components/Users';
import { ListLibros } from './Components/Libros';
import { LibrosDetails } from './Components/Details';
import { Login } from './Components/Login';
import { Register } from './Components/Register';
import { Home } from './Components/Home';
function App() {
  return (
    <div className="App">
      <React.Fragment>
        <NavigationBar />
          <Router>
            <Routes>
              <Route path="/Users" element={<ListUsers />} />
              <Route path="/libros" element={<ListLibros />} />
              <Route path="/Libros/:ProductId?" element={<LibrosDetails/>} />
              <Route path = "/" element = {<Login/>} />
              <Route path = "/Home" element = {<Home/>} />
              <Route path = "/Register" element = {<Register />} />
            </Routes>
          </Router>
      </React.Fragment>
    </div>
  );
}

export default App;