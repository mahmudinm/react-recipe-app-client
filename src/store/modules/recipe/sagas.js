import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from "utils/api";

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
  setIsFetching
}) {
  try {
    const response = yield call(api.get, `/?page=${payload}`);
    console.log(response);
    yield put(getMoreRecipeSuccess(response.data));
    setIsFetching(false);
  } catch (err) {
  } finally {
  }
}


export default all([
  takeLatest('@homeRecipe/GET_RECIPE_REQUEST', getRecipe),
  takeLatest('@homeRecipe/GET_MORE_RECIPE_REQUEST', getMoreRecipe),
])