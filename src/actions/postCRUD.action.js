import axios from 'axios';

export const ADD_POST = 'ADD_POST';
export const READ_ALL_POSTS = 'READ_ALL_POSTS';
export const READ_USERS_POSTS = 'READ_ALL_POSTS';

export const addPost = (data) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ANALYTICS_URL}api/post/`,
        data
      );

      // console.log(
      //   "%c ✅ SUCCÈS : post.action ==> ADD_POST ==> création d'un post ==> post Id :",
      //   'color: green',
      //   res.data._path.segments[1]
      // );

      dispatch({ type: ADD_POST, payload: data });
    } catch (err) {
      return console.log(
        "%c ❌ ERREUR : post.action ==> ADD_POST ==> création d'un post :",
        'color: red',
        err
      );
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

      // console.log(
      //   '%c ✅ SUCCÈS posts.action ===> READ_ALL_POSTS ===> Liste de tous les posts :',
      //   'color: green',
      //   res.data
      // );

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

//! Logique pour la lecture des posts de l'utilisateur connecté.

export const readUsersPost = (uid) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_ANALYTICS_URL}api/post/readUsersPost/` + uid
      );

      // console.log(
      //   "%c ✅ SUCCÈS posts.action ===> READ_USERS_POSTS ===> Liste de tous les posts de l'utilisateur connecté: ",
      //   'color: green',
      //   res.data
      // );

      dispatch({ type: READ_USERS_POSTS, payload: res.data });
    } catch (err) {
      return console.log(
        "%c ❌ ERREUR : posts.action ===> READ_USERS_POSTS ===> Liste de tous les posts de l'utilisateur connecté: ",
        'color: red',
        err
      );
    }
  };
};

//! -------------------------------------------------