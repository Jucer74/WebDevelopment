// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';
import Register from './Components/Register';
import LandingPage from './Components/LandingPage';


function App() {

  return (
    <div className="App">
      <React.Fragment>
        <LandingPage />
          <Router>
            <Routes>
              <Route exact path="/" element={<Register/>} />
              <Route path="/Register" element={<Register/>} />
              {/* <Route path="/Users" element={<Users/>} />
              <Route path="/Login" element={<Login/>} />
              <Route element={<NoMatch/>} /> */}
            </Routes>
          </Router>
      </React.Fragment>
    </div>
  );
}

export default App;