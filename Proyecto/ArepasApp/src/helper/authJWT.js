import React from 'react'

export const authJWT = () => {

    const authSercer  = async (usuario,pass) =>{
        fetch('/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: 'usuario',
              password: 'pass'
            })
          })
          .then(response => response.json())
          .then(data => {
            console.log(data);
          })
          .catch(error => {
            console.error(error);
          });
        
    }
      
      
      
      
      
      
      
  return (
    <div>authJWT</div>
  )
}
