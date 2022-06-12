import React, { useEffect, useState } from 'react';
import styles from '../../../styles/ReadProfileIndex.module.css';
import { useSelector } from 'react-redux';
import ReadProfil from './ReadProfil';
import DeleteProfile from './DeleteProfile';
import UpdateProfile from './UpdateProfile';

const ReadProfileIndex = (props) => {
  //
  const [readProfilModal, setReadProfilModal] = useState(props.readProfil);
  const [deleteProfileModal, setDeleteProfileModal] = useState(
    props.deleteProfil
  );
  const [updateProfileModal, setUpdateProfileModal] = useState(
    props.updateProfil
  );

  //? I) Récupéra Le profile de l'utilisateur connecté.

  const userData = useSelector((state) => state.userCRUDReducer);
  // console.log('ReadProfileIndex ===> userData :', userData);

  //? --------------------------------------------------

  useEffect(() => {
    if (userData) {
      setReadProfilModal(true);
    }
  }, [userData]);

  const handleModals = (e) => {
    if (e.target.id === 'Profile') {
      setReadProfilModal(true);
      setDeleteProfileModal(false);
      setUpdateProfileModal(false);
    } else if (e.target.id === 'Modifier') {
      setReadProfilModal(false);
      setUpdateProfileModal(true);
      setDeleteProfileModal(false);
    } else if (e.target.id === 'Supprimer') {
      setReadProfilModal(false);
      setUpdateProfileModal(false);
      setDeleteProfileModal(true);
    }
  };

  return (
    <div className={styles.box}>
      <div className={styles.boxTitle}>Gérez votre compte</div>

      <div>
        <div className={styles.boxTab}>
          <div
            className={readProfilModal ? styles.tab : null}
            onClick={handleModals}
            id="Profile"
          >
            {'Compte'}
          </div>

          <div
            className={updateProfileModal ? styles.tab : null}
            onClick={handleModals}
            id="Modifier"
          >
            {'Modifier'}
          </div>

          <div
            className={deleteProfileModal ? styles.tab : null}
            onClick={handleModals}
            id="Supprimer"
          >
            {'Supprimer'}
          </div>
        </div>
        {readProfilModal && <ReadProfil />}
        {deleteProfileModal && <DeleteProfile />}
        {updateProfileModal && <UpdateProfile />}
      </div>
    </div>
  );
};

export default ReadProfileIndex;
