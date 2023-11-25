import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';
import { NoMatch } from './components/NoMatch';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { AgentDeportivoList } from './components/Users';
import { NavigationBar } from './components/NavigationBar';
import { Register } from './components/Register';
import Contact from './components/Contact';
import { SportAgent } from './components/SportAgent'; 


function App() {
  return (
    <div className="App">
      <React.Fragment>
        <NavigationBar />
        <Layout>
          <Router>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/Login" element={<Login/>} />
              <Route path="/Home" element={<Home />} />
              <Route path="/Contact" element={<Contact />} />
              <Route element={<NoMatch />} />
              <Route path="/Register" element={<Register />} />
              <Route path="/SportAgent" element={<SportAgent />}></Route>
              <Route path="/Users/:deporteId" element={<AgentDeportivoList  />} />
            </Routes>
          </Router>
        </Layout>
      </React.Fragment>
    </div>
  );
}

export default App;