import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { NavBar } from './components/NavBar/NavBar';
import { CarouselHome } from './components/Carousel/Carousel';
import { ContactBtn } from './components/ContactBtn/ContactBtn';
import { ProductSection } from './components/ProductSection/ProductSection';
import { Footer } from './components/Footer/Footer';
import { SignIn } from './components/Singin/Singin';
import { SignUp } from './components/Singup/Singup';
import { Users } from './components/Users/Users';
import { Products } from './components/Products/Products';

function App() {

  return (
    <Router>
      <div className="App">
        <div className="content-wrapper">
          <NavBar/>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<SignIn />} />
            <Route path="/Singin" element={<SignIn />} />
            <Route path="/Singup" element={<SignUp />} />
            <Route path="/Users" element={<Users />} />
            <Route path="/Products" element={<Products />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <>
      <CarouselHome />
      <ContactBtn />
      <ProductSection />
    </>
  );
}

export default App;
