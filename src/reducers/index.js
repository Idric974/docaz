import { combineReducers } from 'redux';
import userCRUDReducer from './userCRUD.reducer';
import postCRUDReducer from './postCRUD.reducer';
import userEventsReducer from './userEvents.reducer';

export default combineReducers({
  postCRUDReducer,
  userCRUDReducer,
  userEventsReducer,
});
