import axios from 'axios';

export const GET_USER = 'GET_USER';

export const getUser = (firebaseUi) => {
  console.log('********** ', firebaseUi);
  let uid = firebaseUi;
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_ANALYTICS_URL}api/user/getUser/${uid}`
      );
      dispatch({ type: GET_USER, payload: res.data });
    } catch (err) {
      return console.log(err);
    }
  };
};
