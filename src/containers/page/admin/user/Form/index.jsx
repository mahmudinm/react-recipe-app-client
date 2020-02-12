import React from 'react';
import {
  Modal, 
  ModalHeader, 
  ModalBody   
} from "reactstrap";
import UserForm from './UserForm.jsx';
import {
  storeUserRequest,
  updateUserRequest
} from "store/modules/admin/user/actions";
import { useDispatch } from 'react-redux';

const UserFormPage = ({ modal, toggle, modalTitle }) => {

  const dispatch = useDispatch();

  const storeUser = (data, meta, toggle) => {
    dispatch(storeUserRequest(data, meta, toggle));
  }

  const updateUser = (data, id, meta, toggle) => {
    dispatch(updateUserRequest(data, id, meta, toggle));
  }

	return (
    <React.Fragment>
      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
        <ModalBody>
          {/* Form Component */}
          <UserForm toggle={toggle} storeUser={storeUser} updateUser={updateUser} />
        </ModalBody>
      </Modal>
    </React.Fragment>
	)
}

export default UserFormPage;