import React from 'react';
import styles from '../../../styles/DeleteProfile.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const DeleteProfile = () => {
  return (
    <div className={styles.box}>
      {/** Titre de la page **/}
      <div className={styles.titleBox}>
        <div className={styles.title}>Supprimer</div>

        <div className={styles.inconeBox}>
          <p className={styles.icone}>
            <FontAwesomeIcon icon={faRightFromBracket} />
          </p>

          <p className={styles.iconeText}>Déconnexion</p>
        </div>
      </div>
    </div>
  );
};

export default DeleteProfile;
