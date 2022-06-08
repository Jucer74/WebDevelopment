import React from "react";
import { Modal } from "react-bootstrap";

/**
 *
 * @param {*} modalShow State that allow show the modal (true or false)
 * @param {*} handleCloseModal Function that close the modal
 * @param {*} bodyContent Content that put on modal body
 * @returns Generic modal window
 */

export default function CustomModal({
  modalShow,
  handleCloseModal,
  modalTitle,
  modalBodyContent,
}) {
  return (
    <>
      <Modal show={modalShow} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalBodyContent}</Modal.Body>
      </Modal>
    </>
  );
}
