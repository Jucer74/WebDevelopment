import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import YourImage from "../img/Persona.jpg";
import Casa from "../img/Producto.jpg";
import "../css/Profile.css"; 

export const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [inmuebles, setInmuebles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("user_id");

    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/v1/users/${userId}`, {
          method: "GET",
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);

          const inmueblesResponse = await fetch(`http://127.0.0.1:8000/api/v1/properties/${userId}`, {
            method: "GET",
          });

          if (inmueblesResponse.ok) {
            const inmueblesData = await inmueblesResponse.json();
            setInmuebles(inmueblesData);
          } else {
            console.error("Error al obtener la lista de inmuebles:", inmueblesResponse.statusText);
          }
        } else if (response.status === 404) {
          console.error("Usuario no encontrado:", response.statusText);
        } else {
          console.error("Error al obtener datos del usuario:", response.statusText);
        }
      } catch (error) {
        console.error("Error de red:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserProfile();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    navigate("/login");
  };

  const handleEdit = (position) => {
    if (position !== undefined && position < inmuebles.length) {
      const propertyId = inmuebles[position].id_inmueble;
      localStorage.setItem('propertyId', propertyId);
      console.log(propertyId)
      navigate("/EditPropertie");
    } else {
      console.error('Posición de inmueble no válida');
    }
  };

  const handleDelete = (position) => {
     if (position !== undefined && position < inmuebles.length) {
      const propertyId = inmuebles[position].id_inmueble;
      localStorage.setItem('propertyId', propertyId);
      console.log(propertyId)
      navigate("/DeletePropertie");
    } else {
      console.error('Posición de inmueble no válida');
    }
  };

  const handleEditUser = () => {
    navigate("/EditUser");
 };

 const handleCreate = () => {
  navigate("/CreateProducto");
};

  return (
    <div className="profile-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <React.Fragment>
          <div className="user-info-container">
            <div className="user-info"> 
              <img src={YourImage} alt="User" style={{ width: '100px', height: '100px' }} />
              <div>
              <h2>{userData?.username}</h2>
              <h2>Email: {userData?.email}</h2>
              </div>
              <Button variant="success" onClick={handleEditUser}>
                 Editar Perfil
              </Button>
              <Button variant="success" onClick={handleLogout}>
                 Logout
              </Button>
              <Button variant="success" onClick={() => navigate("/CreateProducto")}>
              Crear Producto
             </Button>
            </div>
          </div>

        </React.Fragment>
      )}
    </div>
  );
};

export default Profile;
