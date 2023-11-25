import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './Layout.js';
import { NoMatch } from './components/NoMatch';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { RealEstateList } from './components/RealEstate';
import { NavigationBar } from './components/NavigationBar';
import { Footer } from './components/Footer'; 
import { Contact } from './components/Contact';
import { Register } from './components/Register.js'
import { RealEstateProducts } from './components/RealEstateProducts.js'

function App() {
  return (
    <div className="App" style={{ background: '#dff5f5' }}>
      <React.Fragment>
        <Layout>
          <Router>
            <NavigationBar />
            <Routes>
              <Route path="/Login" element={<Login />} />
              <Route path="/RealEstate" element={<RealEstateList />} />
              <Route path="/RealEstateProducts/:categoryId" element={<RealEstateProducts />} />
              <Route path="/Contact" element={<Contact />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/Register" element={<Register />} />
              <Route path="/" element={<Login />} />
              <Route element={<NoMatch />} />
            </Routes>
          </Router>
          <Footer />
        </Layout>
      </React.Fragment>
    </div>
  );
}

export default App;
