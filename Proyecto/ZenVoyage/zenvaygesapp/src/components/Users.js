import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Users = () => {
  const [userProfiles, setUserProfiles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/accounts')
      .then(response => {
        setUserProfiles(response.data);
      })
      .catch(error => {
        console.error('Error fetching user profiles:', error);
      });
  }, []);

  return (
    <div>
      <h1>User Profiles</h1>
      {userProfiles.map(user => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <p>Email: {user.email}</p>
          <p>Username: {user.username}</p>
          {/* Agrega más detalles del perfil si están disponibles en tu API */}
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Users;
