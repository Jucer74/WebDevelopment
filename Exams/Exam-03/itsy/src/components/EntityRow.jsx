import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import {
  BsFillPencilFill,
  BsFillTrashFill,
  BsFillEyeFill,
} from "react-icons/bs";

/**
 * Generate a table row with the data of an entity
 * @param {*} entity An entity to show your data in a row
 * @param {*} setEntityForm Function to change the entity that will be sent to the form
 * @param {*} setTypeEntityForm Function to set the type of form that will show
 * @param {*} handleShowModal Function to show the modal
 * @returns A table row with the data of an entity
 */
export default function EntityRow({
  entity,
  setEntityForm,
  setTypeEntityForm,
  handleShowModal,
}) {

  const handlePushButton = (typeForm) => {
    setEntityForm(entity);
    setTypeEntityForm(typeForm);
    handleShowModal();
  };

  return (
    <>
      <tr>
        {Object.keys(entity).map((property) => {
          return (
            <td
              key={property}>{entity[property]}
            </td>
          );
        })}
        <td>
          <ButtonGroup className={`col-2`}>
            <Button
              variant="primary"
              className={`m-1`}
              onClick={() => handlePushButton("DETAILS")}
            >
              <BsFillEyeFill></BsFillEyeFill>
            </Button>
            <Button
              variant="success"
              className={`m-1`}
              onClick={() => handlePushButton("EDIT")}
            >
              <BsFillPencilFill></BsFillPencilFill>
            </Button>
            <Button
              variant="danger"
              className={`m-1`}
              onClick={() => handlePushButton("DELETE")}
            >
              <BsFillTrashFill></BsFillTrashFill>
            </Button>
          </ButtonGroup>
        </td>
      </tr>
    </>
  );
}
