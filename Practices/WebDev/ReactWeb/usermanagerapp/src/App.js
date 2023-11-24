import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';
import { NoMatch } from './components/NoMatch';
import Home from './components/Home';
import { CitasMedicasLogin, Login } from './components/Login';
import { RegistroNuevo } from './components/Register';
import { NavigationBar } from './components/NavigationBar';
import Contact from './components/Contact';
import { List } from './components/Users';

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <NavigationBar />
        <Layout>
          <Router>
            <Routes>
              <Route path="/Login" element={<CitasMedicasLogin  />} />
              <Route path="/Contact" element={<Contact/>}/>
              <Route path="/Home" element={<Home />} />
              <Route path="/Users" element={<List />} />
              <Route path="/Register" element={<RegistroNuevo />} />
              <Route element={<NoMatch />} />
            </Routes>
          </Router>
        </Layout>
      </React.Fragment>
    </div>
  );
}

export default App;