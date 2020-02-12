import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from "utils/api";
import axios from 'axios';

import { 
  getRecipeSuccess,
  getMoreRecipeSuccess,
} from './actions';

export function* getRecipe({ 
  payload,
}) {
  try {
    const response = yield call(api.get, '/');
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
    const response = yield call(axios.get, payload);

    if(response.data.next_page_url === null) {
      setHasMore(false)
    }
    // / }
    yield put(getMoreRecipeSuccess(response.data));

  } catch (err) {
  } finally {
  }
}


export default all([
  takeLatest('@homeRecipe/GET_RECIPE_REQUEST', getRecipe),
  takeLatest('@homeRecipe/GET_MORE_RECIPE_REQUEST', getMoreRecipe),
])