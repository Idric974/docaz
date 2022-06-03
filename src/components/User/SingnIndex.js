import React, { useEffect, useState } from 'react';
import styles from '../../../styles/SingnIndex.module.css';
import Logo from '../Logo/Logo';
import SignUp from './SignUp';
import SignIn from './SignIn';

const SingnIndex = (props) => {
  const [signUpModal, setSignUpModal] = useState(props.signup);
  const [signInModal, setSignInModal] = useState(props.signin);

  useEffect(() => {
    setSignInModal(true);
  }, []);

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
      <Logo></Logo>
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
  );
};

export default SingnIndex;
