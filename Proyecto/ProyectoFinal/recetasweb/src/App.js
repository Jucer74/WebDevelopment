import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';
import { NoMatch } from './components/NoMatch';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Users } from './components/Users';
import { NavigationBar } from './components/NavigationBar';
import { Consult } from './components/Consult';
import { Contact } from './components/Contact';
import { Register } from './components/register';

function App() {
  return (
    <div className="App">
      <React.Fragment>
          <Router>
            <Routes>
              <Route exact path="/" element={<Login/>} />
              <Route path="/Home" element={<Layout><NavigationBar /><Home /></Layout>} />
              <Route path="/Users" element={<Users/>} />
              <Route path="/Login" element={<Login/>} />
              <Route path="/Contact" element={<Layout><NavigationBar /><Contact/></Layout>} />
              <Route path="/Consult" element={<Layout><NavigationBar /><Consult/></Layout>} />
              <Route path="/register" element={<Register/>} />
              <Route element={<NoMatch/>} />
            </Routes>
          </Router>

      </React.Fragment>
    </div>
  );
}
export default App;