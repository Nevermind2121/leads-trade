import React from 'react'
import { Modal } from 'react-bootstrap'

export const ModalWindow = ({ show, handleClose, modalData, modalHeading }) => {
  return <>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{modalHeading}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{modalData}</Modal.Body>
    </Modal>
  </>
}
