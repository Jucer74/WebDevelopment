import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';
import { NoMatch } from './components/NoMatch';
import { Home } from './components/Home';
import { Login } from './components/Login';

import { NavigationBar } from './components/NavigationBar';
import Medicos from './components/Medicos';
import ContactForm from './components/ContactForm';


function App() {
  return (
    <div className="App">
      
      <React.Fragment>
        <NavigationBar />
        <Layout>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Medicos" element={<Medicos />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/Contact" element={<ContactForm />} />
              <Route path="/Login" element={<Login />} />
         
              
              <Route element={<NoMatch />} />
            </Routes>
          </Router>
        </Layout>
      </React.Fragment>
    </div>
  );
}

export default App;
