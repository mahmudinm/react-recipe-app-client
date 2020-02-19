import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import RecipeShowLoader from "components/Loader/RecipeShowLoader";
import {
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardSubtitle,
  CardText,
  Col
} from 'reactstrap';
import { 
  showRecipeRequest,
  showRecipeUnmount,
} from "store/modules/recipe/actions";

const RecipeShowPage = () => {

  let { id } = useParams();
  const dispatch = useDispatch();
  const recipe = useSelector(state => state.homeRecipe.recipe);

  useEffect(() => {
    dispatch(showRecipeRequest({ id }));
    return () => {
      dispatch(showRecipeUnmount());
    }
  }, [dispatch, id])

  return (
    <React.Fragment>
      <Col lg="12" md="12">
        <Card className="shadow border-0">
          {recipe.name ? 
            <React.Fragment>
              <CardImg top src={`${process.env.REACT_APP_URL}/image/${recipe.image}`} alt={recipe.image} style={{ height: '450px', objectFit: 'cover' }}/>
              <CardBody>
                <CardTitle>
                  <h1>{recipe.name}</h1>
                </CardTitle>
                <CardSubtitle>Category : {recipe.category.name}</CardSubtitle>
                <br/>
                <CardText><b>Step / Langkah Membuat :</b></CardText>
                <CardText className="ml-3">{recipe.step}</CardText>
                <CardText>Ingredients / Bahan Bahan</CardText>
                <ul>
                  {recipe.ingredients.map((item, key) => 
                    <li key={key}>{item.name} {item.pivot.quantity}</li>
                  )}
                </ul>
              </CardBody> 
            </React.Fragment> : <RecipeShowLoader/>
          }
        </Card>
      </Col>
    </React.Fragment>
  );
}

export default RecipeShowPage;
