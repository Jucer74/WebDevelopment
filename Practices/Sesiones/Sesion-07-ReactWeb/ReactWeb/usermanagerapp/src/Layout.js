import React from 'react';
import { Container } from 'react-bootstrap';

export const Layout = (props) => (
<Router>
 <Routes> 
	  <Route exact path="/" element={<Home/>} />
	  <Route path="/Home" element={<Home/>} />
	  <Route path="/Users" element={<Users/>} />
	  <Route path="/Login" element={<Login/>} />
	  <Route element={<NoMatch/>} />
 </Routes>
</Router>
)