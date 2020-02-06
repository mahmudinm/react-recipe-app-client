import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from "utils/api";

import { 
  getUserRequest,
  getUserSuccess,
  createUserSuccess,
  storeUserSuccess,
  editUserSuccess,
  updateUserSuccess,
  deleteUserSuccess
} from './actions';

// Fetch DATA
export function* getUser() {
  try {
    const response = yield call(
      api.get, 
      'admin/users'
    )

    const ingredients = response.data;
    
    yield put(getUserSuccess(ingredients))
  } catch (err) {
    toast.error('Server error');
  }
}

export function* createUser() {
  try {
    const response = yield call(
      api.get,
      'admin/users/create'
    );

    const roles = response.data;

    yield put(createUserSuccess(roles));
  } catch (err) {
    toast.error('Ada masalah di server');
  }
}

// Store/SAVE DATA
export function* storeUser({
  payload,
  meta: { setSubmitting, setFieldError },
  toggle
}) {
  try {
    const { name, email, password, roles } = payload; 

    const response = yield call(api.post, 'admin/users', {
      name,
      email,
      password,
      roles
    });

    yield put(storeUserSuccess(response.data)) // ketika telah di save maka akan fetch ulang secara sync
    yield put(getUserRequest()) // ketika telah di save maka akan fetch ulang secara async
    toast.success('Berhasil tambah data'); 
    toggle(); // tutup modal ketika telah berhasil di save
  } catch (err) {
    setFieldError('email', err.response.data.error.errors.email);
    toast.error('Gagal tambah data'); 
    setSubmitting(false); // setSubmit false pada form supaya enable setelah terima error
  }
}

// Edit data / ambil data dari edit url
export function* editUser({ payload }) { // payload ini id dari tombol/button edit 
  try {
    const response = yield call(
      api.get, 
      `admin/users/${payload}/edit`
    )

    yield put(editUserSuccess(response.data)); // taruh data ke form ketika success fetch edit data
  } catch (err) {
    toast.error('Data tak di temukan'); 
  }
}

// Update data 
export function* updateUser({
  payload,
  id,
  meta: { setSubmitting, setFieldError },
  toggle
}) {
  try {
    const { id, name, email, password, roles } = payload;

    const response = yield call(api.post, `admin/users/${id}`, {
      name, 
      email, 
      password, 
      roles,
      _method: 'PATCH' // untuk laravel ketika memakai resource route harus memakai untuk update (_method: PATCH/PUT)
    })

    yield put(updateUserSuccess(response.data)) // ketika telah di update maka akan fetch ulang secara sync
    yield put(getUserRequest()) // ketika telah di update maka akan fetch ulang secara async
    toast.success('Berhasil update data'); 
    toggle(); // tutup modal ketika telah berhasil di update
  } catch (err) {
    setFieldError('email', err.response.data.error.errors.email);
    toast.error('Gagal update data'); 
    setSubmitting(false);
  }
}

// Delete Data
export function* deleteUser({ payload }) { // payload ini id
  try {
    yield put(deleteUserSuccess(payload)); // update list data /sync data ketika telah berhasil secara langsung

    // const response = yield call(api.post, `admin/users/${payload}`, {
    yield call(api.post, `admin/users/${payload}`, {
      _method: 'DELETE' // ini method untuk laravel resource route untuk delete
    })

    // yield put(deleteUserSuccess(response.data)); // update list data /sync data ketika telah berhasil menunggu hasil response
    yield put(getUserRequest()) // ketika telah di update maka akan fetch ulang secara async
    toast.success('Berhasil delete data'); 
  } catch (err) {
    toast.error('Gagal delete data'); 
  }
}

export default all([
  takeLatest('GET_USER_REQUEST', getUser),
  takeLatest('CREATE_USER_REQUEST', createUser),
  takeLatest('STORE_USER_REQUEST', storeUser),
  takeLatest('EDIT_USER_REQUEST', editUser),
  takeLatest('UPDATE_USER_REQUEST', updateUser),
  takeLatest('DELETE_USER_REQUEST', deleteUser)
])