import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider, useUser } from './components/UserContext';
import Header from './components/Header';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Contact from './components/Contact';
import Categories from './components/Categories';
import Recipes from './components/Recipes';

const PrivateRoute = ({ element, ...rest }) => {
  const { user } = useUser();
  return user ? element : <Navigate to="/" />;
};

function App() {
  return (
    <UserProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route path="/contact" element={<PrivateRoute element={<Contact />} />} />
        <Route path="/categories" element={<PrivateRoute element={<Categories />} />} />
        <Route path="/recipes" element={<PrivateRoute element={<Recipes />} />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
