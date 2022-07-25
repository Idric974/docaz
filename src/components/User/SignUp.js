/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from 'react';
import styles from './SignUp.module.css';
import {
  collection,
  addDoc,
  doc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  storage,
  getStorage,
} from 'firebase/storage';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '../../../firebase/firebase';

const SignUp = () => {
  //

  //! les variables.

  let data;
  let uid;
  let date = new Date().getTime();
  let photoURL;
  let imageUrl;
  let userImageFileName;

  //! -------------------------------------------------

  //! Les constantes.

  const storage = getStorage();

  //! -------------------------------------------------

  //! Logique pour la gestion de l'image.

  const [imageUpload, setimageUpload] = useState(null);
  const [postPicture, setPostPicture] = useState(null);

  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0])); //* Prévisualisation.
    setimageUpload(e.target.files[0]); //* upload.
  };

  //! -------------------------------------------------

  //! Logique pour la création d'un utiliateur.

  //? les fonctions.

  //* Création de l'image.

  function imageCreator() {
    return new Promise((resolve, reject) => {
      let imageRef;

      if (imageUpload == null) {
        imageRef = ref(storage, `images/${'avatar' + date}`);
      } else {
        imageRef = ref(storage, `images/${imageUpload.name + date}`);
      }

      uploadBytes(imageRef, imageUpload)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            //
            userImageFileName = snapshot.ref._location.path_;

            // console.log(
            //   '✅ %c SUCCÈS Create post ==> Création de la nouvelle image de l’utilisateur réussie :',
            //   'color: green',
            //   url
            // );

            photoURL = url;
            resolve();
          });
        })
        .catch((error) => {
          console.log(
            '❌ %c ERREUR Create post ==> Création de la nouvelle image de l’utilisateur échouée :',
            'color: orange',
            error
          );

          reject();
        });
    });
  }

  //* -------------------------------------------------

  //* Création de l'utilisateur pour son authentification.

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const auth = getAuth();

  function authCreator() {
    return new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userAuth) => {
          uid = userAuth.user.auth.currentUser.auth.currentUser.uid;

          // console.log(
          //   "✅ %c SUCCÈS Create post ==> Création de l'utilisateur pour son authentification réussie : ",
          //   'color: green',
          //   uid
          // );

          resolve();
        })
        .catch((e) => {
          console.log(
            '❌ %c CATCH ERREUR SignUp ==> uid généré pour authentification :',
            'color: orange',
            e
          );
          reject();
        });
    });
  }

  //* -------------------------------------------------

  //* Transmission des données.

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [phone, setPhone] = useState('');
  const [town, setTown] = useState('');

  function submitData() {
    return new Promise((resolve, reject) => {
      if (imageUpload == null) {
        setDoc(doc(db, 'users', uid), {
          userId: uid,
          firstName,
          lastName,
          userName,
          phone,
          town,
          email,
          userImageFileName,
          photoURL:
            'https://firebasestorage.googleapis.com/v0/b/docaz-cb118.appspot.com/o/images%2FAvatar%2FpersonaDocaz.jpg?alt=media&token=dedeb9f7-c9b4-41e6-bc7e-2dc45d233230',
          timestamp: serverTimestamp(),
        })
          .then((data) => {
            // console.log(
            //   '✅ %c SUCCÈS Create post ==> Transmission des données : ',
            //   'color: green'
            // );

            resolve();
          })
          .catch((e) => {
            console.log('ERREUR data : ', e);
            console.log(
              '❌ %c CATCH ERREUR SignUp ==> Transmission des données :',
              'color: orange',
              e
            );
            reject;
          });
      } else {
        setDoc(doc(db, 'users', uid), {
          userId: uid,
          firstName,
          lastName,
          userName,
          phone,
          town,
          email,
          userImageFileName,
          photoURL,
          timestamp: serverTimestamp(),
        })
          .then(() => {
            // console.log('data : ', data);
            resolve();
          })
          .catch((e) => {
            console.log('ERREUR data : ', e);
            reject;
          });
      }
    });
  }

  //* -------------------------------------------------

  //* Retour à l'accueil.

  function backHome() {
    return new Promise((resolve, reject) => {
      if (imageUpload == null) {
        window.location = '/';
        resolve();
      } else {
        console.log(
          "❌ %c ERREUR UpdateProfile ==> Retour à l'accueil",
          'color: orange'
        );

        reject();
      }
    });
  }

  //* -------------------------------------------------

  //? Exécution des fonctions.

  async function handleRegister(e) {
    e.preventDefault();

    try {
      //

      await imageCreator();

      await authCreator();

      await submitData();

      // await backHome();

      //
    } catch (err) {
      //
      console.log('err :', err);
    }
  }

  //? -------------------------------------------------

  return (
    <div className={styles.box}>
      <form onSubmit={(e) => handleRegister(e)}>
        {/* '' */}

        <div className={styles.formInput}>
          <label className={styles.formInputLabel}>Prénom</label>
          <div className={styles.formInputBox}>
            <input
              type="text"
              required
              onChange={(e) => setFirstName(e.target.value)}
              // value={firstName}
            />
          </div>
        </div>

        <div className={styles.formInput}>
          <label className={styles.formInputLabel}>Nom</label>
          <div className={styles.formInputBox}>
            <input
              type="text"
              required
              onChange={(e) => setLastName(e.target.value)}
              // value={lastName}
            />
          </div>
        </div>

        <div className={styles.formInput}>
          <label className={styles.formInputLabel}>Nom d’utilisateur</label>
          <div className={styles.formInputBox}>
            <input
              type="text"
              required
              onChange={(e) => setUserName(e.target.value)}
              // value={userName}
            />
          </div>
        </div>

        <div className={styles.formInput}>
          <label className={styles.formInputLabel}>Téléphone</label>
          <div className={styles.formInputBox}>
            <input
              type="tel"
              required
              onChange={(e) => setPhone(e.target.value)}
              // value={phone}
            />
          </div>
        </div>

        <div className={styles.formInput}>
          <label className={styles.formInputLabel}>Ville</label>
          <div className={styles.formInputBox}>
            <input
              type="text"
              required
              onChange={(e) => setTown(e.target.value)}
              // value={town}
            />
          </div>
        </div>

        <div className={styles.formInput}>
          <label className={styles.formInputLabel}>Email</label>
          <div className={styles.formInputBox}>
            <input
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              // value={email}
            />
          </div>
        </div>

        <div className={styles.formInput}>
          <label className={styles.formInputLabel}>Mot de passe</label>
          <div className={styles.formInputBox}>
            <input
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              // value={password}
            />
          </div>
        </div>

        {/* <div className={styles.formInputImage}>
          <label className={styles.formInputLabel} htmlFor="inputfile">
            Votre image de profil
          </label>
          <div className={styles.formInputBox}>
            <input
              className={styles.inputImage}
              type="file"
              id="inputfile"
              accept=".jpg, .jpeg, .png"
              onChange={(e) => handlePicture(e)}
            />
          </div>
        </div> */}

        <div className={styles.inputImageBox}>
          <label className={styles.inputImageLabel} htmlFor="inputfile">
            Télécharger une photo
          </label>
          <input
            className={styles.inputImage}
            type="file"
            id="inputfile"
            name="file"
            accept=".jpg, .jpeg, .png"
            onChange={(e) => handlePicture(e)}
          />
        </div>

        {/** Image de l'article **/}
        <div className={styles.prewieuImageBox}>
          <div>
            <img className={styles.prewieuImage} src={postPicture} alt="" />
          </div>
        </div>

        <div className={styles.formInputButtonBox}>
          <input
            className={styles.formInputButton}
            type="submit"
            value="Valider inscription"
          />
        </div>
      </form>
    </div>
  );
};

export default SignUp;
