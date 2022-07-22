import React, { useEffect, useState } from 'react';
import styles from '../../../styles/SingnIndex.module.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useSelector } from 'react-redux';
import ReadProfileIndex from './ReadProfileIndex';
import SignUp from './SignUp';
import SignIn from './SignIn';

const SingnIndex = (props) => {
  //

  //! Recupération de l'utilisateur Uid.

  // let uid;

  const auth = getAuth();
  const user = auth.currentUser;
  // if (user !== null) {
  //   uid = user.uid;
  // }

  // console.log('⭐ CurrentUser Uid    ===> (ReadProfil) : ', user);

  //! -------------------------------------------------

  const [signUpModal, setSignUpModal] = useState(props.signup);
  const [signInModal, setSignInModal] = useState(props.signin);
  const [readProfileIndexModal, setReadProfileIndexModal] = useState(
    props.readProfil
  );

  //
  //! I) Affichage des informations concernant l'utilisateur connecté.

  //? I) Récupéra Le profile de l'utilisateur connecté.

  const data = useSelector((state) => state.userCRUDReducer);
  // console.log('data :============>', data);

  const [userData, setUserData] = useState('');

  useEffect(() => {
    setUserData(data);
    // console.log('userData SingnIndex ======> ', userData);
  }, [data, userData]);

  //? --------------------------------------------------

  useEffect(() => {
    if (user) {
      setReadProfileIndexModal(true);
    } else {
      setSignUpModal(true);
    }
  }, [user]);

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
      {user ? (
        <div className={styles.profileBox}>
          {readProfileIndexModal && <ReadProfileIndex />}
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
