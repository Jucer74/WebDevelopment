import React from "react";
import { Button, ButtonGroup, Form } from "react-bootstrap";

/**
 * Generate a edit form for an Subject and when submit, edit an entry
 * @param {*} subjectForm Object where form data is stored
 * @param {*} setSubjectForm Function that allow change the data on subjectForm
 * @param {*} handleSubjectsDbUpdated Function that confirm the database has been updated
 * @param {*} onSubmitEdit Function that is executed when submitting the form
 * @param {*} _onFinish (Optional) Function that be activate when submit the form
 * @returns Form structure for edit an subject
 */

export default function EditSubjectForm({
  subjectForm,
  setSubjectForm,
  handleSubjectsDbUpdated,
  onSubmitEdit,
  _onFinish = null,
}) {
  // When change a value on the form
  const handleChange = (e) => {
    // Puts the values of the form into the object
    setSubjectForm({
      ...subjectForm,
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
    onSubmitEdit(subjectForm.id, subjectForm);

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
            value={subjectForm.name}
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
            value={subjectForm.description}
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
