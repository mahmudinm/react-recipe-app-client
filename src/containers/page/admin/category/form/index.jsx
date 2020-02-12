import React from 'react';
import {
  Modal, 
  ModalHeader, 
  ModalBody   
} from "reactstrap";
import CategoryForm from './CategoryForm.jsx';
import {
  storeCategoryRequest,
  updateCategoryRequest
} from "store/modules/admin/category/actions";
import { useDispatch } from 'react-redux';

const CategoryFormPage = ({ modal, toggle, modalTitle }) => {

  const dispatch = useDispatch();

  const storeCategory = (data, meta, toggle) => {
    dispatch(storeCategoryRequest(data, meta, toggle));
  }

  const updateCategory = (data, id, meta, toggle) => {
    dispatch(updateCategoryRequest(data, id, meta, toggle));
  }

	return (
    <React.Fragment>
      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
        <ModalBody>
          {/* Form Component */}
          <CategoryForm toggle={toggle} storeCategory={storeCategory} updateCategory={updateCategory} />
        </ModalBody>
      </Modal>
    </React.Fragment>
	)
}

export default CategoryFormPage;