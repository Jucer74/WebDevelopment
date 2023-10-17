import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';
import { NoMatch } from './components/NoMatch';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Users } from './components/Users';
import { NavigationBar } from './components/NavigationBar';

function App() {
  return (
    <Router>
      <React.Fragment>
        <NavigationBar />
      </React.Fragment>

      <Layout>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Users" element={<Users />} />
          <Route path="/Login" element={<Login />} />
          <Route element={<NoMatch />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

