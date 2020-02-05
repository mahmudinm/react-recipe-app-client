import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from "utils/api";

import { 
  getRoleRequest,
  getRoleSuccess,
  createRoleSuccess,
  storeRoleSuccess,
  editRoleSuccess,
  updateRoleSuccess,
  deleteRoleSuccess
} from './actions';

// Fetch DATA
export function* getRole() {
  try {
    const response = yield call(
      api.get, 
      'admin/roles'
    )

    const ingredients = response.data;
    
    yield put(getRoleSuccess(ingredients))
  } catch (err) {
    toast.error('Server error');
  }
}

// Create Data / fecth data dari create data
export function* createRole() {
  try {
    const response = yield call(
      api.get, 
      'admin/roles/create'
    );

    const permissions = response.data

    yield put(createRoleSuccess(permissions));
  } catch (err) {
    toast.error('Ada masalah di server');
  }
}

// Store/SAVE DATA
export function* storeRole({
  payload,
  meta: { setSubmitting },
  toggle
}) {
  try {
    const { name, permissions } = payload; 

    const response = yield call(api.post, 'admin/roles', {
      name,
      permissions
    });

    yield put(storeRoleSuccess(response.data)) // ketika telah di save maka akan fetch ulang secara sync
    yield put(getRoleRequest()) // ketika telah di save maka akan fetch ulang secara async
    toast.success('Berhasil tambah data'); 
    toggle(); // tutup modal ketika telah berhasil di save
  } catch (err) {
    toast.error('Gagal tambah data'); 
    setSubmitting(false); // setSubmit false pada form supaya enable setelah terima error
  }
}

// Edit data / ambil data dari edit url
export function* editRole({ payload }) { // payload ini id dari tombol/button edit 
  try {
    const response = yield call(
      api.get, 
      `admin/roles/${payload}/edit`
    )

    yield put(editRoleSuccess(response.data)); // taruh data ke form ketika success fetch edit data
  } catch (err) {
    toast.error('Data tak di temukan'); 
  }
}

// Update data 
export function* updateRole({
  payload,
  id,
  meta: { setSubmitting },
  toggle
}) {
  try {
    const { id, name, permissions } = payload;

    const response = yield call(api.post, `admin/roles/${id}`, {
      name,
      permissions,
      _method: 'PATCH' // untuk laravel ketika memakai resource route harus memakai untuk update (_method: PATCH/PUT)
    })

    yield put(updateRoleSuccess(response.data)) // ketika telah di update maka akan fetch ulang secara sync
    yield put(getRoleRequest()) // ketika telah di update maka akan fetch ulang secara async
    toast.success('Berhasil update data'); 
    toggle(); // tutup modal ketika telah berhasil di update
  } catch (err) {
    toast.error('Gagal update data'); 
    setSubmitting(false);
  }
}

// Delete Data
export function* deleteRole({ payload }) { // payload ini id
  try {
    yield put(deleteRoleSuccess(payload)); // update list data /sync data ketika telah berhasil secara langsung

    // const response = yield call(api.post, `admin/roles/${payload}`, {
    yield call(api.post, `admin/roles/${payload}`, {
      _method: 'DELETE' // ini method untuk laravel resource route untuk delete
    })

    // yield put(deleteRoleSuccess(response.data)); // update list data /sync data ketika telah berhasil menunggu hasil response
    yield put(getRoleRequest()) // ketika telah di update maka akan fetch ulang secara async
    toast.success('Berhasil delete data'); 
  } catch (err) {
    toast.error('Gagal delete data'); 
  }
}

export default all([
  takeLatest('GET_ROLE_REQUEST', getRole),
  takeLatest('CREATE_ROLE_REQUEST', createRole),
  takeLatest('STORE_ROLE_REQUEST', storeRole),
  takeLatest('EDIT_ROLE_REQUEST', editRole),
  takeLatest('UPDATE_ROLE_REQUEST', updateRole),
  takeLatest('DELETE_ROLE_REQUEST', deleteRole)
])