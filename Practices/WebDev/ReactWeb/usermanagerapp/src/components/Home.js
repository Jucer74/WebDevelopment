import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';
import { NoMatch } from './components/NoMatch';
import { Home } from './components/Home'; // Reemplazar este import con tu nuevo código de Home
import { CitasMedicasLogin, Login } from './components/Login';
import { List } from './components/Users';
import { NavigationBar } from './components/NavigationBar';

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <NavigationBar />
        <Layout>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} /> 
              <Route path="/Users" element={<List />} />
              <Route path="/Login" element={<CitasMedicasLogin />} />
              <Route element={<NoMatch />} />
            </Routes>
          </Router>
        </Layout>
      </React.Fragment>
    </div>
  );
}

export default App;
