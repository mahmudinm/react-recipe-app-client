import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from "utils/api";
import history from "utils/history";

import { 
  getCategorySuccess,
  createCategory,
  updateCategory,
  removeCategory
} from './actions';

export function* getCategory() {
  try {
    
    const response = yield call(
      api.get, 
      'admin/category'
    )

    const categories = response.data;

    yield put(getCategorySuccess(categories))

  } catch (err) {
    console.log(err);
  }
}

export default all([
  takeLatest('GET_CATEGORY_REQUEST', getCategory)
])