import { combineReducers } from 'redux';

import auth from './auth/reducer';
import category from './category/reducer';
import ingredient from './ingredient/reducer';
import permission from './permission/reducer';
import role from './role/reducer';

export default combineReducers({
  auth,
  category,
  ingredient,
  permission,
  role,
});