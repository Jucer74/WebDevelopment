import React from "react";
import {Form } from "react-bootstrap";
/**
 * Generate a details form for an Student
 * @param {*} studentForm Object where form data is stored
 * @returns Form structure for create an student
 */

export default function DetailsStudentForm({ studentForm }) {
  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="idForm.ControlText1">
          <Form.Label>Id</Form.Label>
          <Form.Control type="text" name="id" value={studentForm.id} disabled />
        </Form.Group>

        <Form.Group className="mb-3" controlId="firstNameForm.ControlText2">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={studentForm.firstName}
            disabled
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="lastNameForm.ControlText3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={studentForm.lastName}
            disabled
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="emailForm.ControlEmail1">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={studentForm.email}
            disabled
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="phoneNumberForm.ControlTel1">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            name="phoneNumber"
            value={studentForm.phoneNumber}
            disabled
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="genderForm.ControlText3">
          <Form.Label>Gender</Form.Label>
          <Form.Control
            type="text"
            name="gender"
            value={studentForm.gender}
            disabled
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="dateOfBirthForm.ControlDate1">
          <Form.Label>Date Of Birth</Form.Label>
          <Form.Control
            type="tel"
            name="dateOfBirth"
            value={studentForm.dateOfBirth}
            disabled
          />
        </Form.Group>

        <Form.Group
          className="mb-3"
          controlId="residenceAdressForm.ControlText4"
        >
          <Form.Label>Residece Adress</Form.Label>
          <Form.Control
            type="text"
            name="residenceAdress"
            value={studentForm.residenceAdress}
            disabled
          />
        </Form.Group>
      </Form>
    </>
  );
}
