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
        <NavigationBar />
        <Layout>
        <Router>
            <Routes>
              <Route path="/Home" element={<Home />} />
              <Route path="/Users" element={<Users />} />
              <Route path="/" element={<Login />} />
              <Route path="/Register" element={<Register />}/>
              <Route element={<NoMatch/>} />
            </Routes>
          </Router>
        </Layout>
        <Footer/>
        </React.Fragment>
    </div>
  );
};

export default App;
