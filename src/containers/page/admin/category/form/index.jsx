import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Button,
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter   
} from "reactstrap";

const CategoryFormPage = ({ modal, handleModal, modalTitle }) => {
	return (
    <React.Fragment>
      <Modal isOpen={modal} toggle={() => handleModal()}>
        <ModalHeader toggle={() => handleModal()}>{modalTitle}</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => handleModal()}>Do Something</Button>{' '}
          <Button color="secondary" onClick={() => handleModal()}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
	)
}

export default CategoryFormPage;