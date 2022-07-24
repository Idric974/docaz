/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, useRef } from 'react';
import styles from '../../../styles/ReadProfile.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  getStorage,
  ref,
  deleteObject,
  uploadBytes,
  getDownloadURL,
  getFirestore,
} from 'firebase/storage';
import { doc, updateDoc, setDoc } from 'firebase/firestore';
import {
  getAuth,
  signOut,
  sendPasswordResetEmail,
  deleteUser,
} from 'firebase/auth';
import { db } from '../../../firebase/firebase';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

library.add(faRightFromBracket);

const ReadProfil = () => {
  //

  //! Les constantes.

  const storage = getStorage();
  const dispatch = useDispatch();

  //! -------------------------------------------------

  //! Recupération de l'utilisateur Uid.

  let uid;

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

  //? Les fonctions.

  //* Création de la nouvelle de l’utilisateur.

  let imageUrl;
  let newPhotoURL;
  let newUserImageFileName;
  let date = new Date().getTime();

  const [postPicture, setPostPicture] = useState(null); //* Prévisualisation.
  const [imageUpload, setimageUpload] = useState(null); //* upload.

  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0])); //* Prévisualisation.
    setimageUpload(e.target.files[0]); //* upload.
  };

  function imageCreatorUpdate() {
    return new Promise((resolve, reject) => {
      //
      if (userData) {
        //

        if (imageUpload == null) {
          //  imageRef = ref(storage, `images/${'avatar' + date}`);
          console.log('Pas de nouvelle images chargée');
          resolve();
        } else {
          //
          const imageRef = ref(storage, `images/${imageUpload.name + date}`);

          uploadBytes(imageRef, imageUpload)
            .then((snapshot) => {
              //
              getDownloadURL(snapshot.ref).then((url) => {
                //
                newUserImageFileName = snapshot.ref._location.path_;
                console.log(
                  '✅ %c SUCCÈS UpdateProfile ==> Création de la nouvelle image de l’utilisateur réussie :',
                  'color: green',
                  url
                );

                newPhotoURL = url;

                resolve();
              });
            })
            .catch((error) => {
              console.log(
                '❌ %c ERREUR UpdateProfile ==> Création de la nouvelle image de l’utilisateur échouée :',
                'color: orange',
                error
              );

              reject();
            });
        }
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

  let data;
  let photoURL;
  let kepFirtName;
  let kepLastName;
  let kepUserName;
  let kepPhone;
  let kepTown;
  let kepPhotoURL;
  let kepUserImageFileName;

  const [newFirtName, setNewFirtName] = useState(null);
  const [newLastName, setNewLastName] = useState(null);
  const [newUserName, setNewUserName] = useState(null);
  const [newPhone, setPhoneName] = useState(null);
  const [newTown, setNewTown] = useState(null);

  function userDataUpdator() {
    return new Promise((resolve, reject) => {
      //

      kepFirtName = userData.firstName;
      console.log('kepFirtName : ', kepFirtName);
      kepLastName = userData.lastName;
      kepUserName = userData.userName;
      kepPhone = userData.phone;
      kepTown = userData.town;
      kepPhotoURL = userData.photoURL;
      kepUserImageFileName = userData.userImageFileName;

      if (userData) {
        //

        if (newFirtName == null) {
          setNewFirtName(kepFirtName);
          console.log('No data : ', newFirtName);
        } else {
          firstName = newFirtName;
          console.log('OK data : ', newFirtName);
        }

        if (newLastName == null) {
          setNewLastName(kepLastName);
        } else {
          lastName = newLastName;
        }

        if (newUserName == null) {
          setNewUserName(kepUserName);
        } else {
          userName = newUserName;
        }

        if (newPhone == null) {
          setPhoneName(kepPhone);
        } else {
          phone = newPhone;
        }

        if (newTown == null) {
          setNewTown(kepTown);
        } else {
          town = newTown;
        }

        if (imageUpload == null) {
          photoURL = kepPhotoURL;
          userImageFileName = kepUserImageFileName;
        } else {
          photoURL = newPhotoURL;
          userImageFileName = newUserImageFileName;
        }

        // console.log('uid ==> ', uid);
        // console.log('db ===> ', db);

        const userData = doc(db, 'users', uid);

        updateDoc(userData, {
          userId: uid,
          firstName,
          lastName,
          userName,
          phone,
          town,
          userImageFileName,
          photoURL,
        });

        console.log(
          '✅ %c SUCCÈS UpdateProfile ==> Mise à jour de la data de l’utilisateur :',
          'color: green'
        );

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

      await imageDeletorUpdate();

      await imageCreatorUpdate();

      await userDataUpdator();

      // await backToHome();

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
              onChange={(e) => setNewFirtName(e.target.value)}
            ></input>
          </div>
        </div>

        <div className={styles.usersInfo}>
          <div className={styles.info}>{'Nom'}</div>
          <div>
            <input
              className={styles.inputInfo}
              placeholder={lastName}
              onChange={(e) => setNewLastName(e.target.value)}
            ></input>
          </div>
        </div>

        <div className={styles.usersInfo}>
          <div className={styles.info}>{"Nom d'itilisateur"}</div>
          <div>
            <input
              className={styles.inputInfo}
              placeholder={userName}
              onChange={(e) => setNewUserName(e.target.value)}
            ></input>
          </div>
        </div>

        <div className={styles.usersInfo}>
          <div className={styles.info}>{'Téléphone'}</div>
          <div>
            <input
              className={styles.inputInfo}
              placeholder={phone}
              onChange={(e) => setPhoneName(e.target.value)}
            ></input>
          </div>
        </div>

        <div className={styles.usersInfo}>
          <div className={styles.info}>{'Ville'}</div>
          <div>
            <input
              className={styles.inputInfo}
              placeholder={town}
              onChange={(e) => setNewTown(e.target.value)}
            ></input>
          </div>
        </div>

        <div className={styles.usersInfo}>
          {/* <label className={styles.formInputLabel}>Votre image de profil</label> */}
          {/* <div className={styles.formInputBox}>
            <input
              className={styles.inputImage}
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={(e) => handlePicture(e)}
            />
          </div> */}

          {/**  *********************************** **/}
          {/** Image de l'article **/}
          {/* <div className={styles.prewieuImageBox}>
            <p>Nouvelle image</p>
            <div>
              <img
                className={styles.prewieuImage}
                src={postPicture}
                alt="card-pic"
              />
            </div>
          </div> */}

          <div className={styles.usersInfoImageBox}>
            <p>Photo de profil actuelle</p>
            <img
              className={styles.usersInfoImage}
              src={imageProfil}
              alt="user-pic"
            />
          </div>
        </div>

        {/**  *********************************** **/}

        {/**  Nouvelle image du post **/}

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

        <div className={styles.postPictureBoxPre}>
          {imageUpload ? (
            <div className={styles.postPictureBox}>
              <p className={styles.postPictureInstructions}>
                Nouvelle image du post
              </p>
              <img
                className={styles.postPicture}
                src={postPicture}
                alt="imageProfil"
              />
            </div>
          ) : null}
        </div>
      </div>
      {/**  *********************************** **/}

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
