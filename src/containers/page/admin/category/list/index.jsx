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
import { getCategoryRequest } from "store/modules/category/actions";
import Header from "components/Headers/Header.jsx";
import CategoryTable from './CategoryTable';
import CategoryFormPage from '../form';

const CategoryListPage = () => {

  useEffect(() => {
    dispatch(getCategoryRequest())
  }, [dispatch])

  const [modal, setModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const dispatch = useDispatch();
  const categories = useSelector(state => state.category.categories);

  const handleModal = (id) => {
    setModal(!modal);
    if(id) {
      setModalTitle("Edit Form Data")
    } else {
      setModalTitle("Create Form Data")
    }
  }

	return (
    <React.Fragment>
      {/* Modal Form */}
      <CategoryFormPage modal={modal} handleModal={handleModal} modalTitle={modalTitle} />

      <Header />      
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className=" shadow">
              <CardHeader className=" bg-transparent">
                <h3 className="mb-0 d-inline">Category</h3>
                <div className="float-right">
                  <Button color="primary" onClick={() => handleModal()}>Create</Button>
                </div>
              </CardHeader>
              <CardBody>
                <CategoryTable categories={categories} handleModal={handleModal} />
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </React.Fragment>
	)
}

export default CategoryListPage;