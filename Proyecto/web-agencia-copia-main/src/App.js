import React from "react";

import Home from "./Screens/Home";
import Car from "./Screens/Car";
import HowWeWork from "./Screens/HowWeWork";
import Benefits from "./Screens/Benefits";
import Contact from "./Screens/Contact";
import NavBar from "./Components/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Home />
      <Car />
      <HowWeWork />
      <Benefits />
      <Contact />
    </div>
  );
}

export default App;
