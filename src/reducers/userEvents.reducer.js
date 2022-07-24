import { READ_USERS_POSTS } from '../actions/userEvents.actions';

const initialState = {};

export default function userEventsReducer(state = initialState, action) {
  switch (action.type) {
    case READ_USERS_POSTS:
      return action.payload;

    default:
      return state;
  }
}
