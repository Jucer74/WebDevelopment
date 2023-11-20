// App.js

import React from 'react';
import MenuBar from './components/LandingPage/MenuBar';
import MuestraUsuarioLogeado from './components/LandingPage/MuestraUsuarioLogeado';


const App = () => {
  // Tu lógica de la aplicación aquí
  return (
    <div>
      <MenuBar />
      <MuestraUsuarioLogeado/>
      {/* Otros componentes y lógica de la aplicación */}
    </div>
  );
};

export default App;
