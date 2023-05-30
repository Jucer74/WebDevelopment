// http://localhost:5000/usuario?correo=maria@web.com&pass=123456

import BaseUrl from  "../enviroment/enviroment";

export async function userFindByCorreoAndPass(usuario, pass){
    console.log(BaseUrl+"/customers?userEmail="+usuario+"&password="+pass);
    
    return await fetch(BaseUrl+"/customers?userEmail="+usuario+"&password="+pass)
    .then(response => response.json())
    .then(data => {
      // console.log(data);
      return data;
    });
}

export async function userCreate(_userEmail,_fullName,_address,_phoneNumber,_password){
  console.log(BaseUrl+"/customers");
  const customerData = {
    userEmail:  _userEmail,
    fullName: _fullName ,
    address: _address ,
    phoneNumber: _phoneNumber,
    password: _password 
  };
  return await fetch(BaseUrl+"/customers",
  {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
  },
    body: JSON.stringify(customerData)
  })
  .then(response => response.json())
  .then(data => {
    return data;
  });
}

 export const UsuarioPeticiones = () => {
  return  (userFindByCorreoAndPass)
}