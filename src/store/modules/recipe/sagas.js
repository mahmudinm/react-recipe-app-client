import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from "utils/api";
import axios from 'axios';

import { 
  getRecipeSuccess,
  getMoreRecipeSuccess,
} from './actions';

export function* getRecipe({ 
  payload,
  setHasMore
}) {
  try {
    const { search, category_id } = payload;
    let check_category_id ;
    let map_category = '';

    if(category_id.length > 0) {
      category_id.map((item) => {
        map_category += `&category_id[]=${item}`;
      })
    } else { 
      map_category = '';
    }

    console.log(map_category);

    const response = yield call(
      api.get, 
      `?name=${search}${map_category}`
    );
 
    if(response.data.next_page_url !== null) {
      setHasMore(true)
    }

    yield put(getRecipeSuccess(response.data));
  } catch (err) {
  } finally {
  }
}

export function* getMoreRecipe({ 
  payload,
  setHasMore
}) {
  try {
    const { next_page_url, search, category_id } = payload;
    let check_category_id ;
    let map_category = '';

    if(category_id.length > 0) {
      category_id.map((item) => {
        map_category += `&category_id[]=${item}`;
      })
    } else { 
      map_category = '';
    }
    
    const response = yield call(
      axios.get, 
      `${next_page_url}&search=${search}${map_category}`
    );

    if(response.data.next_page_url === null) {
      setHasMore(false)
    }

    yield put(getMoreRecipeSuccess(response.data));

  } catch (err) {
  } finally {
  }
}

export default all([
  takeLatest('@homeRecipe/GET_RECIPE_REQUEST', getRecipe),
  takeLatest('@homeRecipe/GET_MORE_RECIPE_REQUEST', getMoreRecipe),
])