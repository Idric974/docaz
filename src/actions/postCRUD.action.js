import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import db from '../../utils/firebase';

export const ADD_POST = 'ADD_POST';
export const READ_ALL_POSTS = 'READ_ALL_POSTS';
export const READ_USERS_POSTS = 'READ_ALL_POSTS';
export const UPDATE_POST = 'UPDATE_POST';
export const DELETE_POST = 'DELETE_POST';

//! Logique pour la récupération des posts.

let data;

export const readAllPost = () => {
  return async (dispatch) => {
    try {
      const querySnapshot = await getDocs(
        collection(db, 'posts'),
        orderBy('postDate', 'desc')
      );

      let product = [];

      querySnapshot.forEach((doc) => {
        product.push(
          (data = {
            brand: doc.data().brand,
            description: doc.data().description,
            imageUrl: doc.data().imageUrl,
            userImageFileName: doc.data().userImageFileName,
            model: doc.data().model,
            articleName: doc.data().articleName,
            photoURL: doc.data().photoURL,
            postDate: doc.data().postDate,
            town: doc.data().town,
            price: doc.data().price,
            uid: doc.data().uid,
            userName: doc.data().userName,
            postId: doc.id,
          })
        );

        // console.log('All posts :', product);

        dispatch({
          type: READ_ALL_POSTS,
          payload: product,
        });
      });
    } catch (err) {
      return console.log(
        '%c ❌ ERREUR : post.action ==> READ_ALL_POSTS ==> Afficher tous les posts :',
        'color: orange',
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
      const q = query(collection(db, 'posts'), where('uid', '==', uid));

      const querySnapshot = await getDocs(q);

      let product = [];
      let data;
      querySnapshot.forEach((doc) => {
        product.push(
          (data = {
            brand: doc.data().brand,
            description: doc.data().description,
            imageUrl: doc.data().imageUrl,
            model: doc.data().model,
            articleName: doc.data().articleName,
            photoURL: doc.data().photoURL,
            postDate: doc.data().postDate,
            town: doc.data().town,
            price: doc.data().price,
            uid: doc.data().uid,
            userName: doc.data().userName,
            postId: doc.id,
          })
        );

        // console.log(
        //   "%c✅ SUCCÈS : postCRUD.actions ==> READ_USERS_POSTS ==> Liste de tous les posts de l'utilisateur connecté :",
        //   'color: green',
        //   data
        // );

        dispatch({
          type: READ_USERS_POSTS,
          payload: product,
        });
      });
    } catch (err) {
      return console.log(
        "%c ❌ ERREUR : posts.action ===> READ_USERS_POSTS ===> Liste de tous les posts de l'utilisateur connecté : ",
        'color: orange',
        err
      );
    }
  };
};

//! -------------------------------------------------
