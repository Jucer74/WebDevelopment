import React from "react";
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import { NavigationBar } from "./components/NavigationBar";
import { Users } from "./components/Users";
import { Contact } from "./components/Contact";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <React.Fragment>
          <NavigationBar />
          <Routes>
            <Route path="/Login" element={<Login />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Users" element={<Users />} />
            <Route path="/*" element={<Navigate to="/Login" />} />
          </Routes>
        </React.Fragment>
      </Router>
    </div>
  );
}

export default App;
