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
  getIngredientRequest, 
  createIngredientRequest,
  editIngredientRequest,
  deleteIngredientRequest,
} from "store/modules/admin/ingredient/actions";
import Header from "components/Headers/Header.jsx";
import IngredientTable from './IngredientTable.jsx';
import IngredientFormPage from './Form';

const IngredientListPage = () => {

  const [modal, setModal] = useState(false); // untuk set modal false atau true
  const [modalTitle, setModalTitle] = useState(""); // untuk set title pada modal
  const toggle = () => setModal(!modal);
  const dispatch = useDispatch(); 
  const ingredients = useSelector(state => state.ingredient.ingredients); // untuk mengambil hasil fetch data dari useEffect

  useEffect(() => {
    document.title = 'Ingredient Page';
    dispatch(getIngredientRequest()); // fetch data dari url / backend
  }, [dispatch])

  // open modal create 
  const handleModalCreate = () => {
    setModalTitle("Create Form Data");
    dispatch(createIngredientRequest());
    toggle();
  }

  // open modal edit 
  const handleModalEdit = (id) => {
    setModalTitle("Edit Form Data");
    dispatch(editIngredientRequest(id));
    toggle();
  }

  // handle delete data
  const deleteIngredient = (id) => {
    dispatch(deleteIngredientRequest(id))
  }

	return (
    <React.Fragment>
      {/* Modal Form */}
      <IngredientFormPage modal={modal} toggle={toggle} modalTitle={modalTitle} />

      <Header />      
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className=" shadow">
              <CardHeader className=" bg-transparent">
                <h3 className="mb-0 d-inline">Ingredient</h3>
                <div className="float-right">
                  <Button color="primary" onClick={() => handleModalCreate()}>Create</Button>
                </div>
              </CardHeader>
              <CardBody>

                {/* Table component */}
                <IngredientTable ingredients={ingredients} handleModalEdit={handleModalEdit} deleteIngredient={deleteIngredient} />

              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </React.Fragment>
	)
}

export default IngredientListPage;