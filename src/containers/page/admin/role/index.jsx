import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Container,
  Row
} from "reactstrap";
import { 
  getRoleRequest, 
  createRoleRequest,
  editRoleRequest,
  deleteRoleRequest,
} from "store/modules/admin/role/actions";
import Header from "components/Headers/Header.jsx";
import RoleTable from './RoleTable.jsx';
import RoleFormPage from './Form';

const RoleListPage = () => {

  const [modal, setModal] = useState(false); // untuk set modal false atau true
  const [modalTitle, setModalTitle] = useState(""); // untuk set title pada modal
  const toggle = () => setModal(!modal);
  const dispatch = useDispatch(); 
  const roles = useSelector(state => state.role.roles); // untuk mengambil hasil fetch data dari useEffect

  useEffect(() => {
    document.title = 'Role Page';
    dispatch(getRoleRequest()); // fetch data dari url / backend
  }, [dispatch])

  // open modal create 
  const handleModalCreate = () => {
    setModalTitle("Create Form Data");
    dispatch(createRoleRequest());
    toggle();
  }

  // open modal edit 
  const handleModalEdit = (id) => {
    setModalTitle("Edit Form Data");
    dispatch(editRoleRequest(id));
    toggle();
  }

  // handle delete data
  const deleteRole = (id) => {
    dispatch(deleteRoleRequest(id))
  }

	return (
    <React.Fragment>
      {/* Modal Form */}
      <RoleFormPage modal={modal} toggle={toggle} modalTitle={modalTitle} />

      <Header />      
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className=" shadow">
              <CardHeader className=" bg-transparent">
                <h3 className="mb-0 d-inline">Role</h3>
                <div className="float-right">
                  <Button color="primary" onClick={() => handleModalCreate()}>Create</Button>
                </div>
              </CardHeader>
              <CardBody>

                {/* Table component */}
                <RoleTable roles={roles} handleModalEdit={handleModalEdit} deleteRole={deleteRole} />

              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </React.Fragment>
	)
}

export default RoleListPage;