import { combineReducers } from 'redux';
import userCRUDReducer from './userCRUD.reducer';
import postCRUDReducer from './postCRUD.reducer';

export default combineReducers({
  postCRUDReducer,
  userCRUDReducer,
});
