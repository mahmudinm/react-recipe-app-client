import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  getRecipeRequest,
  getMoreRecipeRequest
} from "store/modules/recipe/actions";
import RecipeListLoader from "components/Loader/RecipeListLoader";
import RecipeGridLoader from "components/Loader/RecipeGridLoader";
import CardList from "components/Card/CardList";
import CardGrid from "components/Card/CardGrid";
import Form from "components/Form";
import {
  Col,
  Card,
  CardBody,
} from 'reactstrap';
import InfiniteScroll from 'react-infinite-scroll-component';

const RecipeListPage = () => {

  const dispatch = useDispatch();
  const recipes = useSelector(state => state.homeRecipe.recipes);
  const categories = useSelector(state => state.homeRecipe.categories);
  const next_page_url = useSelector(state => state.homeRecipe.next_page_url);
  const loading = useSelector(state => state.homeRecipe.loading);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [listGrid, setListGrid] = useState('List');
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
    // debouce search untuk tidak langsung search tapi di delay terlebih dahulu
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

  const handleListGrid = (e, value) => {
    if(value === 'List') {
      setListGrid('List')
      e.target.classList.toggle('active');
      document.getElementById('grid-button').classList.toggle('active');
    } else if (value === 'Grid') {
      setListGrid('Grid');
      e.target.classList.toggle('active');
      document.getElementById('list-button').classList.toggle('active');
    }
  }

  return (
    <React.Fragment>
      <Col lg="12" md="12">
        <Card className="shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">

            {/* Form search */}
            <Form handleSearch={handleSearch} />

            {/* Dropdown Category */}
            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                Select Category
              </button>

              <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <form> 
                  {categories.map((category, key) => 
                    <li className="dropdown-item" key={key}>
                      <input 
                        type="checkbox"
                        value={category.id}
                        data-name={category.name}
                        onClick={handleCategory}
                        id={`${category.name}-${category.id}`}
                      /> : <label htmlFor={`${category.name}-${category.id}`}>{category.name}</label>
                    </li>
                  )}
                </form>
              </ul>
            </div>

            {/* List Grid Toggle */}
            <div className="btn-group float-right" role="group" aria-label="Basic example">
              <button type="button" className="btn btn-secondary active" id="list-button" onClick={(e) => handleListGrid(e, 'List')} >
                List
              </button>
              <button type="button" className="btn btn-secondary" id="grid-button" onClick={(e) => handleListGrid(e, 'Grid')} >
                Grid
              </button>
            </div>            

            {/* Category List Badge */}
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

            {/* Infinite Scroll */}
            <InfiniteScroll
              className="mt-4"
              dataLength={recipes.length}
              next={fecthMoreData}
              hasMore={hasMore}
              loader={listGrid === 'List' ? <RecipeListLoader /> : <RecipeGridLoader />}
              endMessage={<h4 className="mt-4 text-center">Yay! You have seen it all</h4>}
              style={{ overflow: 'hidden' }}
            >
              <div className="row">
                {loading && listGrid === 'List' && <RecipeListLoader/> } 
                {loading && listGrid === 'Grid' && <RecipeGridLoader/> } 
                {recipes.map((recipe, key) =>  {
                  return listGrid === 'List' ?  
                    <Col lg="12" md="12" key={key}>
                      <CardList recipe={recipe} />
                    </Col> :
                    <Col lg="6" md="6" key={key}>
                      <CardGrid recipe={recipe}/>
                    </Col>
                })} 
              </div>
              <div className="clearfix"></div>
            </InfiniteScroll>

          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
}

export default RecipeListPage;