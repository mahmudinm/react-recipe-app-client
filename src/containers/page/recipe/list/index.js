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
  const categories = useSelector(state => state.homeRecipe.categories);
  const next_page_url = useSelector(state => state.homeRecipe.next_page_url);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [hasMore, setHasMore] = useState(true);  
  let timer = null;


  useEffect(() => {
    document.title = "Resep Makanan"
    dispatch(getRecipeRequest({ search, categoryFilter }, setHasMore));
  }, [dispatch, search, categoryFilter])


  const fecthMoreData = () => {
    dispatch(getMoreRecipeRequest({ next_page_url, search, categoryFilter }, setHasMore));
  }

  const handleSearch = (e) => {
    let name = e.target.value;
    if(timer) clearTimeout(timer);
    timer = setTimeout(() => {
      setSearch(name);
    }, 250)
  }

  const handleCategory = (e) => {
    if(e.target.checked) {
      setCategoryFilter([...categoryFilter, { id: e.target.value, name: e.currentTarget.getAttribute('data-name')}]);
    } else {
      setCategoryFilter(categoryFilter.filter(item => item.id !== e.target.value));
    }
  }

  const closeCategory = (id, name) => {
    setCategoryFilter(categoryFilter.filter(item => item.id !== id ));
    const categoryId = `${name}-${id}`;
    document.getElementById(categoryId).checked = false;
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

            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Select Category
              </button>

              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                {categories.map((category, key) => 
                  <button className="dropdown-item" key={key}>
                    <input 
                      type="checkbox"
                      value={category.id}
                      data-name={category.name}
                      onClick={handleCategory}
                      id={`${category.name}-${category.id}`}
                    /> : <label htmlFor={`${category.name}-${category.id}`}>{category.name}</label>
                  </button>
                )}
              </div>
            </div>

            <div className="my-3">
              {categoryFilter.map((item, key) => 
                <span className="badge badge-primary" style={{ lineHeight: '1.8', paddingLeft: '10px', paddingRight: '10px', marginRight: '10px' }} key={key}>
                  {item.name}
                  <button type="button" className="close" onClick={(e) => closeCategory(item.id, item.name)} >
                    <span>&times;</span>
                  </button>
                </span>
              )}
            </div>

            <InfiniteScroll
              className="mt-3"
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