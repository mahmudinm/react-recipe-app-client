import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from "utils/api";
import axios from 'axios';

import { 
  getRecipeSuccess,
  getMoreRecipeSuccess,
  showRecipeSuccess,
} from './actions';

export function* getRecipe({ 
  payload,
  setHasMore
}) {
  try {
    const { search, categoryFilter } = payload;
    let map_category = '';

    if(categoryFilter.length > 0) {
      categoryFilter.forEach((item) => {
        map_category += `&category_id[]=${item.id}`;
      })
    } else { 
      map_category = '';
    }

    const response = yield call(
      api.get, 
      `?name=${search}${map_category}`
    );
 
    if(response.data.recipes.next_page_url !== null) {
      setHasMore(true)
    } else if (response.data.recipes.next_page_url == null) {
      setHasMore(false)
    }

    yield put(getRecipeSuccess(response.data));
  } catch (err) {
  }
}

export function* getMoreRecipe({ 
  payload,
  setHasMore
}) {
  try {
    const { next_page_url, search, categoryFilter } = payload;
    let map_category = '';

    if(categoryFilter.length > 0) {
      categoryFilter.forEach((item) => {
        map_category += `&category_id[]=${item.id}`;
      })
    } else { 
      map_category = '';
    }

    const response = yield call(
      axios.get, 
      `${next_page_url}&name=${search}${map_category}`
    );

    if(response.data.recipes.next_page_url === null) {
      setHasMore(false)
    }

    yield put(getMoreRecipeSuccess(response.data));

  } catch (err) {
  }
}

export function* showRecipe({
  payload
}) {
  try {
    const { id } = payload;

    const response = yield call(
      api.get, 
      `recipe/${id}`
    );

    yield put(showRecipeSuccess(response.data));

  } catch( err) {
  }
}

export default all([
  takeLatest('@homeRecipe/GET_RECIPE_REQUEST', getRecipe),
  takeLatest('@homeRecipe/GET_MORE_RECIPE_REQUEST', getMoreRecipe),
  takeLatest('@homeRecipe/SHOW_RECIPE_REQUEST', showRecipe),
])