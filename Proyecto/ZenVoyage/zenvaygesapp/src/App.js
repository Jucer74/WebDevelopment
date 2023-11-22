import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';
import { NoMatch } from './components/NoMatch';
import LandingPage from './components/LandingPage';
import { Login } from './components/Login';
import Users from './components/Users';
import { Clients } from './components/Clients';
import Destinations from './components/Destinations';
import Bookings from './components/Bookings';
import { NavigationBar } from './components/NavigationBar';

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <NavigationBar />
        <Layout>
          <Router>
            <Routes>
              <Route exact path="/" element={<LandingPage/>} />
              <Route path="/LandingPage" element={<LandingPage/>} />
              <Route path="/Users" element={<Users/>} />
              <Route path="/Clients" element={<Clients/>} />
              <Route path="/Destinations" element={<Destinations/>} />
              <Route path="/Bookings" element={<Bookings/>} />
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