import axios from 'axios';

export const ADD_POST = 'ADD_POST';
export const READ_ALL_POSTS = 'READ_ALL_POSTS';

export const addPost = (data) => {
  return async (dispatch) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_ANALYTICS_URL}`, data);
      dispatch({ type: ADD_POST, payload: data });
    } catch (err) {
      return console.log(err);
    }
  };
};

//! Logique pour la récupération des posts.

export const readAllPost = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_ANALYTICS_URL}api/post/readAllPosts`
      );

      console.log(
        '%c ✅ SUCCÈS posts.action ===> READ_ALL_POSTS ===> Liste de tous les posts :',
        'color: green',
        res.data
      );

      dispatch({ type: READ_ALL_POSTS, payload: res.data });
    } catch (err) {
      return console.log(
        '%c ❌ ERREUR : posts.action ===> READ_ALL_POSTS ===> Liste de tous les posts :',
        'color: red',
        err
      );
    }
  };
};

//! -------------------------------------------------
