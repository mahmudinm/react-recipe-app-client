import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from "utils/api";
import history from "utils/history";

import { loginSuccess, loginFailure } from './actions';

export function* login({ value }) {
  try {
    const { email, password } = value;

    const response = yield call(api.post, 'auth/login', {
      email,
      password
    })

    const { token } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(loginSuccess(token));

    history.push('/admin/category');
  } catch (err) {
    // if (err.status === 400)
    yield put(loginFailure());
  }
}

export function setToken({ payload }) {
  if(!payload) return;

  const { token } = payload.auth;

  if(token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function logout() {
  history.push('/auth/login');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('LOGIN_REQUEST', login),
  takeLatest('LOGOUT', logout),
])