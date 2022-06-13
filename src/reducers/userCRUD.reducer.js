import {
  CREATE_USER,
  READ_USER,
  DELETE_USER,
} from '../actions/userCRUD.actions';

const initialState = {};

export default function userCRUDReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_USER:
      return action.payload;

    case READ_USER:
      return action.payload;

    case DELETE_USER:
      return action.payload;

    default:
      return state;
  }
}
