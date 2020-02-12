import { combineReducers } from 'redux';

import homeRecipe from './recipe/reducer';
import auth from './auth/reducer';
import recipe from './admin/recipe/reducer';
import category from './admin/category/reducer';
import ingredient from './admin/ingredient/reducer';
import user from './admin/user/reducer';
import permission from './admin/permission/reducer';
import role from './admin/role/reducer';

export default combineReducers({
  homeRecipe,
  auth,
  recipe,
  category,
  ingredient,
  user,
  permission,
  role,
});