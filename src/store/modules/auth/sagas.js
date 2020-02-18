import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from "utils/api";
import history from "utils/history";

import { loginSuccess, loginFailure } from './actions';

export function* login({ 
  payload,
  meta: { setSubmitting, setStatus }
}) {
  try {
    const { email, password } = payload

    const response = yield call(api.post, 'auth/login', {
      email,
      password
    })

    const { token } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(loginSuccess(token));

    setStatus();

    // masalah unmount memory leak pada formik | bukan cara yang bagus tapi bisa jalan
    setTimeout(() => {
      history.push('/admin/recipe');
    }, 100);

  } catch (err) {

    setStatus("Email atau Password Salah");
    yield put(loginFailure());
    setSubmitting(false);

  } finally {
    setSubmitting(false);
  }
}

export function logout() {
  history.push('/auth/login');
}

export function setToken({ payload }) {
  if(!payload) return;

  const { token } = payload.auth;

  if(token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('LOGIN_REQUEST', login),
  takeLatest('LOGOUT', logout),
])