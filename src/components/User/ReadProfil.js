/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, useRef } from 'react';
import styles from '../../../styles/ReadProfile.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { updateLogedUser } from '../../actions/userCRUD.actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  getStorage,
  ref,
  deleteObject,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import {
  getAuth,
  signOut,
  sendPasswordResetEmail,
  deleteUser,
} from 'firebase/auth';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

library.add(faRightFromBracket);

const ReadProfil = () => {
  //

  //! Les variables.

  let data;
  let uid;

  let newUserImageFileName;
  let date = new Date().getTime();
  let photoURL;
  let newPhotoURL;
  let imageUrl;

  //! -------------------------------------------------

  //! Les constantes.

  const storage = getStorage();
  const dispatch = useDispatch();

  //! -------------------------------------------------

  //! Recupération de l'utilisateur Uid.

  const auth = getAuth();

  const user = auth.currentUser;
  if (user !== null) {
    uid = user.uid;
  }

  // useEffect(() => {
  //   console.log('⭐ CurrentUser Uid    ===> (ReadProfil) : ', user.uid);
  //   console.log('⭐ CurrentUser Email  ===> (ReadProfil) : ', user.email);
  // }, [user.email, user.uid]);

  //! -------------------------------------------------

  //! I) Récupération et affichage du profile de l'utilisateur connecté.

  const userData = useSelector((state) => state.userCRUDReducer);

  // useEffect(() => {
  //   console.log('⭐ CurrentUser Profile ==> (ReadProfil) :', userData);
  // }, [userData]);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setuserName] = useState('');
  const [phone, setPhone] = useState('');
  const [town, setTown] = useState('');
  const [imageProfil, setImageProfil] = useState();

  useEffect(() => {
    setFirstName(userData.firstName);
    setLastName(userData.lastName);
    setuserName(userData.userName);
    setPhone(userData.phone);
    setTown(userData.town);
    setImageProfil(userData.photoURL);
  }, [
    userData.firstName,
    userData.lastName,
    userData.phone,
    userData.photoURL,
    userData.town,
    userData.userName,
  ]);

  //! --------------------------------------------------

  //! ENVOYER UN E-MAIL DE RÉINITIALISATION DU MOT DE PASSE.

  const userResetEmail = async (e) => {
    e.preventDefault();

    sendPasswordResetEmail(auth, user.email)
      .then(() => {
        console.log(
          '✅ %c SUCCÈS ReadProfil ==> e-mail de réinitialisation du mot de passe envoyé à : ',
          user.email,
          'color: green'
        );
      })
      .catch((error) => {
        //
        const errorCode = error.code;

        console.log(
          '❌ %c ERREUR CODE ReadProfil ==> Envoi e-mail de réinitialisation du mot de passe échouée :',
          'color: orange',
          errorCode
        );

        const errorMessage = error.message;

        console.log(
          '❌ %c ERREUR MESSAGE ReadProfil ==> Envoi e-mail de réinitialisation du mot de passe échouée :',
          'color: orange',
          errorMessage
        );
      });
  };

  //! -------------------------------------------------

  //! GESTION DE LA SUPPRESSION D'UN COMPTE.

  //? les fonctions.

  //* Supprimer l'image de l'utilisateur dans Firebase Storage.

  function profilDeletor() {
    return new Promise((resolve, reject) => {
      if (user) {
        deleteUser(user)
          //
          .then(() => {
            //
            console.log(
              '✅ %c SUCCÈS DeleteProfile ==> DeleteProfile ==> Utilisateur supprimé :',
              'color: green'
            );

            resolve();
          })

          .catch((error) => {
            //
            console.log(
              '❌ %c ERREUR : DeleteProfile ==> DeleteProfile ==> Utilisateur supprimé : :',
              'color : red',
              error
            );

            reject();
          });
      } else {
        console.log('PAS OK');
      }
    });
  }

  //? -------------------------------------------------

  function imageDeletor() {
    return new Promise((resolve, reject) => {
      //
      if (user) {
        //
        const desertRef = ref(storage, userImageFileName);

        deleteObject(desertRef)
          .then(() => {
            //
            console.log(
              '✅ %c SUCCÈS DeleteProfile ==> Supprimer user image :',
              'color: green',
              desertRef
            );

            resolve();
          })
          .catch((error) => {
            //
            console.log(
              '❌ %c SUCCÈS DeleteProfile ==> Supprimer user image :',
              'color: orange',
              error
            );

            reject();
          });
      } else {
        console.log('ERREUR : imageDeletor');
      }
    });
  }

  //* Suppression de information concernant l’utilisateur connecté.

  function dataDeletor() {
    return new Promise((resolve, reject) => {
      if (uid) {
        console.log('uid dispatché ===> ', uid);
        dispatch(deleteOneUser(uid));

        resolve();
      } else {
        console.log('ERREUR : dataDeletor');
        reject();
      }
    });
  }

  //* -------------------------------------------------

  //? Exécution des fonctions.

  async function handleDeleteButton(e) {
    e.preventDefault();

    try {
      //
      await profilDeletor();

      await imageDeletor();

      await dataDeletor();

      //
    } catch (err) {
      //
      console.log('err :', err);
    }
  }

  //? -------------------------------------------------

  //! -------------------------------------------------

  //! GESTION DE LA MISE À JOUR DU COMPTE D'UN UTILISATEUR.

  //? Récupération des informations saisies pour la mise à jour.

  const registerFirstName = useRef();
  const registerLastName = useRef();
  const registerUserName = useRef();
  const registerPhone = useRef();
  const registerTown = useRef();

  //? -------------------------------------------------

  //? Logique pour la gestion de l'image.

  const [postPicture, setPostPicture] = useState(null); //* Prévisualisation.
  const [imageUpload, setimageUpload] = useState(null); //* upload.

  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0])); //* Prévisualisation.
    setimageUpload(e.target.files[0]); //* upload.
  };

  //? -------------------------------------------------

  //? Les fonctions.

  //* Création de la nouvelle de l’utilisateur.

  function imageCreatorUpdate() {
    return new Promise((resolve, reject) => {
      //
      if (userData) {
        //
        let imageRef;

        if (imageUpload == null) {
          //  imageRef = ref(storage, `images/${'avatar' + date}`);
          console.log('Pas de nouvelle images chargée');
          resolve();
        } else {
          imageRef = ref(storage, `images/${imageUpload.name + date}`);
        }

        uploadBytes(imageRef, imageUpload).then((snapshot) => {
          //
          getDownloadURL(snapshot.ref).then((url) => {
            //
            newUserImageFileName = snapshot.ref._location.path_;
            // console.log('newUserImageFileName :', newUserImageFileName);

            newPhotoURL = url;

            console.log(
              '✅1️⃣ %c SUCCÈS ReadProfil ==> Création de la nouvelle de l’utilisateur réussie :',
              'color: green',
              url
            );
            resolve();
          });
        });
      } else {
        console.log(
          '❌1️⃣ %c ERREUR ReadProfil ==> Création de la nouvelle de l’utilisateur  :',
          'color: orange'
        );

        reject();
      }
    });
  }

  //* -------------------------------------------------

  //* Mise à jour des datas de l’utilisateur.

  function userDataUpdator() {
    return new Promise((resolve, reject) => {
      //

      // console.log('Prénom : ', registerFirstName.current.value);
      // console.log('Nom : ', registerLastName.current.value);
      // console.log('Nom d’utilisateur : ', registerUserName.current.value);
      // console.log('Téléphone : ', registerPhone.current.value);
      // console.log('Ville : ', registerTown.current.value);

      if (userData) {
        //

        if (registerFirstName.current.value == '') {
          firstName = firstName;
        } else {
          firstName = registerFirstName.current.value;
        }

        if (registerLastName.current.value == '') {
          lastName = lastName;
        } else {
          lastName = registerLastName.current.value;
        }

        if (registerUserName.current.value == '') {
          userName = userName;
        } else {
          userName = registerUserName.current.value;
        }

        if (registerPhone.current.value == '') {
          phone = phone;
        } else {
          phone = registerPhone.current.value;
        }

        if (registerTown.current.value == '') {
          town = town;
        } else {
          town = registerTown.current.value;
        }

        if (imageUpload == null) {
          photoURL = userData.photoURL;
          userImageFileName = userData.userImageFileName;
        } else {
          photoURL = newPhotoURL;
          userImageFileName = newUserImageFileName;
        }

        data = {
          userId: uid,
          firstName,
          lastName,
          userName,
          phone,
          town,
          photoURL,
          userImageFileName,
        };

        console.log(
          '✅2️⃣ %c SUCCÈS : SignUp ==> Données transmises : ',
          'color:green',
          data
        );

        dispatch(updateLogedUser(data, uid));

        resolve();
      } else {
        console.log(
          '❌2️⃣ %c ERREUR ReadProfil ==> Création de la nouvelle de l’utilisateur échouée',
          'color: orange'
        );

        reject();
      }
    });
  }

  //* -------------------------------------------------

  //* Suppression de l’image actuelle de l’utilisateur.

  let userImageFileName = userData.userImageFileName;

  function imageDeletorUpdate() {
    return new Promise((resolve, reject) => {
      //

      if (imageUpload == null) {
        console.log("Pas d'image chargé");
        resolve();
      } else {
        // console.log('userImageFileName :', userImageFileName);
        const desertRef = ref(storage, userImageFileName);

        deleteObject(desertRef)
          .then(() => {
            //
            console.log(
              '✅3️⃣ %c SUCCÈS ReadProfil ==> Supprimer user image lors de la mise à jour :',
              'color: green',
              desertRef._location.path_
            );

            resolve();
          })

          .catch((error) => {
            //
            console.log(
              '❌3️⃣ %c SUCCÈS ReadProfil ==> Supprimer user image lors de la mise à jour :',
              'color: orange',
              error
            );

            reject();
          });
      }
    });
  }

  //* -------------------------------------------------

  //* Retour à l'accueil.

  function backToHome() {
    return new Promise((resolve, reject) => {
      //
      if (userData) {
        //

        console.log(
          "✅ %c SUCCÈS ReadProfil ==> Retour à l'accueil",
          'color: green'
        );

        window.location = '/';

        resolve();
      } else {
        console.log(
          "❌ %c ERREUR ReadProfil ==> Retour à l'accueil",
          'color: orange'
        );

        reject();
      }
    });
  }

  //* -------------------------------------------------

  //? Exécution des fonctions.

  async function handleDeleteButtonUpDate(e) {
    e.preventDefault();

    try {
      //

      await imageCreatorUpdate();

      await userDataUpdator();

      await imageDeletorUpdate();

      await backToHome();

      //
    } catch (err) {
      //
      console.log('err :', err);
    }
  }

  //? -------------------------------------------------
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
        console.log('An error happened');
      });
  };
  //! -------------------------------------------------

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
        Voici ci-dessous, toutes les informations vous concernant enregistrées
        chez Docaz.re.
      </p>

      {/** Information sur le l'utilisateur **/}
      <div className={styles.usersInfosBox}>
        <div className={styles.usersInfo}>
          <div className={styles.info}>{'Prénom'}</div>
          <div>
            <input
              className={styles.inputInfo}
              placeholder={firstName}
              ref={registerFirstName}
              required
            ></input>
          </div>
        </div>

        <div className={styles.usersInfo}>
          <div className={styles.info}>{'Nom'}</div>
          <div>
            <input
              className={styles.inputInfo}
              placeholder={lastName}
              ref={registerLastName}
              required
            ></input>
          </div>
        </div>

        <div className={styles.usersInfo}>
          <div className={styles.info}>{"Nom d'itilisateur"}</div>
          <div>
            <input
              className={styles.inputInfo}
              placeholder={userName}
              ref={registerUserName}
              required
            ></input>
          </div>
        </div>

        <div className={styles.usersInfo}>
          <div className={styles.info}>{'Téléphone'}</div>
          <div>
            <input
              className={styles.inputInfo}
              placeholder={phone}
              ref={registerPhone}
              required
            ></input>
          </div>
        </div>

        <div className={styles.usersInfo}>
          <div className={styles.info}>{'Ville'}</div>
          <div>
            <input
              className={styles.inputInfo}
              placeholder={town}
              ref={registerTown}
              required
            ></input>
          </div>
        </div>

        <div className={styles.usersInfo}>
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
          <p>Nouvelle image</p>
          <div>
            <img
              className={styles.prewieuImage}
              src={postPicture}
              alt="card-pic"
            />
          </div>
        </div>

        <div className={styles.usersInfoImageBox}>
          <p>Image actuelle</p>
          <img
            className={styles.usersInfoImage}
            src={imageProfil}
            alt="user-pic"
          />
        </div>
      </div>

      <div className={styles.buttonBox} onClick={handleDeleteButtonUpDate}>
        <button className={styles.profileButton}>
          {'Mettre à jour nom compte'}
        </button>

        <button className={styles.profileButton} onClick={userResetEmail}>
          {'Réinitialiser mon mot de passe'}
        </button>

        <button className={styles.profileButton} onClick={handleDeleteButton}>
          {'Supprimer mon compte'}
        </button>
      </div>
    </div>
  );
};

export default ReadProfil;
