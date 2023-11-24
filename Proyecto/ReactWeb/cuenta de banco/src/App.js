import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';
import { NoMatch } from './components/NoMatch';
import { Home } from './components/Home';
import Login from './components/Login';
import { AccountList } from './components/Accounts';
import { List } from './components/Users';
import { NavigationBar } from './components/NavigationBar';
import Register from './components/register';
import { Contact } from './components/Contact'; // Importa el componente Contact
import {TransactionList} from './components/Transactions.js';
import Conocenos from './components/Conocenos.js';


function App() {
  return (
    <div className="App">
      <React.Fragment>
        <NavigationBar />
        <Layout>
          <Router>
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/Home" element={<Home />} />
              <Route path='/Accounts' element={<AccountList />} />
              <Route path='/Users' element={<List />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/Transactions" element={<TransactionList />} /> 
              <Route path="/Contact" element={<Contact />} /> 
              <Route path="/Conocenos" element={<Conocenos />} /> 
              <Route element={<NoMatch />} />
            </Routes>
          </Router>
        </Layout>
      </React.Fragment>
    </div>
  );
}

export default App;
