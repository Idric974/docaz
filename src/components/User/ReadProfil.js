/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import styles from '../../../styles/UpdateProfile.module.css';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { getAuth, signOut } from 'firebase/auth';

library.add(faRightFromBracket);

const ReadProfil = () => {
  //
  //! I) Affichage des informations concernant l'utilisateur connecté.

  //? I) Récupéra Le profile de l'utilisateur connecté.

  const userData = useSelector((state) => state.userCRUDReducer);
  // console.log('ReadProfil ==> userData', userData);

  //? --------------------------------------------------

  //? Les constantes.

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

  //? --------------------------------------------------

  //! -------------------------------------------------

  //! Déconnexion de l'utilisateur connecté.

  const userOut = async (e) => {
    e.preventDefault();

    const auth = getAuth();
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

      {/** Information sur le l'utilisateur **/}
      <div className={styles.usersInfosBox}>
        <div className={styles.usersInfo}>
          <div className={styles.info1}>{'Prénom :'}</div>
          <div className={styles.info2}>{firstName}</div>
        </div>

        <div className={styles.usersInfo}>
          <div className={styles.info1}>{'Nom :'}</div>
          <div className={styles.info2}>{lastName}</div>
        </div>

        <div className={styles.usersInfo}>
          <div className={styles.info1}>{"Nom d'itilisateur :"}</div>
          <div className={styles.info2}>{userName}</div>
        </div>

        <div className={styles.usersInfo}>
          <div className={styles.info1}>{'Téléphone :'}</div>
          <div className={styles.info2}>{phone}</div>
        </div>

        <div className={styles.usersInfo}>
          <div className={styles.info1}>{'Ville :'}</div>
          <div className={styles.info2}>{town}</div>
        </div>

        <div className={styles.usersInfo}>
          <img
            className={styles.usersInfoImage}
            src={imageProfil}
            alt="user-pic"
          />
        </div>
      </div>

      {/** Bouton gestion profl **/}

      {/* <div className={styles.handleProfilButtonsBox}>
        <Link href="/UpdateProfile">
          <a className={styles.handleProfilButtonsModifier}>Modifier profile</a>
        </Link>

        <Link href="/DeleteProfile">
          <a className={styles.handleProfilButtonsSupprimer}>
            Supprimer profile
          </a>
        </Link>

        <Link href="/mesPosts">
          <a className={styles.handleProfilButtonsAnnonces}>
            Gérer mes annonces
          </a>
        </Link>
      </div> */}
    </div>
  );
};

export default ReadProfil;
