import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';
import { NoMatch } from './components/NoMatch';
import { Home } from './components/Home';
import  Login  from './components/Login';
import {List} from './components/Users';
import {CarList} from './components/Cars';
import Contact from './components/Contact';
import { NavigationBar } from './components/NavigationBar';


function App() {
  return (
    <div className="App">
      <React.Fragment>
        <NavigationBar />
        <Layout>
          <Router>
            <Routes>
              <Route exact path="/" element={<Login/>} />
              <Route path="/Home" element={<Home/>} />
              <Route path='/Users' element={<List/>}/>
              <Route path='/Cars' element={<CarList/>}/>
              <Route path="/contact" element={<Contact />} />
              <Route path="/Login" element={<Login/>} />
              <Route element={<NoMatch/>} />
            </Routes>
          </Router>
        </Layout>
      </React.Fragment>
    </div>
  );
}

export default App;