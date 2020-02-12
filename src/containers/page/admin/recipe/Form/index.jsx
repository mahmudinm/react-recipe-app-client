import React from 'react';
import {
  Modal, 
  ModalHeader, 
  ModalBody   
} from "reactstrap";
import RecipeForm from './RecipeForm.jsx';
import {
  storeRecipeRequest,
  updateRecipeRequest
} from "store/modules/admin/recipe/actions";
import { useDispatch } from 'react-redux';

const RecipeFormPage = ({ modal, toggle, modalTitle }) => {

  const dispatch = useDispatch();

  const storeRecipe = (data, meta, toggle) => {
    dispatch(storeRecipeRequest(data, meta, toggle));
  }

  const updateRecipe = (data, id, meta, toggle) => {
    dispatch(updateRecipeRequest(data, id, meta, toggle));
  }

	return (
    <React.Fragment>
      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
        <ModalBody>
          {/* Form Component */}
          <RecipeForm toggle={toggle} storeRecipe={storeRecipe} updateRecipe={updateRecipe} />
        </ModalBody>
      </Modal>
    </React.Fragment>
	)
}

export default RecipeFormPage;