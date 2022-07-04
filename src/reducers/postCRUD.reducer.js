import {
  ADD_POST,
  READ_ALL_POSTS,
  READ_USERS_POSTS,
} from '../actions/postCRUD.action';

const initialState = {};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_POST:
      return [action.payload, ...state];

    case READ_ALL_POSTS:
      return action.payload;

    case READ_USERS_POSTS:
      return action.payload;

    default:
      return state;
  }
}
