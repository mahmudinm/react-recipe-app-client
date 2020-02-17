import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
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
import ContentLoader from "react-content-loader" 

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

  const RecipeShowLoader = () => (
    <ContentLoader 
      speed={1.3}
      height={820}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="0" rx="5" ry="5" width="1200" height="450" />
      <rect x="26" y="487" rx="5" ry="5" width="300" height="17" />
      <rect x="26" y="538" rx="5" ry="5" width="250" height="15" />
      <rect x="26" y="574" rx="5" ry="5" width="250" height="15" />
      <rect x="41" y="605" rx="5" ry="5" width="250" height="15" />
      <rect x="26" y="635" rx="5" ry="5" width="250" height="15" />
      <rect x="41" y="675" rx="5" ry="5" width="250" height="15" />
    </ContentLoader>
  )

  return (
    <React.Fragment>
      <Col lg="12" md="12">
        <Card className="shadow border-0">
          {recipe.name ? 
            <React.Fragment>
              <CardImg top src={`http://localhost:8000/image/${recipe.image}`} alt={recipe.image} style={{ height: '450px', objectFit: 'cover' }}/>
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
