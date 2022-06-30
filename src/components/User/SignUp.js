/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from '../../../styles/SingUp.module.css';
import { createUser } from '../../actions/userCRUD.actions';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const SignUp = () => {
  //

  //! Les constantes.

  const dispatch = useDispatch();
  const auth = getAuth();

  //? Create user.

  const registerFirstName = useRef();
  const registerLastName = useRef();
  const registerUserName = useRef();
  const registerPhone = useRef();
  const registerTown = useRef();

  //? -------------------------------------------------

  //? Create user.

  const registerEmail = useRef();
  const registerPassword = useRef();

  //? -------------------------------------------------

  const [imageUpload, setimageUpload] = useState(null);
  const [postPicture, setPostPicture] = useState(null);

  //! -------------------------------------------------

  //! les variables.

  let data;
  let uid;
  let date = new Date().getTime();
  let photoURL;
  let userImageFileName;

  //! -------------------------------------------------

  //! Logique pour la gestion de l'image.

  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0])); //* Prévisualisation.
    setimageUpload(e.target.files[0]); //* upload.
  };

  //! -------------------------------------------------

  //! Logique pour la création d'un utiliateur.

  async function handleRegister(e) {
    e.preventDefault();
    //
    //? Create user.

    console.log('Prénom : ', registerFirstName.current.value);
    console.log('Nom : ', registerLastName.current.value);
    console.log('Nom d’utilisateur : ', registerUserName.current.value);
    console.log('Téléphone : ', registerPhone.current.value);
    console.log('Ville : ', registerTown.current.value);

    //? -------------------------------------------------

    //? Auth

    console.log('Email : ', registerEmail.current.value);
    console.log('Password : ', registerPassword.current.value);

    //? -------------------------------------------------

    //? Procédure de création d'un utilisateur.

    let usersCreator = new Promise(function (resolve, reject) {
      if (registerFirstName) {
        resolve();
      } else {
        reject();
      }
    });

    let action = async () => {
      let go = await usersCreator;
      return go;
    };

    action()
      //
      //* Création de l’image l’utilisateur actuelle.

      .then(() => {
        //

        let imageRef;

        if (imageUpload == null) {
          imageRef = ref(storage, `images/${'avatar' + date}`);
        } else {
          imageRef = ref(storage, `images/${imageUpload.name + date}`);
        }

        uploadBytes(imageRef, imageUpload).then((snapshot) => {
          //
          getDownloadURL(snapshot.ref)
            .then((url) => {
              //
              userImageFileName = snapshot.ref._location.path_;

              photoURL = url;

              console.log(
                '✅ %c SUCCÈS SignUp ==> Création de l’image l’utilisateur actuelle réussie :',
                'color: green',
                url
              );
            })

            .then(() => {
              //
              //* Création de l'utilisateur pour son authentification.

              createUserWithEmailAndPassword(
                auth,
                registerEmail.current.value,
                registerPassword.current.value
              )
                .then(async (userAuth) => {
                  console.log(
                    '%c ✅ SUCCÈS : SignUp ==> Utilisteur créé : ',
                    'color: green'
                  );
                  uid = userAuth.user.auth.currentUser.auth.currentUser.uid;
                  console.log(
                    '%c ✅ SUCCÈS : SignUp ==> uid généré : ',
                    'color:green',
                    uid
                  );
                })

                //* -------------------------------------------------

                //* Transmission des données user au back.

                .then(() => {
                  //

                  let urlAvatar;

                  if (imageUpload == null) {
                    urlAvatar =
                      'https://firebasestorage.googleapis.com/v0/b/docaz-cb118.appspot.com/o/images%2FAvatar%2FpersonaDocaz.jpg?alt=media&token=dedeb9f7-c9b4-41e6-bc7e-2dc45d233230';
                  } else {
                    urlAvatar = photoURL;
                  }

                  data = {
                    userId: uid,
                    userImageFileName: userImageFileName,
                    firstName: registerFirstName.current.value,
                    lastName: registerLastName.current.value,
                    userName: registerUserName.current.value,
                    phone: registerPhone.current.value,
                    town: registerTown.current.value,

                    photoURL: urlAvatar,
                  };

                  console.log(
                    '%c ✅ SUCCÈS : SignUp ==> Données transmises : ',
                    'color:green',
                    data
                  );

                  dispatch(createUser(data));

                  window.location = '/';
                })

                //* Catch des erreurs lors de la création de l'utilisateur pour son authentification.

                .catch((error) => {
                  //
                  const errorCode = error.code;

                  console.log(
                    "❌ %c ERREUR CODE SignUp ==> Création de l'utilisateur pour son authentification échouée :",
                    'color: orange',
                    errorCode
                  );

                  const errorMessage = error.message;

                  console.log(
                    "❌ %c ERREUR MESSAGE SignUp ==> Création de l'utilisateur pour son authentification échouée :",
                    'color: orange',
                    errorMessage
                  );
                });

              //* -------------------------------------------------
            });
        });
      })

      //* Catch des erreurs.

      .catch((error) => {
        console.log(
          "❌ %c ERROR SignUp ==> Capture générale de l'erreur :",
          'color: orange',
          error
        );
      });
  }

  return (
    <div className={styles.box}>
      <form onSubmit={(e) => handleRegister(e)}>
        {/* '' */}

        <div className={styles.formInput}>
          <label className={styles.formInputLabel}>Prénom</label>
          <div className={styles.formInputBox}>
            <input type="text" required ref={registerFirstName} />
          </div>
        </div>

        <div className={styles.formInput}>
          <label className={styles.formInputLabel}>Nom</label>
          <div className={styles.formInputBox}>
            <input type="text" required ref={registerLastName} />
          </div>
        </div>

        <div className={styles.formInput}>
          <label className={styles.formInputLabel}>Nom d’utilisateur</label>
          <div className={styles.formInputBox}>
            <input type="text" required ref={registerUserName} />
          </div>
        </div>

        <div className={styles.formInput}>
          <label className={styles.formInputLabel}>Téléphone</label>
          <div className={styles.formInputBox}>
            <input type="tel" required ref={registerPhone} />
          </div>
        </div>

        <div className={styles.formInput}>
          <label className={styles.formInputLabel}>Ville</label>
          <div className={styles.formInputBox}>
            <input type="text" required ref={registerTown} />
          </div>
        </div>

        <div className={styles.formInput}>
          <label className={styles.formInputLabel}>Email</label>
          <div className={styles.formInputBox}>
            <input type="email" required ref={registerEmail} />
          </div>
        </div>

        <div className={styles.formInput}>
          <label className={styles.formInputLabel}>Mot de passe</label>
          <div className={styles.formInputBox}>
            <input type="password" required ref={registerPassword} />
          </div>
        </div>

        <div className={styles.formInputImage}>
          <label className={styles.formInputLabel}>Votre image de profil</label>
          <div className={styles.formInputBox}>
            <input
              className={styles.inputImage}
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={(e) => handlePicture(e)}
            />
          </div>
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
