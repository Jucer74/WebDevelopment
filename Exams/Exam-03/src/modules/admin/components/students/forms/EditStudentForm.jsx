import React from "react";
import { Button, ButtonGroup, Form } from "react-bootstrap";

/**
 * Generate a edit form for an Student and when submit, edit an entry
 * @param {*} studentForm Object where form data is stored
 * @param {*} setStudentForm Function that allow change the data on studentForm
 * @param {*} handleStudentsDbUpdated Function that confirm the database has been updated
 * @param {*} onSubmitEdit Function that is executed when submitting the form
 * @param {*} _onFinish (Optional) Function that be activate when submit the form
 * @returns Form structure for edit an Student
 */

export default function EditStudentForm({
  studentForm,
  setStudentForm,
  handleStudentsDbUpdated,
  onSubmitEdit,
  _onFinish = null,
}) {
  // When change a value on the form
  const handleChange = (e) => {
    // Puts the values of the form into the object
    setStudentForm({
      ...studentForm,
      [e.target.name]: e.target.value,
    });
  };

  // When submit button is pressed
  const handleSubmit = (e) => {
    // Avoid the page be reload
    e.preventDefault();

    // If _onFinish was provided, do it
    if (_onFinish) {
      _onFinish();
    }
    // Create a new entry in database
    onSubmitEdit(studentForm.id, studentForm);

    // Confirm database has updated
    handleStudentsDbUpdated();
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="firstNameForm.ControlText1">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={studentForm.firstName}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="lastNameForm.ControlText2">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={studentForm.lastName}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="emailForm.ControlEmail1">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={studentForm.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="phoneNumberForm.ControlTel1">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            name="phoneNumber"
            value={studentForm.phoneNumber}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="genderForm.ControlSelect1">
          <Form.Label>Gender</Form.Label>
          <Form.Select
            name="gender"
            defaultValue={studentForm.gender}
            onChange={handleChange}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="dateOfBirthForm.ControlDate1">
          <Form.Label>Date Of Birth</Form.Label>
          <Form.Control
            type="date"
            name="dateOfBirth"
            value={studentForm.dateOfBirth}
            onChange={handleChange}
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
            onChange={handleChange}
          />
        </Form.Group>

        <ButtonGroup className="col-5">
          <Button variant="success" type="submit" className="col-6">
            Edit
          </Button>
          <Button variant="" className="col-6" onClick={_onFinish}>
            Cancel
          </Button>
        </ButtonGroup>
      </Form>
    </>
  );
}
