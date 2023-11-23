import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, Table } from 'react-bootstrap';
import { FontAwesomeIcon as Fas} from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


export function Users()
{
  const baseUrl = "https://localhost:44314/Api/Users";

  const [ data, setData]=useState([]);  

  const GetUsers = async () => {
    try {
      const response = await axios.get(baseUrl);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    GetUsers();
  }, []);


return (
  <Container className="text-center text-md-left">
    <h1>User List</h1>
    <p>
      <Button className="left" variant="success btn-sm"> <Fas icon={faPlus} /> New</Button>
    </p>
    <Table id="UsersTable">
      <thead>
          <tr>
              <th>Id</th>
              <th>Email</th>
              <th>Name</th>
              <th>Username</th>
              <th>Password</th>
              <th>Actions</th>
          </tr>
        </thead>
      <tbody>
        {data.map(usr=>(
          <tr key={usr.id}>
            <td>{usr.id}</td>
            <td>{usr.email}</td>
            <td>{usr.name}</td>
            <td>{usr.username}</td>
            <td>{usr.password}</td>
            <td>
              <Button variant="outline-primary btn-sm">Edit</Button> 
              <Button variant="outline-warning btn-sm">Details</Button> 
              <Button variant="outline-danger btn-sm">Delete</Button> 
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </Container>
);
}