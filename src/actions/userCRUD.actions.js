import axios from 'axios';

export const CREATE_USER = 'CREATE_USER';
export const READ_USER = 'READ_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USERS = 'DELETE_USERS';

//! Logique pour la création d'un nouvel utilisateur.

export const createUser = (data) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ANALYTICS_URL}api/user/`,
        data
      );

      // console.log(
      //   "%c ✅ SUCCÈS : userCRUD.actions ==> CREATE_USER ==> création d'un utilisateur :",
      //   'color: green',
      //   res.data
      // );

      dispatch({ type: CREATE_USER, payload: res.data });

      // window.location = '/';
    } catch (err) {
      return console.log(
        "%c ❌ ERREUR : userCRUD.actions ==> CREATE_USER ==> création d'un utilisateur :",
        'color: red',
        err
      );
    }
  };
};

//! -------------------------------------------------

//! Logique pour afficher l'utilisateur connecté.

export const readUser = (firebaseUi) => {
  // console.log('===========>', firebaseUi);
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_ANALYTICS_URL}api/user/readOneUser/` +
          firebaseUi
      );

      // console.log(
      //   "✅ %c SUCCÈS userCRUD.actions ==> READ_USER ==> afficher l'utilisateur connecté :",
      //   'color: red',
      //   res.data
      // );

      dispatch({ type: READ_USER, payload: res.data });
    } catch (err) {
      return console.log(
        "❌ %c ERREUR : userCRUD.actions ==> READ_USER ==> afficher l'utilisateur connecté :",
        'color : red',
        err
      );
    }
  };
};

//! -------------------------------------------------
