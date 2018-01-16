// @flow
import { combineReducers } from 'redux';

import navigation from './navigation';
import example from './example';
import users from './users';
import auth from './auth';

export default combineReducers({
  navigation,
  example,
  users,
  auth,
});
