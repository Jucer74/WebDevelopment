import React from 'react';
import Info from "../../Common/Components/Info"; 
import Register from "../../Components/Security/Crud"



export function CrudPage() {
  

  return (
    <div className="container col d-flex justify-content-center" style={{ backgroundColor: '#007a53' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div>
          <Register />
          </div>

          <div style={{ marginTop: "5rem" }}>
          <Info/>
          </div>
      </div>
          </div>
      


    </div>
  );
}

export default CrudPage;