<<<<<<< HEAD
import './App.css';
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';
import { NoMatch } from './Components/NoMatch';
import { Home } from './Components/Home';
import { Login } from './Components/Login';
import { NavigationBar } from './Components/NavigationBar';
import { Persons } from './Components/Persons';
=======
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import { Layout } from './Layout';
import { NoMatch } from './components/NoMatch';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { People } from './components/People';
import { NavigationBar } from './components/NavigationBar';

>>>>>>> main

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <NavigationBar />
        <Layout>
          <Router>
            <Routes>
<<<<<<< HEAD
              <Route exact path="/" element={<Home/>} />
              <Route path="/Home" element={<Home/>} />
              <Route path="/Persons" element={<Persons/>} />
              <Route path="/Login" element={<Login/>} />
=======
              <Route path="/" element={<Home />} />
              <Route path="Home" element={<Home />} />
              <Route path="People" element={<People />} />
              <Route path="Login" element={<Login />} />
>>>>>>> main
              <Route element={<NoMatch/>} />
            </Routes>
          </Router>
        </Layout>
      </React.Fragment>
    </div>
  );
}

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> main
