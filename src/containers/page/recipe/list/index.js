import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { 
  getRecipeRequest,
  getMoreRecipeRequest,
} from "store/modules/recipe/actions";
import {
  Card,
  CardBody,
  Col
} from "reactstrap";

const RecipeListPage = () => {

  const dispatch = useDispatch();
  const recipes = useSelector(state => state.homeRecipe.recipes);
  const current_page = useSelector(state => state.homeRecipe.current_page);
  const last_page = useSelector(state => state.homeRecipe.last_page);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    document.title = "Resep Makanan"
    dispatch(getRecipeRequest());
    document.addEventListener('scroll', (e) => {
      if(window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetching) return;
      if(!hasMore) { console.log('hasMore false working ?')}
      if(hasMore) { console.log('hasMore true working ?')}
      setIsFetching(true);
    });
    // return () => window.removeEventListener('scroll', handleScroll);
  }, [dispatch, handleScroll])

  useEffect(() => {
    if(!isFetching) return;
    fetchMore();
  }, [hasMore, isFetching, current_page, last_page]);

  const handleScroll = () => {
    if(window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetching) return;
    setIsFetching(true);
  }

  const fetchMore = () => {
    if(current_page === last_page) {
      setHasMore(false)
      setIsFetching(false);
    } else {
      dispatch(getMoreRecipeRequest(current_page + 1, setIsFetching))
    }
  }

  return (
    <React.Fragment>
      <Col lg="12" md="12">
        <Card className="shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <input type="text" name="query"/>

            <p>List data recipe</p>
            {recipes.map((item, key) => 
              <div 
                key={key}
                style={{ width: '100%', padding: '100px', borderBottom: '1px solid #b9b9b9' }}
              >
                {item.name}
              </div>
            )}
            {isFetching && 'Loading...'}
            {!hasMore && (
              <div 
                style={{ width: '100%', padding: '100px', borderBottom: '1px solid #b9b9b9' }}
              >
                Last Page
              </div>
            )}
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
}

export default RecipeListPage;
