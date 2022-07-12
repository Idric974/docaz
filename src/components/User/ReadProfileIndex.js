import React, { useEffect, useState } from 'react';
import styles from '../../../styles/ReadProfileIndex.module.css';
import { useSelector } from 'react-redux';
import ReadProfil from './ReadProfil';
import MesPosts from '../Post/MesPosts';

const ReadProfileIndex = (props) => {
  //
  const [readProfilModal, setReadProfilModal] = useState(props.readProfil);
  const [mesPostsModal, setMesPostsModal] = useState(props.updateProfil);

  //? I) Récupér le profile de l'utilisateur connecté.

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
      setMesPostsModal(false);
    } else if (e.target.id === 'mesPosts') {
      setReadProfilModal(false);
      setMesPostsModal(true);
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
            {'Mon Compte'}
          </div>

          <div
            className={mesPostsModal ? styles.tab : null}
            onClick={handleModals}
            id="mesPosts"
          >
            {'Mes Posts'}
          </div>
        </div>
        {readProfilModal && <ReadProfil />}

        {mesPostsModal && <MesPosts />}
      </div>
    </div>
  );
};

export default ReadProfileIndex;
