// App.js
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';
import { Home } from './components/Home';
import  { NavigationBar }  from './components/NavigationBar';
import { Footer } from './components/Footer';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Users } from './components/Users';
import { NoMatch } from './components/NoMatch';



const App = () => {
  return (
    <div>
      <React.Fragment>

        <Router>
            <Routes>
              <Route path="/Home" element={<Layout><NavigationBar /><Home /></Layout>} />
              <Route path="/Users" element={<Layout><NavigationBar /><Users /></Layout>} />
              <Route path="/" element={<Login />} />
              <Route path="/Register" element={<Register />}/>
              <Route element={<NoMatch/>} />
            </Routes>
          </Router>
        <Footer/>
        </React.Fragment>
    </div>
  );
};

export default App;
