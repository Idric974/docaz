import React, { useEffect, useState } from 'react';
import styles from '../styles/Profile.module.css';
import NavBar from '../src/components/NavBar/NavBar';
import ReadProfil from '../src/components/User/ReadProfil';
import UpdateProfile from '../src/components/User/UpdateProfile';
import DeleteProfile from '../src/components/User/DeleteProfile';

const Profile = (props) => {
  //
  const [readProfilModal, setReadProfilModal] = useState(props.signup);
  const [updateProfileModal, setUpdateProfile] = useState(props.signin);
  const [deleteProfileModal, setDeleteProfileModal] = useState(props.signin);

  useEffect(() => {
    setReadProfilModal(true);
  }, []);

  const handleModals = (e) => {
    if (e.target.id === 'readProfilId') {
      setReadProfilModal(true);
      setUpdateProfile(false);
      setDeleteProfileModal(false);
    } else if (e.target.id === 'updateProfileId') {
      setReadProfilModal(false);
      setUpdateProfile(true);
      setDeleteProfileModal(false);
    } else if (e.target.id === 'deleteProfileId') {
      setReadProfilModal(false);
      setUpdateProfile(false);
      setDeleteProfileModal(true);
    }
  };

  return (
    <div>
      <NavBar></NavBar>
      <div className={styles.box}>
        <div
          className={readProfilModal ? styles.tab : styles.tabOff}
          onClick={handleModals}
          id="readProfilId"
        >
          {'Profil'}
        </div>

        <div
          className={updateProfileModal ? styles.tab : styles.tabOff}
          onClick={handleModals}
          id="updateProfileId"
        >
          {'Modifier'}
        </div>

        <div
          className={deleteProfileModal ? styles.tab : styles.tabOff}
          onClick={handleModals}
          id="deleteProfileId"
        >
          {'Supprimer'}
        </div>
      </div>

      {readProfilModal && <ReadProfil />}
      {updateProfileModal && <UpdateProfile />}
      {deleteProfileModal && <DeleteProfile />}
    </div>
  );
};

export default Profile;
