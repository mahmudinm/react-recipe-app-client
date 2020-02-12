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
  getRecipeRequest, 
  createRecipeRequest,
  editRecipeRequest,
  deleteRecipeRequest,
} from "store/modules/admin/recipe/actions";
import Header from "components/Headers/Header.jsx";
import RecipeTable from './RecipeTable.jsx';
import RecipeFormPage from './Form';

const RecipeListPage = () => {

  const [modal, setModal] = useState(false); // untuk set modal false atau true
  const [modalTitle, setModalTitle] = useState(""); // untuk set title pada modal
  const toggle = () => setModal(!modal);
  const dispatch = useDispatch(); 
  const recipes = useSelector(state => state.recipe.recipes); // untuk mengambil hasil fetch data dari useEffect

  useEffect(() => {
    document.title = 'Recipe Page';
    dispatch(getRecipeRequest()); // fetch data dari url / backend
  }, [dispatch])

  // open modal create 
  const handleModalCreate = () => {
    setModalTitle("Create Form Data");
    dispatch(createRecipeRequest());
    toggle();
  }

  // open modal edit 
  const handleModalEdit = (id) => {
    setModalTitle("Edit Form Data");
    dispatch(editRecipeRequest(id));
    toggle();
  }

  // handle delete data
  const deleteRecipe = (id) => {
    dispatch(deleteRecipeRequest(id))
  }

	return (
    <React.Fragment>
      {/* Modal Form */}
      <RecipeFormPage modal={modal} toggle={toggle} modalTitle={modalTitle} />

      <Header />      
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className=" shadow">
              <CardHeader className=" bg-transparent">
                <h3 className="mb-0 d-inline">Recipes</h3>
                <div className="float-right">
                  <Button color="primary" onClick={() => handleModalCreate()}>Create</Button>
                </div>
              </CardHeader>
              <CardBody>

                {/* Table component */}
                <RecipeTable recipes={recipes} handleModalEdit={handleModalEdit} deleteRecipe={deleteRecipe} />

              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </React.Fragment>
	)
}

export default RecipeListPage;