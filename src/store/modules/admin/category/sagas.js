import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from "utils/api";

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
    toast.success('Berhasil tambah data'); 
    toggle(); // tutup modal ketika telah berhasil di save
  } catch (err) {
    toast.error('Gagal tambah data'); 
    setSubmitting(false); // setSubmit false pada form supaya enable setelah terima error
  }
}

// Edit data / ambil data dari edit url
export function* editCategory({ payload }) { // payload ini id dari tombol/button edit 
  try {
    const response = yield call(
      api.get, 
      `admin/category/${payload}/edit`
    )

    yield put(editCategorySuccess(response.data)); // taruh data ke form ketika success fetch edit data
  } catch (err) {
    toast.error('Data tak di temukan'); 
  }
}

// Update data 
export function* updateCategory({
  payload,
  id,
  meta: { setSubmitting },
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
    toast.success('Berhasil update data'); 
    toggle(); // tutup modal ketika telah berhasil di update
  } catch (err) {
    toast.error('Gagal update data'); 
    setSubmitting(false);
  }
}

// Delete Data
export function* deleteCategory({ payload }) { // payload ini id
  try {
    yield put(deleteCategorySuccess(payload)); // update list data /sync data ketika telah berhasil secara langsung

    // const response = yield call(api.post, `admin/category/${payload}`, {
    yield call(api.post, `admin/category/${payload}`, {
      _method: 'DELETE' // ini method untuk laravel resource route untuk delete
    })

    // yield put(deleteCategorySuccess(response.data)); // update list data /sync data ketika telah berhasil menunggu hasil response
    yield put(getCategoryRequest()) // ketika telah di update maka akan fetch ulang secara async
    toast.success('Berhasil delete data'); 
  } catch (err) {
    toast.error('Gagal delete data'); 
  }
}

export default all([
  takeLatest('GET_CATEGORY_REQUEST', getCategory),
  takeLatest('STORE_CATEGORY_REQUEST', storeCategory),
  takeLatest('EDIT_CATEGORY_REQUEST', editCategory),
  takeLatest('UPDATE_CATEGORY_REQUEST', updateCategory),
  takeLatest('DELETE_CATEGORY_REQUEST', deleteCategory)
])