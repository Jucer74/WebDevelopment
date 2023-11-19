import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';
import {NavigatorBar} from "./Common/Components/NavigationBar"; 
import {InicioPage} from "./Pages/InicioPage"; 
import RegisterPage from "./Pages/Security/RegisterPage"; 
import LoginPage from "./Pages/Security/LoginPage"; 
import {MapasPage} from "./Pages/MapasPage"; 
import {MenuPage} from "./Pages/MenuPage"
import {CarritoPage} from "./Pages/CarritoPage";
import {CrudPage} from "./Pages/Security/CrudPage"



function App() {
  return (
    <div className="App">
      <React.Fragment>
        <NavigatorBar />
        <Layout>
          <Router>
            <Routes>
              <Route exact path="/" element={<LoginPage/>} />
              <Route path="/InicioPage" element={<InicioPage/>} />
              <Route path="/MapasPage" element={<MapasPage/>} />
              <Route path="/MenuPage" element={<MenuPage/>} />
              <Route path="/CrudPage" element={<CrudPage/>} />
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


