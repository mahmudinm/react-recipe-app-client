import { combineReducers } from 'redux';

import auth from './auth/reducer';
import category from './category/reducer';
import ingredient from './ingredient/reducer';

export default combineReducers({
  auth,
  category,
  ingredient,
});