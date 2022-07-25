/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, useRef } from 'react';
import styles from './UpdateProfile.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateLogedUser } from '../../actions/userCRUD.actions';
import { getAuth, signOut, updateEmail } from 'firebase/auth';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  getStorage,
  deleteObject,
} from 'firebase/storage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

library.add(faRightFromBracket);

const UpdateProfile = () => {
  //

  //! Les variables.

  let data;
  let uid;
  let userImageFileName;
  let date = new Date().getTime();
  let photoURL;

  //! -------------------------------------------------

  //! Les constantes.

  const storage = getStorage();
  const dispatch = useDispatch();

  //! -------------------------------------------------

  //! Recupération des datas concernant l'utilisateur connecté (back).

  const userData = useSelector((state) => state.userCRUDReducer);
  userImageFileName = userData.userImageFileName;
  // console.log('UpdateProfile ==> userData', userData);

  //! -------------------------------------------------

  //! Recupération de l'utilisateur Uid.

  const auth = getAuth();
  const user = auth.currentUser;
  if (user !== null) {
    uid = user.uid;
    console.log('uid du currentUser ===> ', user.uid);
    console.log('email du currentUser ===> ', user.email);
  }

  //! -------------------------------------------------

  //! Affichage des informations sur l'utilisateur.

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setuserName] = useState('');
  const [phone, setPhone] = useState('');
  const [town, setTown] = useState('');
  const [email, setEmail] = useState('');
  const [imageProfil, setImageProfil] = useState();

  const [imageUpload, setimageUpload] = useState(null);
  const [postPicture, setPostPicture] = useState(null);

  useEffect(() => {
    setFirstName(userData.firstName);
    setLastName(userData.lastName);
    setuserName(userData.userName);
    setPhone(userData.phone);
    setTown(userData.town);
    setEmail(user.email);
    setImageProfil(userData.photoURL);
  }, [
    user.email,
    userData.firstName,
    userData.lastName,
    userData.phone,
    userData.photoURL,
    userData.town,
    userData.userName,
  ]);

  //! -------------------------------------------------

  //! Récupération des informations saisies pour la mise à jour.

  const registerFirstName = useRef();
  const registerLastName = useRef();
  const registerUserName = useRef();
  const registerPhone = useRef();
  const registerTown = useRef();
  const registerEmail = useRef();

  //! -------------------------------------------------

  //! Logique pour la gestion de l'image.

  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0])); //* Prévisualisation.
    setimageUpload(e.target.files[0]); //* upload.
  };

  //! -------------------------------------------------

  //! Logique pour la mise à jour d'un utiliateur.

  async function updateUserLoged(e) {
    e.preventDefault();
    //

    //? Affichage des infos au clic dans la console .

    console.log('Prénom : ', registerFirstName.current.value);
    console.log('Nom : ', registerLastName.current.value);
    console.log('Nom d’utilisateur : ', registerUserName.current.value);
    console.log('Téléphone : ', registerPhone.current.value);
    console.log('Ville : ', registerTown.current.value);
    console.log('Email : ', registerEmail.current.value);

    //? -------------------------------------------------

    //? Procédure de mise à jour de l’utilisateur.

    let usersUpdater = new Promise(function (resolve, reject) {
      if (userData) {
        resolve();
      } else {
        reject();
      }
    });

    let action = async () => {
      let go = await usersUpdater;
      return go;
    };

    action()
      //* Suppression de l’image actuelle de l’utilisateur.

      .then(() => {
        const desertRef = ref(storage, userImageFileName);
        deleteObject(desertRef)
          .then(() => {
            console.log(
              '✅ %c SUCCÈS UpdateProfile ==> Suppression de l’image actuelle de l’utilisateur réussie :',
              'color: green',
              desertRef
            );
          })
          .catch((error) => {
            console.log(
              '❌ %c ERREUR UpdateProfile ==> Suppression de l’image actuelle de l’utilisateur échouée :',
              'color: orange',
              error
            );
          });
      })

      //* -------------------------------------------------

      //* Création d'une nouvelle image pour l’utilisateur.

      .then(() => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `images/${imageUpload.name + date}`);
        uploadBytes(imageRef, imageUpload)
          //
          //* Création de la nouvelle image.
          .then((snapshot) => {
            getDownloadURL(snapshot.ref)
              .then((url) => {
                //
                userImageFileName = snapshot.ref._location.path_;
                console.log(
                  '✅ %c SUCCÈS UpdateProfile ==> Création de la nouvelle image de l’utilisateur réussie :',
                  'color: green',
                  url
                );
                photoURL = url;
              })
              //* -------------------------------------------------

              //* Mise à jour de la data de l’utilisateur.
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
                console.log(
                  '✅ %c SUCCÈS UpdateProfile ==> Mise à jour de la data de l’utilisateur :',
                  'color: green',
                  data
                );
                dispatch(updateLogedUser(data, uid));
              })
              .then(() => {
                window.location = '/';
              });
            //* -------------------------------------------------
          })
          .catch((error) => {
            console.log(
              '❌ %c ERREUR UpdateProfile ==> Création de la nouvelle image de l’utilisateur échouée :',
              'color: orange',
              error
            );
          });
      })

      //* -------------------------------------------------

      //* Mise à jour de l’email de l’utilisateur.

      .then(() => {
        let newEmail = registerEmail.current.value;
        console.log('newEmail : ', newEmail);

        updateEmail(auth.currentUser, newEmail)
          .then(() => {
            // console.log(
            //   '✅ %c SUCCÈS UpdateProfile ==> Mise à jour de l’email de l’utilisateur actuelle de l’utilisateur réussie :',
            //   'color: green',
            //   newEmail
            // );
          })
          .catch((error) => {
            console.log(
              '❌ %c ERREUR UpdateProfile ==> Mise à jour de l’email de l’utilisateur actuelle de l’utilisateur échouée :',
              'color: orange',
              error
            );
          });
      })

      //* Mise à jour de la data de l’utilisateur.

      .then(() => {})

      //* -------------------------------------------------

      .catch((error) => {
        console.log(
          "❌ %c ERROR UpdateProfile ==> Capture générale de l'erreur :",
          'color: orange',
          error
        );
      });
  }

  //! -------------------------------------------------

  //! Déconnexion de l'utilisateur connecté.

  const userOut = async (e) => {
    e.preventDefault();

    signOut(auth)
      .then(() => {
        console.log('Sign-out successful');
        window.location = '/';
      })
      .catch((error) => {
        console.log('An error happened : ', error);
      });
  };
  //
  //! -------------------------------------------------
  //
  return (
    <div className={styles.box}>
      {/** Titre de la page **/}
      <div className={styles.titleBox}>
        <div className={styles.title}>Mes informations</div>

        <div onClick={userOut} className={styles.inconeBox}>
          <p className={styles.icone}>
            <FontAwesomeIcon icon={faRightFromBracket} />
          </p>

          <p className={styles.iconeText}>Déconnexion</p>
        </div>
      </div>

      <p className={styles.boxText}>
        Modifier ici toutes les informations vous concernant enregistrées chez
        Docaz.re.
      </p>

      {/** Information sur le l'utilisateur **/}
      <div className={styles.usersInfosBox}>
        <form className={styles.myForm} onSubmit={(e) => updateUserLoged(e)}>
          {/* '' */}

          <div className={styles.usersInfo}>
            <div className={styles.info}>{'Prénom*'}</div>
            <div>
              <input
                className={styles.inputInfo}
                placeholder={firstName}
                required
                ref={registerFirstName}
              ></input>
            </div>
          </div>

          <div className={styles.usersInfo}>
            <div className={styles.info}>{'Nom*'}</div>
            <div>
              <input
                className={styles.inputInfo}
                placeholder={lastName}
                required
                ref={registerLastName}
              ></input>
            </div>
          </div>

          <div className={styles.usersInfo}>
            <div className={styles.info}>{"Nom d'itilisateur*"}</div>
            <div>
              <input
                className={styles.inputInfo}
                placeholder={userName}
                required
                ref={registerUserName}
              ></input>
            </div>
          </div>

          <div className={styles.usersInfo}>
            <div className={styles.info}>{'Téléphone*'}</div>
            <div>
              <input
                className={styles.inputInfo}
                placeholder={phone}
                required
                ref={registerPhone}
              ></input>
            </div>
          </div>

          <div className={styles.usersInfo}>
            <div className={styles.info}>{'Ville*'}</div>
            <div>
              <input
                className={styles.inputInfo}
                placeholder={town}
                required
                ref={registerTown}
              ></input>
            </div>
          </div>

          <div className={styles.usersInfo}>
            <div className={styles.info}>{'Email*'}</div>
            <div>
              <input
                className={styles.inputInfo}
                placeholder={email}
                required
                ref={registerEmail}
              ></input>
            </div>
          </div>

          <div className={styles.usersInfo}>
            <label className={styles.formInputLabel}>
              Votre image de profil
            </label>
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
              <img
                className={styles.prewieuImage}
                src={postPicture}
                alt="card-pic"
              />
            </div>
          </div>

          <div className={styles.formInputButtonBox}>
            <input
              className={styles.formInputButton}
              type="submit"
              value="Valider les modifications"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
