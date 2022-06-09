import React, { useEffect, useState } from 'react';
import styles from '../../../styles/SingnIndex.module.css';
import { useSelector } from 'react-redux';
import ReadProfil from './ReadProfil';
import SignUp from './SignUp';
import SignIn from './SignIn';

const SingnIndex = (props) => {
  const [signUpModal, setSignUpModal] = useState(props.signup);
  const [signInModal, setSignInModal] = useState(props.signin);
  const [readProfilModal, setReadProfilModal] = useState(props.readProfil);

  //
  //! I) Affichage des informations concernant l'utilisateur connecté.

  //? I) Récupéra Le profile de l'utilisateur connecté.

  const userData = useSelector((state) => state.userCRUDReducer);
  // console.log('userData SingnIndex', userData);

  //? --------------------------------------------------

  useEffect(() => {
    if (userData) {
      setReadProfilModal(true);
    } else {
      setSignUpModal(true);
    }
  }, [userData]);

  const handleModals = (e) => {
    if (e.target.id === 'register') {
      setSignInModal(false);
      setSignUpModal(true);
    } else if (e.target.id === 'login') {
      setSignUpModal(false);
      setSignInModal(true);
    }
  };
  return (
    <div className={styles.box}>
      {userData ? (
        <div className={styles.profileBox}>
          {readProfilModal && <ReadProfil />}
        </div>
      ) : (
        <div>
          <div className={styles.boxTab}>
            <div
              className={signUpModal ? styles.tab : null}
              onClick={handleModals}
              id="register"
            >
              {"S'inscrire"}
            </div>

            <div
              className={signInModal ? styles.tab : null}
              onClick={handleModals}
              id="login"
            >
              {'Se connecter'}
            </div>
          </div>

          {signUpModal && <SignUp />}
          {signInModal && <SignIn />}
        </div>
      )}
    </div>
  );
};

export default SingnIndex;
