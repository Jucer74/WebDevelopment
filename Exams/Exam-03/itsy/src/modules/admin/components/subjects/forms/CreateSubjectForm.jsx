import React from "react";
import { Button, ButtonGroup, Form } from "react-bootstrap";
import { getCurrentDate } from "../../../../../utils/utilsDate";

/**
 * Generate a create form for an Subject and when submit, create an entry
 * @param {*} subjectForm Object where form data is stored
 * @param {*} setSubjectForm Function that allow change the data on subjectForm
 * @param {*} handleSubjectsDbUpdated Function that confirm the database has been updated
 * @param {*} onSubmitCreate Function that is executed when submitting the form
 * @param {*} _onFinish (Optional) Function that be activate when submit the form
 * @returns Form structure for create an subject
 */

export default function CreateSubjectForm({
  subjectForm,
  setSubjectForm,
  handleSubjectsDbUpdated,
  onSubmitCreate,
  _onFinish = null,
}) {
  // When change a value on the form
  const handleChange = (e) => {
    // Puts the values of the form into the object
    setSubjectForm({
      ...subjectForm,
      [e.target.name]: e.target.value,
      dateOfCreation: getCurrentDate(),
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
    onSubmitCreate(subjectForm);

    // Confirm database has updated
    handleSubjectsDbUpdated();
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="nameForm.ControlText1">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={subjectForm.Name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group
          className="mb-3"
          controlId="descriptionForm.ControlTextarea1"
        >
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            name="description"
            value={subjectForm.Description}
            onChange={handleChange}
          />
        </Form.Group>

        <ButtonGroup className="col-5">
          <Button variant="success" type="submit" className="col-6">
            Create
          </Button>
          <Button variant="" className="col-6" onClick={_onFinish}>
            Cancel
          </Button>
        </ButtonGroup>
      </Form>
    </>
  );
}
