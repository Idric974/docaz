import { ADD_POST, READ_ALL_POSTS } from '../actions/post.action';

const initialState = {};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_POST:
      return [action.payload, ...state];

    case READ_ALL_POSTS:
      return action.payload;

    default:
      return state;
  }
}
