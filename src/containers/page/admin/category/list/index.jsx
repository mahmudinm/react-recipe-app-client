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
  getCategoryRequest, 
  createCategoryRequest,
  editCategoryRequest 
} from "store/modules/category/actions";
import Header from "components/Headers/Header.jsx";
import CategoryTable from './CategoryTable.jsx';
import CategoryFormPage from '../form';

const CategoryListPage = () => {

  useEffect(() => {
    dispatch(getCategoryRequest())
  }, [dispatch])

  const [modal, setModal] = useState(false); // untuk set modal false atau true
  const [modalTitle, setModalTitle] = useState(""); // untuk set title pada modal
  const toggle = () => setModal(!modal);
  const dispatch = useDispatch(); 
  const categories = useSelector(state => state.category.categories); // untuk mengambil hasil fetch data dari useEffect
  const category = useSelector(state => state.category.category); // untuk mengambil hasil action dari handleModal untuk create dan update

  // open modal create 
  const handleModalCreate = () => {
    setModalTitle("Create Form Data");
    dispatch(createCategoryRequest());
    toggle();
  }

  // open modal edit 
  const handleModalEdit = (id) => {
    setModalTitle("Edit Form Data");
    dispatch(editCategoryRequest(id));
    toggle();
  }

	return (
    <React.Fragment>
      {/* Modal Form */}
      <CategoryFormPage modal={modal} toggle={toggle} modalTitle={modalTitle} />

      <Header />      
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className=" shadow">
              <CardHeader className=" bg-transparent">
                <h3 className="mb-0 d-inline">Category</h3>
                <div className="float-right">
                  <Button color="primary" onClick={() => handleModalCreate()}>Create</Button>
                </div>
              </CardHeader>
              <CardBody>

                {/* Table component */}
                <CategoryTable categories={categories} handleModalEdit={handleModalEdit} />

              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </React.Fragment>
	)
}

export default CategoryListPage;