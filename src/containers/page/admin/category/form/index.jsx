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
import CategoryForm from './CategoryForm.jsx';
import {
  storeCategoryRequest
} from "store/modules/category/actions";
import { useDispatch } from 'react-redux';

const CategoryFormPage = ({ modal, toggle, modalTitle, category }) => {

  const dispatch = useDispatch();

  const storeCategory = (data, meta, toggle) => {
    dispatch(storeCategoryRequest(data, meta, toggle));
  }

	return (
    <React.Fragment>
      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
        <ModalBody>
          {/* Form Component */}
          <CategoryForm toggle={toggle} category={category} storeCategory={storeCategory} />
        </ModalBody>
      </Modal>
    </React.Fragment>
	)
}

export default CategoryFormPage;