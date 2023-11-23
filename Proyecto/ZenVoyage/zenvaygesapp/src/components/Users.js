import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
  });

  useEffect(() => {
    const userId = 1;

    axios.get(`http://localhost:3001/accounts/${userId}`)
      .then(response => {
        setUserProfile(response.data);
        setFormData(response.data);
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
      });
  }, []);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveChanges = () => {
    setUserProfile(formData);
    setEditMode(false);
  };

  const handleCancelEdit = () => {
  
    setFormData(userProfile);
    setEditMode(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      {userProfile && (
        <div>
          <h1>User Profile</h1>
          <img src={userProfile.profileImage} alt="Profile" />
          <p>Nombre: {userProfile.name}</p>
          <p>Email: {userProfile.UserEmail}</p>

          {editMode ? (
            <Form>
              
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </Form.Group>

             

              <Button variant="primary" onClick={handleSaveChanges}>
                Guardar cambios
              </Button>
              <Button variant="secondary" onClick={handleCancelEdit}>
                Cancelar
              </Button>
            </Form>
          ) : (
            <div>
              <Button variant="primary" onClick={handleEditClick}>
                Editar perfil
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
