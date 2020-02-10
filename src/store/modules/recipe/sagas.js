import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from "utils/api";

import { 
  getRecipeRequest,
  getRecipeSuccess,
  createRecipeSuccess,
  storeRecipeSuccess,
  editRecipeSuccess,
  updateRecipeSuccess,
  deleteRecipeSuccess
} from './actions';

// Fetch DATA
export function* getRecipe() {
  try {
    const response = yield call(
      api.get, 
      'admin/recipe'
    )

    const ingredients = response.data;
    
    yield put(getRecipeSuccess(ingredients))
  } catch (err) {
    toast.error('Server error');
  }
}

// Create atau open modal create recipe
export function* createRecipe() {
  try {
    const response = yield call(
      api.get,
      'admin/recipe/create'
    );

    const roles = response.data;

    yield put(createRecipeSuccess(roles));
  } catch (err) {
    toast.error('Ada masalah di server');
  }
}

// Store/SAVE DATA
export function* storeRecipe({
  payload,
  meta: { setSubmitting, setFieldError },
  toggle
}) {
  try {
    const { image, name, category_id, step, ingredients } = payload; 

    const formData = new FormData();
    formData.append('image', image);
    formData.append('name', name);
    formData.append('category_id', category_id);
    formData.append('step', step);
    formData.append('ingredients', JSON.stringify(ingredients));

    const response = yield call(api.post, 'admin/recipe', formData, {
      headers: { 
        'Content-Type': 'mutlipart/form-data' 
      }
    });

    yield put(storeRecipeSuccess(response.data)) // ketika telah di save maka akan fetch ulang secara sync
    yield put(getRecipeRequest()) // ketika telah di save maka akan fetch ulang secara async
    toast.success('Berhasil tambah data'); 
    toggle(); // tutup modal ketika telah berhasil di save
  } catch (err) {
    // setFieldError('email', err.response.data.error.errors.email);
    // toast.error('Gagal tambah data'); 
    setSubmitting(false); // setSubmit false pada form supaya enable setelah terima error
  }
}

// Edit data / ambil data dari edit url
export function* editRecipe({ payload }) { // payload ini id dari tombol/button edit 
  try {
    const response = yield call(
      api.get, 
      `admin/recipe/${payload}/edit`
    )

    yield put(editRecipeSuccess(response.data)); // taruh data ke form ketika success fetch edit data
  } catch (err) {
    toast.error('Data tak di temukan'); 
  }
}

// Update data 
export function* updateRecipe({
  payload,
  id,
  meta: { setSubmitting, setFieldError },
  toggle
}) {
  try {
    const { id, image, name, category_id, step, ingredients } = payload; 

    const formData = new FormData();
    formData.append('id', id);
    formData.append('image', image);
    formData.append('name', name);
    formData.append('category_id', category_id);
    formData.append('step', step);
    formData.append('ingredients', JSON.stringify(ingredients));
    formData.append('_method', 'PATCH');

    const response = yield call(api.post, `admin/recipe/${id}`, formData, {
      headers: { 
        'Content-Type': 'mutlipart/form-data' 
      }
    })

    yield put(updateRecipeSuccess(response.data)) // ketika telah di update maka akan fetch ulang secara sync
    yield put(getRecipeRequest()) // ketika telah di update maka akan fetch ulang secara async
    toast.success('Berhasil update data'); 
    toggle(); // tutup modal ketika telah berhasil di update
  } catch (err) {
    // setFieldError('email', err.response.data.error.errors.email);
    toast.error('Gagal update data'); 
    setSubmitting(false);
  }
}

// Delete Data
export function* deleteRecipe({ payload }) { // payload ini id
  try {
    yield put(deleteRecipeSuccess(payload)); // update list data /sync data ketika telah berhasil secara langsung

    // const response = yield call(api.post, `admin/recipe/${payload}`, {
    yield call(api.post, `admin/recipe/${payload}`, {
      _method: 'DELETE' // ini method untuk laravel resource route untuk delete
    })

    // yield put(deleteRecipeSuccess(response.data)); // update list data /sync data ketika telah berhasil menunggu hasil response
    yield put(getRecipeRequest()) // ketika telah di update maka akan fetch ulang secara async
    toast.success('Berhasil delete data'); 
  } catch (err) {
    toast.error('Gagal delete data'); 
  }
}

export default all([
  takeLatest('GET_RECIPE_REQUEST', getRecipe),
  takeLatest('CREATE_RECIPE_REQUEST', createRecipe),
  takeLatest('STORE_RECIPE_REQUEST', storeRecipe),
  takeLatest('EDIT_RECIPE_REQUEST', editRecipe),
  takeLatest('UPDATE_RECIPE_REQUEST', updateRecipe),
  takeLatest('DELETE_RECIPE_REQUEST', deleteRecipe)
])