import { combineReducers } from 'redux';
import userCRUDReducer from './userCRUD.reducer';
import postReducer from './post.reducer';

export default combineReducers({
  postReducer,
  userCRUDReducer,
});
