import axios from 'axios';
import {
  collection,
  doc,
  query,
  where,
  getDocs,
  getDoc,
  orderBy,
} from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../../firebase/firebase';

export const CREATE_USER = 'CREATE_USER';
export const READ_USER = 'READ_USER';
export const READ_USER2 = 'READ_USER2';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';
export const READ_USERS_POSTS = 'READ_USERS_POSTS';

//! Logique pour récupérer le uid de l'utilisateur connecté.

//! Logique pour afficher l'utilisateur connecté.

let userData;

export const readUser = (firebaseUi) => {
  return async (dispatch) => {
    if (firebaseUi) {
      const docRef = doc(db, 'users', firebaseUi);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // console.log('Document data:', docSnap.data());

        dispatch({ type: READ_USER, payload: docSnap.data() });
      } else {
        console.log('No such document!');
      }
    }
  };
};

//! -------------------------------------------------

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

//! Logique pour la mise à jour d'un nouvel utilisateur.

export const updateLogedUser = (data, uid) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ANALYTICS_URL}api/user/updateOneUser/` + uid,
        data
      );

      // console.log(
      //   "%c ✅ SUCCÈS : userCRUD.actions ==> UPDATE_USER ==> Mise à jour d'un utilisateur :",
      //   'color: green',
      //   res.data
      // );

      dispatch({ type: UPDATE_USER, payload: res.data });
    } catch (err) {
      return console.log(
        "%c ❌ ERREUR : userCRUD.actions ==> UPDATE_USER ==> création d'un utilisateur :",
        'color: red',
        err
      );
    }
  };
};

//! -------------------------------------------------

//! Logique pour la suppression d'un utilisateur.

export const deleteOneUser = (uid) => {
  // console.log('TEST');
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ANALYTICS_URL}api/user/deleteOneUser/` + uid
      );

      // console.log(
      //   "%c ✅ SUCCÈS : userCRUD.actions ==> DELETE_USER ==> supression d'un utilisateur :",
      //   'color: green',
      //   res.data
      // );

      dispatch({ type: DELETE_USER, payload: res.data });

      window.location = '/';
    } catch (err) {
      return console.log(
        "%c ❌ ERREUR : userCRUD.actions ==> DELETE_USER ==> supression d'un utilisateur :",
        'color: red',
        err
      );
    }
  };
};

//! -------------------------------------------------
