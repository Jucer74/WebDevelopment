import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavigatorBar from "./Common/Components/NavigationBar"; 
import Inicio from "./Components/Inicio"; 
import RegisterPage from "./Pages/Security/RegisterPage"; 
import { Layout } from './Layout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <NavigatorBar />
        <Layout>
          <Router>
            <Routes>
              <Route exact path="/" element={<Inicio/>} />
              <Route path="/Inicio" element={<Inicio/>} />
              {/* <Route path="/Menu" element={<Menu/>} /> */}
              {/* <Route path="/Usuarios" element={<Usuarios/>} /> */}
              {/* <Route path="/Carrito" element={<Carrito/>} /> */}
              <Route path="/RegisterPage" element={<RegisterPage/>} />
              {/* <Route element={<NoMatch/>} /> */} 
            </Routes>
          </Router>
        </Layout>
      </React.Fragment>
    </div>
  );
}

export default App;


