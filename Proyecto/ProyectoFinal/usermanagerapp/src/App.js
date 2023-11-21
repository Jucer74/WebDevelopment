// App.js
import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { Layout } from "./Layout";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Users } from "./components/Users";
import { Contact } from "./components/Contact";
import { Transactions } from "./components/Transactions";
import { NavigationBar } from "./components/NavigationBar";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <React.Fragment>
            <NavigationBar />
            <Layout>
              <Routes>
                <Route path="/Login" element={<Login />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/Users" element={<Users />} />
                <Route path="/Contact" element={<Contact />} />
                <Route path="/Transactions" element={<Transactions />} />
                <Route path="/*" element={<Navigate to="/Login" />} />
              </Routes>
            </Layout>
          </React.Fragment>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
