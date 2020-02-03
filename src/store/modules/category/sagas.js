import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from "utils/api";
import history from "utils/history";

import { 
  getCategoryRequest,
  getCategorySuccess,
  storeCategorySuccess,
  updateCategory,
  removeCategory
} from './actions';

// Fetch DATA
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

// Store/SAVE DATA
export function* storeCategory({
  payload,
  meta: { setSubmitting },
  toggle
}) {
  try {
    const { name } = payload; 

    const response = yield call(api.post, 'admin/category', {
      name
    });

    yield put(storeCategorySuccess(response.data)) // ketika telah di save maka akan fetch ulang secara sync
    yield put(getCategoryRequest()) // ketika telah di save maka akan fetch ulang secara async
    toggle(); // tutup modal ketika telah berhasil di save

  } catch (err) {

    setSubmitting(false); // setSubmit false pada form supaya enable setelah terima error
  }
}

export default all([
  takeLatest('GET_CATEGORY_REQUEST', getCategory),
  takeLatest('STORE_CATEGORY_REQUEST', storeCategory)
])