import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, Table } from 'react-bootstrap';
import { FontAwesomeIcon as Fas} from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export function List()
{
  const baseUrl = "http://localhost:5000/people";

  const [ data, setData]=useState([]);  

  const GetUsers=async()=>{
    await axios.get(baseUrl)
    .then (response=>{
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  useEffect(()=>{
    GetUsers();
  },[]);


return (
  <Container className="text-center text-md-left">
    <h1>User List</h1>
    <p>
      <Button className="left" variant="success btn-sm"> <Fas icon={faPlus} /> New</Button>
    </p>
    <Table id="peopleTable">
      <thead>
          <tr>
              <th>Id</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>DateOfBirth</th>
              <th>Sex</th>
          </tr>
        </thead>
      <tbody>
        {data.map(per=>(
          <tr key={per.id}>
            <td>{per.id}</td>
            <td>{per.firstName}</td>
            <td>{per.lastName}</td>
            <td>{per.dateOfBirth}</td>
            <td>{per.sex}</td>
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