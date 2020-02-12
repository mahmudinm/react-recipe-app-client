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
  getUserRequest, 
  createUserRequest,
  editUserRequest,
  deleteUserRequest,
} from "store/modules/admin/user/actions";
import Header from "components/Headers/Header.jsx";
import UserTable from './UserTable.jsx';
import UserFormPage from './Form';

const UserListPage = () => {

  const [modal, setModal] = useState(false); // untuk set modal false atau true
  const [modalTitle, setModalTitle] = useState(""); // untuk set title pada modal
  const toggle = () => setModal(!modal);
  const dispatch = useDispatch(); 
  const users = useSelector(state => state.user.users); // untuk mengambil hasil fetch data dari useEffect

  useEffect(() => {
    document.title = 'User Page';
    dispatch(getUserRequest()); // fetch data dari url / backend
  }, [dispatch])

  // open modal create 
  const handleModalCreate = () => {
    setModalTitle("Create Form Data");
    dispatch(createUserRequest());
    toggle();
  }

  // open modal edit 
  const handleModalEdit = (id) => {
    setModalTitle("Edit Form Data");
    dispatch(editUserRequest(id));
    toggle();
  }

  // handle delete data
  const deleteUser = (id) => {
    dispatch(deleteUserRequest(id))
  }

	return (
    <React.Fragment>
      {/* Modal Form */}
      <UserFormPage modal={modal} toggle={toggle} modalTitle={modalTitle} />

      <Header />      
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className=" shadow">
              <CardHeader className=" bg-transparent">
                <h3 className="mb-0 d-inline">Users</h3>
                <div className="float-right">
                  <Button color="primary" onClick={() => handleModalCreate()}>Create</Button>
                </div>
              </CardHeader>
              <CardBody>

                {/* Table component */}
                <UserTable users={users} handleModalEdit={handleModalEdit} deleteUser={deleteUser} />

              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </React.Fragment>
	)
}

export default UserListPage;