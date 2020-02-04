import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import category from './category/sagas';
import ingredient from './ingredient/sagas';
import permission from './permission/sagas';
import role from './role/sagas';

export default function* rootSaga() {
  return yield all([
    auth, 
    category,
    ingredient,
    permission,
    role,
  ]);
}