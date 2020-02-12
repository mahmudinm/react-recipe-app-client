import React from 'react';
import {
  Modal, 
  ModalHeader, 
  ModalBody   
} from "reactstrap";
import PermissionForm from './PermissionForm.jsx';
import {
  storePermissionRequest,
  updatePermissionRequest
} from "store/modules/admin/permission/actions";
import { useDispatch } from 'react-redux';

const PermissionFormPage = ({ modal, toggle, modalTitle }) => {

  const dispatch = useDispatch();

  const storePermission = (data, meta, toggle) => {
    dispatch(storePermissionRequest(data, meta, toggle));
  }

  const updatePermission = (data, id, meta, toggle) => {
    dispatch(updatePermissionRequest(data, id, meta, toggle));
  }

	return (
    <React.Fragment>
      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
        <ModalBody>
          {/* Form Component */}
          <PermissionForm toggle={toggle} storePermission={storePermission} updatePermission={updatePermission} />
        </ModalBody>
      </Modal>
    </React.Fragment>
	)
}

export default PermissionFormPage;