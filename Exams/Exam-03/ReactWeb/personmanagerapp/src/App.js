import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import { Layout } from './Layout';
import { NoMatch } from './components/NoMatch';
import { Login } from './components/Login';
import { Semesters } from './components/Semesters';
import { NavigationBar } from './components/NavigationBar';
import { Assignatures } from './components/Asignaturas';


function App() {
  return (
    <div className="App bg-black">
      <React.Fragment>
        <NavigationBar />
        <Layout>
          <Router>
            <Routes>
              <Route path="/" element={<Semesters />} />
              <Route path="Semesters" element={<Semesters />} />
              <Route path="Asignaturas" element={<Assignatures />} />
              <Route path="Login" element={<Login />} />
              <Route element={<NoMatch/>} />
            </Routes>
          </Router>
        </Layout>
      </React.Fragment>
    </div>
  );
}

export default App;