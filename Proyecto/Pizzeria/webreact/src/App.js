import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavigatorBar from "./Components/NavigationBar"; 
import Inicio from "./Components/Inicio"; 
import InfoMenu from "./Components/InfoMenu.js"


function App() {
  return (
    <div className="App">
      <div className="navbar-container">
        <NavigatorBar />
      </div>
      <div className="inicio-container">
        <Inicio />
      </div >
      <div className="Infomenu-container">
        <InfoMenu />
      </div >
    </div>
  );
}

export default App;
