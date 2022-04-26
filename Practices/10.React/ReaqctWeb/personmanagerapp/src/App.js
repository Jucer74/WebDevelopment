import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';
import { NotFound } from './components/NotFound';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { List } from './components/Persons';
import { NavigationBar } from './components/NavigationBar';


function App() {
  return (
    <div className="App">
      <React.Fragment>
        <NavigationBar />
        <Layout>
          <Router>
            <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route path="/Home" element={<Home/>} />
              <Route path="/Persons" element={<List/>} />
              <Route path="/Login" element={<Login/>} />
              <Route element={<NotFound/>} />
            </Routes>
          </Router>
        </Layout>
      </React.Fragment>
    </div>
  );
}

export default App;