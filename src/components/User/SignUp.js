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

  const dispatch = useDispatch();

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

    //? Enregistremant de l'image.

    if (imageUpload == null) return;

    const imageRef = ref(storage, `images/${imageUpload.name + date}`);

    uploadBytes(imageRef, imageUpload)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          //
          userImageFileName = snapshot.ref._location.path_;
          // console.log('userImageFileName ===> ', userImageFileName);

          //console.log('imageUrl ===> ', url);
          photoURL = url;
        });
      })

      //? -------------------------------------------------

      //? Auth utilisateur.
      .then(() => {
        setTimeout(() => {
          const auth = getAuth();
          createUserWithEmailAndPassword(
            auth,
            registerEmail.current.value,
            registerPassword.current.value
          )
            //? -------------------------------------------------

            //? Enregistremant des informations utilisateur.

            .then(async (userAuth) => {
              console.log(
                '%c ✅ SUCCÈS : Utilisteur créé ==> SignUp.js ==> ',
                'color: green',
                userAuth
              );

              uid = userAuth.user.auth.currentUser.auth.currentUser.uid;
              console.log(
                "%c 🔺 INFO : uid de l'utilisateur connecté ",
                'color:blue',
                uid
              );
            })

            //? -------------------------------------------------

            .then(() => {
              data = {
                userId: uid,
                userImageFileName: userImageFileName,
                firstName: registerFirstName.current.value,
                lastName: registerLastName.current.value,
                userName: registerUserName.current.value,
                phone: registerPhone.current.value,
                town: registerTown.current.value,
                photoURL: photoURL,
              };

              // console.log('data ===>', data);

              dispatch(createUser(data));

              window.location = '/';
            })

            //? Cath des erreurs

            .catch((error) => {
              const errorCode = error.code;
              console.log('errorCode', errorCode);

              const errorMessage = error.message;
              console.log('errorMessage', errorMessage);
            });

          //? -------------------------------------------------
        }, 1500);

        // console.log('data : ', data);
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

        <div className={styles.formInputButtonBox}>
          <input
            className={styles.formInputButton}
            type="submit"
            value="Valider inscription"
          />
        </div>
      </form>

      {/** Image de l'article **/}
      <div className={styles.prewieuImageBox}>
        <div>
          <img className={styles.prewieuImage} src={postPicture} alt="" />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
