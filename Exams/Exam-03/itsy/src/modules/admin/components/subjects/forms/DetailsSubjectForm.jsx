import React from "react";
import {Form } from "react-bootstrap";
/**
 * Generate a details form for an Subject
 * @param {*} subjectForm Object where form data is stored
 * @returns Form structure for create an subject
 */

export default function DetailsSubjectForm({ subjectForm }) {
  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="idForm.ControlText1">
          <Form.Label>Id</Form.Label>
          <Form.Control
            type="text"
            name="id"
            value={subjectForm.id}
            disabled
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="nameForm.ControlText2">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={subjectForm.name}
            disabled
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
            disabled
          />
        </Form.Group>

        <Form.Group
          className="mb-3"
          controlId="dateOfCreationForm.ControlDate1"
        >
          <Form.Label>Date of creation</Form.Label>
          <Form.Control
            type="date"
            name="dateOfCreation"
            value={subjectForm.dateOfCreation}
            disabled
          />
        </Form.Group>
      </Form>
    </>
  );
}
