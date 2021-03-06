import { combineReducers } from 'redux';

import auth from './auth';
import manageUserReducer from './manageUserReducer'
import manageEventReducer from './manageEventReducer'
import spaceQueriesReducer from './spaceQueriesReducer'
import manageAccountReducer from './manageAccountReducer'

const reducers = combineReducers({
  auth,
  manageUserReducer,
  manageEventReducer,
  spaceQueriesReducer,
  manageAccountReducer,
});

export default reducers;