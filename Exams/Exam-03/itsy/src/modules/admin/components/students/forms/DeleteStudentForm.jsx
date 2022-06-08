import React from "react";
import { Button, ButtonGroup, Form } from "react-bootstrap";
/**
 * Generate a delete form for an Student and when submit, delete an entry
 * @param {*} studentForm Object where form data is stored
 * @param {*} setSubjectForm Function that allow change the data on studentForm
 * @param {*} handleStudentsDbUpdated Function that confirm the database has been updated
 * @param {*} onSubmitCreate Function that is executed when submitting the form
 * @param {*} _onFinish (Optional) Function that be activate when submit the form
 * @returns Form structure for create an Student
 */

export default function DeleteStudentForm({
  studentForm,
  handleStudentsDbUpdated,
  onSubmitDelete,
  _onFinish = null,
}) {
  // When submit button is pressed
  const handleSubmit = (e) => {
    // Avoid the page be reload
    e.preventDefault();

    // If _onFinish was provided, do it
    if (_onFinish) {
      _onFinish();
    }

    // Create a new entry in database
    onSubmitDelete(studentForm.id);

    // Confirm database has updated
    handleStudentsDbUpdated();
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <p>
          Are you sure you want to delete it? All course registrations will be
          removed
        </p>
        <ButtonGroup className="col-5">
          <Button variant="danger" type="submit" className="col-6">
            Delete
          </Button>
          <Button variant="" className="col-6" onClick={_onFinish}>
            Cancel
          </Button>
        </ButtonGroup>
      </Form>
    </>
  );
}
