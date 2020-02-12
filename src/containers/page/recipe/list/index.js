import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { 
  getRecipeRequest,
  getMoreRecipeRequest,
} from "store/modules/recipe/actions";
import {
  Card,
  CardBody,
  Col,
  Media
} from "reactstrap";
import InfiniteScroll from "react-infinite-scroll-component";

const RecipeListPage = () => {

  const dispatch = useDispatch();
  const recipes = useSelector(state => state.homeRecipe.recipes);
  const next_page_url = useSelector(state => state.homeRecipe.next_page_url);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    document.title = "Resep Makanan"
    dispatch(getRecipeRequest());
  }, [dispatch])

  const fecthMoreData = () => {
    dispatch(getMoreRecipeRequest(next_page_url, setHasMore));
  }

  return (
    <React.Fragment>
      <Col lg="12" md="12">
        <Card className="shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
          
            <input type="text" name="query"/>

            <InfiniteScroll
              dataLength={recipes.length}
              next={fecthMoreData}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
              endMessage={<h4>Yay! You have seen it all</h4>}
            >
              {recipes.map((recipe, key) => 
                <Card key={key} className="mb-3">
                  <CardBody>
                    <Media>
                      <Media left>
                        <Media object style={{ width: '200px' }} src={`http://localhost:8000/image/${recipe.image}`} alt={recipe.image} />
                      </Media>
                      <Media body className="ml-4" >
                        <Media>
                          <h2 className="media-heading">{recipe.name}</h2>
                        </Media>
                        <b>Category : {recipe.category.name}</b>
                        <p>{recipe.step}</p>
                      </Media>
                    </Media>
                  </CardBody>
                </Card>
              )}
            </InfiniteScroll>

          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
}

export default RecipeListPage;
