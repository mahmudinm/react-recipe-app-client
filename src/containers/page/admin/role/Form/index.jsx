import React from 'react';
import {
  Modal, 
  ModalHeader, 
  ModalBody   
} from "reactstrap";
import RoleForm from './RoleForm.jsx';
import {
  storeRoleRequest,
  updateRoleRequest
} from "store/modules/admin/role/actions";
import { useDispatch } from 'react-redux';

const RoleFormPage = ({ modal, toggle, modalTitle }) => {

  const dispatch = useDispatch();

  const storeRole = (data, meta, toggle) => {
    dispatch(storeRoleRequest(data, meta, toggle));
  }

  const updateRole = (data, id, meta, toggle) => {
    dispatch(updateRoleRequest(data, id, meta, toggle));
  }

	return (
    <React.Fragment>
      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
        <ModalBody>
          {/* Form Component */}
          <RoleForm toggle={toggle} storeRole={storeRole} updateRole={updateRole} />
        </ModalBody>
      </Modal>
    </React.Fragment>
	)
}

export default RoleFormPage;