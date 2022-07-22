import { initializeApp, getApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getAuth, onAuthStateChanged, getRedirectResult } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; //? ===> Cloud Firestore.

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_APPID,
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
