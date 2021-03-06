import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from "utils/api";

import { 
  getIngredientRequest,
  getIngredientSuccess,
  storeIngredientSuccess,
  editIngredientSuccess,
  updateIngredientSuccess,
  deleteIngredientSuccess
} from './actions';

// Fetch DATA
export function* getIngredient() {
  try {
    const response = yield call(
      api.get, 
      'admin/ingredient'
    )

    const ingredients = response.data;
    
    yield put(getIngredientSuccess(ingredients))
  } catch (err) {
    console.log(err);
  }
}

// Store/SAVE DATA
export function* storeIngredient({
  payload,
  meta: { setSubmitting },
  toggle
}) {
  try {
    const { name } = payload; 

    const response = yield call(api.post, 'admin/ingredient', {
      name
    });

    yield put(storeIngredientSuccess(response.data)) // ketika telah di save maka akan fetch ulang secara sync
    yield put(getIngredientRequest()) // ketika telah di save maka akan fetch ulang secara async
    toast.success('Berhasil tambah data'); 
    toggle(); // tutup modal ketika telah berhasil di save
  } catch (err) {
    toast.error('Gagal tambah data'); 
    setSubmitting(false); // setSubmit false pada form supaya enable setelah terima error
  }
}

// Edit data / ambil data dari edit url
export function* editIngredient({ payload }) { // payload ini id dari tombol/button edit 
  try {
    const response = yield call(
      api.get, 
      `admin/ingredient/${payload}/edit`
    )

    yield put(editIngredientSuccess(response.data)); // taruh data ke form ketika success fetch edit data
  } catch (err) {
    toast.error('Data tak di temukan'); 
  }
}

// Update data 
export function* updateIngredient({
  payload,
  id,
  meta: { setSubmitting },
  toggle
}) {
  try {
    const { id, name } = payload;

    const response = yield call(api.post, `admin/ingredient/${id}`, {
      name,
      _method: 'PATCH' // untuk laravel ketika memakai resource route harus memakai untuk update (_method: PATCH/PUT)
    })

    yield put(updateIngredientSuccess(response.data)) // ketika telah di update maka akan fetch ulang secara sync
    yield put(getIngredientRequest()) // ketika telah di update maka akan fetch ulang secara async
    toast.success('Berhasil update data'); 
    toggle(); // tutup modal ketika telah berhasil di update
  } catch (err) {
    toast.error('Gagal update data'); 
    setSubmitting(false);
  }
}

// Delete Data
export function* deleteIngredient({ payload }) { // payload ini id
  try {
    yield put(deleteIngredientSuccess(payload)); // update list data /sync data ketika telah berhasil secara langsung

    // const response = yield call(api.post, `admin/ingredient/${payload}`, {
    yield call(api.post, `admin/ingredient/${payload}`, {
      _method: 'DELETE' // ini method untuk laravel resource route untuk delete
    })

    // yield put(deleteIngredientSuccess(response.data)); // update list data /sync data ketika telah berhasil menunggu hasil response
    yield put(getIngredientRequest()) // ketika telah di update maka akan fetch ulang secara async
    toast.success('Berhasil delete data'); 
  } catch (err) {
    toast.error('Gagal delete data'); 
  }
}

export default all([
  takeLatest('GET_INGREDIENT_REQUEST', getIngredient),
  takeLatest('STORE_INGREDIENT_REQUEST', storeIngredient),
  takeLatest('EDIT_INGREDIENT_REQUEST', editIngredient),
  takeLatest('UPDATE_INGREDIENT_REQUEST', updateIngredient),
  takeLatest('DELETE_INGREDIENT_REQUEST', deleteIngredient)
])