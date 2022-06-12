import React from 'react';
import styles from '../../../styles/DeleteProfile.module.css';
import { getAuth, deleteUser } from 'firebase/auth';
import { getStorage, ref, deleteObject } from 'firebase/storage';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import deleteOneUser from '../../actions/userCRUD.actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const DeleteProfile = () => {
  //

  //!Les variables.

  let userImageFileName;
  let uid;

  //! -------------------------------------------------

  //! Les constantes.

  const auth = getAuth();
  const user = auth.currentUser;
  console.log('user ===> ', user.uid);
  uid = user.uid;

  const storage = getStorage();
  const dispatch = useDispatch();

  //! -------------------------------------------------

  //! Afficher les informations de l'utilisateur connecté.

  const userData = useSelector((state) => state.userCRUDReducer);
  userImageFileName = userData.userImageFileName;
  console.log('DeleteProfile ==> user image name : ', userImageFileName);

  //! -------------------------------------------------

  //! Gestion de la supprésions d'un compte.

  const handleDeleteButton = () => {
    //

    //? supprimer l'utilisateur de Firebase Authentication.

    deleteUser(user)
      .then(() => {
        console.log(
          '✅ %c SUCCÈS DeleteProfile ==> DeleteProfile ==> Utilisateur supprimé :',
          'color: green'
        );
      })

      //? -------------------------------------------------

      //? Supprimer l'image de l'utilisateur dans Firebase Storage.

      .then(() => {
        const desertRef = ref(storage, userImageFileName);

        deleteObject(desertRef)
          .then(() => {
            console.log(
              '✅ %c SUCCÈS DeleteProfile ==> Supprimer user image :',
              'color: green',
              desertRef
            );
          })
          .catch((error) => {
            console.log(
              '❌ %c SUCCÈS DeleteProfile ==> Supprimer user image :',
              'color: orange',
              error
            );
          });
      })

      //? Suppression de information concernant l’utilisateur connecté.

      .then(() => {
        dispatch(deleteOneUser(uid));
      })

      //? -------------------------------------------------

      //? Retour à la page accueil.

      .then(() => {
        setTimeout(() => {
          window.location = '/';
        }, 1000);
      })

      //? -------------------------------------------------

      //? Catch des erreurs.

      .catch((error) => {
        console.log(
          '❌ %c ERREUR : DeleteProfile ==> DeleteProfile ==> Utilisateur supprimé : :',
          'color : red',
          error
        );
      });

    //? -------------------------------------------------
  };

  //! -------------------------------------------------
  return (
    <div className={styles.box}>
      {/** Titre de la page **/}
      <div className={styles.titleBox}>
        <div className={styles.title}>Mes informations</div>

        <div className={styles.inconeBox}>
          <p className={styles.icone}>
            <FontAwesomeIcon icon={faRightFromBracket} />
          </p>

          <p className={styles.iconeText}>Déconnexion</p>
        </div>
      </div>

      <p className={styles.boxText}>
        Attention en cliquant sur le bouton ci dessous vous allez définivement
        supprimer votre compte du site docaz.re
      </p>

      <p className={styles.boxText}>Cette action est irréversible.</p>

      <p className={styles.boxText}>
        Soyez bien sûre de votre décision avant de cliquer.
      </p>

      <div className={styles.deleteButtonBox}>
        <button className={styles.deleteButton} onClick={handleDeleteButton}>
          {'Supprimer mon compte'}
        </button>
      </div>
    </div>
  );
};

export default DeleteProfile;
