import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { 
  getRecipeRequest,
  getMoreRecipeRequest
} from "store/modules/recipe/actions";
import {
  Card,
  CardBody,
  Col,
  Media,
  Input,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText  
} from "reactstrap";
import InfiniteScroll from "react-infinite-scroll-component";

const RecipeListPage = () => {

  const dispatch = useDispatch();
  const recipes = useSelector(state => state.homeRecipe.recipes);
  const next_page_url = useSelector(state => state.homeRecipe.next_page_url);
  const [search, setSearch] = useState('');
  const [category_id, setCategory_id] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    document.title = "Resep Makanan"
    dispatch(getRecipeRequest({ search, category_id }, setHasMore));
  }, [dispatch, search, category_id])

  const fecthMoreData = () => {
    dispatch(getMoreRecipeRequest({ next_page_url, search, category_id }, setHasMore));
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const handleCategory = (e) => {
    if(e.target.checked) {
      setCategory_id([...category_id, e.target.value])
    } else {
      setCategory_id(category_id.filter(item => item !== e.target.value));
    }
  }

  return (
    <React.Fragment>
      <Col lg="12" md="12">
        <Card className="shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">

            <FormGroup className="mb-3">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Search..." type="email" style={{ height: '55px' }} onChange={handleSearch}/>
              </InputGroup>
            </FormGroup>

            Soup : <input type="checkbox" onClick={handleCategory} name="category_id" value="16"/>
            Bubur : <input type="checkbox" onClick={handleCategory} name="category_id" value="18"/>

            {category_id.map((item, key) => 
              <p key={key} >{item}</p>
            )}

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
