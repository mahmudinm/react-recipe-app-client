import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from "utils/api";
import history from "utils/history";

import { 
  getCategoryRequest,
  getCategorySuccess,
  storeCategorySuccess,
  editCategorySuccess,
  updateCategorySuccess,
  deleteCategorySuccess
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

// Edit data / ambil data dari edit url
export function* editCategory({
  payload, // ini id dari tombol/button edit
}) {
  try {

    const response = yield call(
      api.get, 
      `admin/category/${payload}/edit`
    )

    yield put(editCategorySuccess(response.data));

  } catch (err) {

  }
}

// Update data 
export function* updateCategory({
  payload,
  id,
  meta: setSubmitting,
  toggle
}) {
  try {
    const { id, name } = payload;

    const response = yield call(api.post, `admin/category/${id}`, {
      name,
      _method: 'PATCH' // untuk laravel ketika memakai resource route harus memakai untuk update (_method: PATCH/PUT)
    })

    yield put(updateCategorySuccess(response.data)) // ketika telah di update maka akan fetch ulang secara sync
    yield put(getCategoryRequest()) // ketika telah di update maka akan fetch ulang secara async
    toggle(); // tutup modal ketika telah berhasil di update

  } catch (err) {
    setSubmitting(false);
  }
}

export function* deleteCategory({
  payload // ini id
}) {
  try {

    const response = yield call(api.post, `admin/category/${payload}`, {
      _method: 'DELETE'
    })

    yield put(deleteCategorySuccess(response.data)); // update list data /sync data ketika telah berhasil
    yield put(getCategoryRequest()) // ketika telah di update maka akan fetch ulang secara async


  } catch (err) {

  }
}

export default all([
  takeLatest('GET_CATEGORY_REQUEST', getCategory),
  takeLatest('STORE_CATEGORY_REQUEST', storeCategory),
  takeLatest('EDIT_CATEGORY_REQUEST', editCategory),
  takeLatest('UPDATE_CATEGORY_REQUEST', updateCategory),
  takeLatest('DELETE_CATEGORY_REQUEST', deleteCategory)
])