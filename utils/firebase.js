import { initializeApp, getApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getAuth, onAuthStateChanged, getRedirectResult } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; //? ===> Cloud Firestore.

const firebaseConfig = {
  apiKey: 'AIzaSyBZi_qOc7fUfxakGhRk5ORTCMwEALM6eSE',
  authDomain: 'docaz-cb118.firebaseapp.com',
  projectId: 'docaz-cb118',
  storageBucket: 'docaz-cb118.appspot.com',
  messagingSenderId: '483761721917',
  appId: '483761721917',
};

//? Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);

//? -------------------------------------------------

//?  Exports.

export const storage = getStorage(firebaseApp);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
// export default db;

//? -------------------------------------------------
