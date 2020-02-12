import { all } from 'redux-saga/effects';

import homeRecipe from './recipe/sagas';
import auth from './auth/sagas';
import recipe from './admin/recipe/sagas';
import category from './admin/category/sagas';
import ingredient from './admin/ingredient/sagas';
import user from './admin/user/sagas';
import permission from './admin/permission/sagas';
import role from './admin/role/sagas';

export default function* rootSaga() {
  return yield all([
    homeRecipe,
    auth,
    recipe,
    category,
    ingredient,
    user,
    permission,
    role,
  ]);
}