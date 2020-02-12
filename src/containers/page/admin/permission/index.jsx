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
  getPermissionRequest, 
  createPermissionRequest,
  editPermissionRequest,
  deletePermissionRequest,
} from "store/modules/admin/permission/actions";
import Header from "components/Headers/Header.jsx";
import PermissionTable from './PermissionTable.jsx';
import PermissionFormPage from './Form';

const PermissionListPage = () => {

  const [modal, setModal] = useState(false); // untuk set modal false atau true
  const [modalTitle, setModalTitle] = useState(""); // untuk set title pada modal
  const toggle = () => setModal(!modal);
  const dispatch = useDispatch(); 
  const permissions = useSelector(state => state.permission.permissions); // untuk mengambil hasil fetch data dari useEffect

  useEffect(() => {
    document.title = 'Permission Page';
    dispatch(getPermissionRequest()); // fetch data dari url / backend
  }, [dispatch])

  // open modal create 
  const handleModalCreate = () => {
    setModalTitle("Create Form Data");
    dispatch(createPermissionRequest());
    toggle();
  }

  // open modal edit 
  const handleModalEdit = (id) => {
    setModalTitle("Edit Form Data");
    dispatch(editPermissionRequest(id));
    toggle();
  }

  // handle delete data
  const deletePermission = (id) => {
    dispatch(deletePermissionRequest(id))
  }

	return (
    <React.Fragment>
      {/* Modal Form */}
      <PermissionFormPage modal={modal} toggle={toggle} modalTitle={modalTitle} />

      <Header />      
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className=" shadow">
              <CardHeader className=" bg-transparent">
                <h3 className="mb-0 d-inline">Permission</h3>
                <div className="float-right">
                  <Button color="primary" onClick={() => handleModalCreate()}>Create</Button>
                </div>
              </CardHeader>
              <CardBody>

                {/* Table component */}
                <PermissionTable permissions={permissions} handleModalEdit={handleModalEdit} deletePermission={deletePermission} />

              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </React.Fragment>
	)
}

export default PermissionListPage;