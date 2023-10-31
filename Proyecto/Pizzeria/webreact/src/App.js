import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavigatorBar from "./Components/NavigationBar"; // Import the NavigatorBar component
import Inicio from "./Components/Inicio"; // Import the Inicio component
import InfoMenu from "./Components/InfoMenu.js"


function App() {
  return (
    <div className="App">
      <div className="navbar-container">
        <NavigatorBar />
      </div>
      <div className="inicio-container">
        <Inicio />
      </div>
      <InfoMenu />
    </div>
  );
}

export default App;
