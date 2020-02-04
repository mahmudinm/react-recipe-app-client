import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from "utils/api";

import { 
  getPermissionRequest,
  getPermissionSuccess,
  storePermissionSuccess,
  editPermissionSuccess,
  updatePermissionSuccess,
  deletePermissionSuccess
} from './actions';

// Fetch DATA
export function* getPermission() {
  try {
    const response = yield call(
      api.get, 
      'admin/permissions'
    )

    const ingredients = response.data;
    
    yield put(getPermissionSuccess(ingredients))
  } catch (err) {
    console.log(err);
  }
}

// Store/SAVE DATA
export function* storePermission({
  payload,
  meta: { setSubmitting },
  toggle
}) {
  try {
    const { name } = payload; 

    const response = yield call(api.post, 'admin/permissions', {
      name
    });

    yield put(storePermissionSuccess(response.data)) // ketika telah di save maka akan fetch ulang secara sync
    yield put(getPermissionRequest()) // ketika telah di save maka akan fetch ulang secara async
    toast.success('Berhasil tambah data'); 
    toggle(); // tutup modal ketika telah berhasil di save
  } catch (err) {
    toast.error('Gagal tambah data'); 
    setSubmitting(false); // setSubmit false pada form supaya enable setelah terima error
  }
}

// Edit data / ambil data dari edit url
export function* editPermission({ payload }) { // payload ini id dari tombol/button edit 
  try {
    const response = yield call(
      api.get, 
      `admin/permissions/${payload}/edit`
    )

    yield put(editPermissionSuccess(response.data)); // taruh data ke form ketika success fetch edit data
  } catch (err) {
    toast.error('Data tak di temukan'); 
  }
}

// Update data 
export function* updatePermission({
  payload,
  id,
  meta: { setSubmitting },
  toggle
}) {
  try {
    const { id, name } = payload;

    const response = yield call(api.post, `admin/permissions/${id}`, {
      name,
      _method: 'PATCH' // untuk laravel ketika memakai resource route harus memakai untuk update (_method: PATCH/PUT)
    })

    yield put(updatePermissionSuccess(response.data)) // ketika telah di update maka akan fetch ulang secara sync
    yield put(getPermissionRequest()) // ketika telah di update maka akan fetch ulang secara async
    toast.success('Berhasil update data'); 
    toggle(); // tutup modal ketika telah berhasil di update
  } catch (err) {
    toast.error('Gagal update data'); 
    setSubmitting(false);
  }
}

// Delete Data
export function* deletePermission({ payload }) { // payload ini id
  try {
    yield put(deletePermissionSuccess(payload)); // update list data /sync data ketika telah berhasil secara langsung

    // const response = yield call(api.post, `admin/permissions/${payload}`, {
    yield call(api.post, `admin/permissions/${payload}`, {
      _method: 'DELETE' // ini method untuk laravel resource route untuk delete
    })

    // yield put(deletePermissionSuccess(response.data)); // update list data /sync data ketika telah berhasil menunggu hasil response
    yield put(getPermissionRequest()) // ketika telah di update maka akan fetch ulang secara async
    toast.success('Berhasil delete data'); 
  } catch (err) {
    toast.error('Gagal delete data'); 
  }
}

export default all([
  takeLatest('GET_PERMISSION_REQUEST', getPermission),
  takeLatest('STORE_PERMISSION_REQUEST', storePermission),
  takeLatest('EDIT_PERMISSION_REQUEST', editPermission),
  takeLatest('UPDATE_PERMISSION_REQUEST', updatePermission),
  takeLatest('DELETE_PERMISSION_REQUEST', deletePermission)
])