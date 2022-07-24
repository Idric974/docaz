import axios from 'axios';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

export const READ_USERS_POSTS = 'READ_USERS_POSTS';

let userPostsData;

export const readUsersPost = (uid) => {
  return async (dispatch) => {
    try {
      const q = query(collection(db, 'posts'), where('uid', '==', uid));

      const querySnapshot = await getDocs(q);

      let userPosts = [];

      querySnapshot.forEach((doc) => {
        userPosts.push(
          (userPostsData = {
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
        //   "%c✅ SUCCÈS : postCRUD.actions ==> READ_USERS_POSTS ==> La liste de tous les posts de l'utilisateur connecté :",
        //   'color: green',
        //   userPosts
        // );

        dispatch({
          type: READ_USERS_POSTS,
          payload: userPosts,
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
