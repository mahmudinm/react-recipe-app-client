import React from 'react';
import {
  Modal, 
  ModalHeader, 
  ModalBody   
} from "reactstrap";
import IngredientForm from './IngredientForm.jsx';
import {
  storeIngredientRequest,
  updateIngredientRequest
} from "store/modules/admin/ingredient/actions";
import { useDispatch } from 'react-redux';

const IngredientFormPage = ({ modal, toggle, modalTitle }) => {

  const dispatch = useDispatch();

  const storeIngredient = (data, meta, toggle) => {
    dispatch(storeIngredientRequest(data, meta, toggle));
  }

  const updateIngredient = (data, id, meta, toggle) => {
    dispatch(updateIngredientRequest(data, id, meta, toggle));
  }

	return (
    <React.Fragment>
      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
        <ModalBody>
          {/* Form Component */}
          <IngredientForm toggle={toggle} storeIngredient={storeIngredient} updateIngredient={updateIngredient} />
        </ModalBody>
      </Modal>
    </React.Fragment>
	)
}

export default IngredientFormPage;