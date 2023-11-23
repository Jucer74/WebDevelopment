import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';
import { NoMatch } from './components/NoMatch';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Users } from './components/Users';
import { NavigationBar } from './components/NavigationBar';
import { Profile } from './components/Profile';
import { Contactenos } from './components/Contactenos';
import EditPropertie from './components/EditPropertie';
import DeletePropertie from './components/DeletePropertie';
import CreatePropertie  from './components/CreatePropertie';
import EditUser from './components/EditUser';
import { DetailsPropertie } from './components/DetailsPropertie';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/Home" element={<Layout><NavigationBar /><Home /></Layout>} />
          <Route path="/Users" element={<Layout><NavigationBar /><Users /></Layout>} />
          <Route path="/Profile" element={<Layout><NavigationBar /><Profile /></Layout>} />
          <Route path="/Contactenos" element={<Layout><NavigationBar /><Contactenos/></Layout>} />
          <Route path="/EditPropertie" element={<Layout><NavigationBar /><EditPropertie/></Layout>} />
          <Route path="/EditUser" element={<Layout><NavigationBar /><EditUser/></Layout>} />
          <Route path="/DeletePropertie" element={<Layout><NavigationBar /><DeletePropertie/></Layout>} />
          <Route path="/CreatePropertie" element={<Layout><NavigationBar /><CreatePropertie/></Layout>} />
          <Route path="/DetailsPropertie" element={<Layout><NavigationBar /><DetailsPropertie/></Layout>} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />

          <Route element={<NoMatch />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
