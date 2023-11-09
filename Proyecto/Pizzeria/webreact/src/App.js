import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavigatorBar from "./Common/Components/NavigationBar"; 
import InicioPage from "./Pages/InicioPage"; 
import RegisterPage from "./Pages/Security/RegisterPage"; 
import LoginPage from "./Pages/Security/LoginPage"; 
import MapasPage from "./Pages/MapasPage"; 
import MenuPage from "./Pages/MenuPage"
import CarritoPage from "./Components/Carrito";
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
              <Route exact path="/" element={<InicioPage/>} />
              <Route path="/InicioPage" element={<InicioPage/>} />
              <Route path="/MapasPage" element={<MapasPage/>} />
              <Route path="/MenuPage" element={<MenuPage/>} />
              {/* <Route path="/UsuariosPage" element={<UsuariosPage/>} /> */}
              <Route path="/CarritoPage" element={<CarritoPage/>} />
              <Route path="/RegisterPage" element={<RegisterPage/>} />
              <Route path="/LoginPage" element={<LoginPage/>} />
              {/* <Route element={<NoMatch/>} /> */} 
            </Routes>
          </Router>
        </Layout>
      </React.Fragment>
    </div>
  );
}

export default App;


