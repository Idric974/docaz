/* eslint-disable @next/next/no-img-element */
import React, { useRef } from 'react';
import styles from '../../../styles/SingUpIn.module.css';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const SignIn = () => {
  //

  //! Les constantes.

  const registerEmail = useRef();
  const registerPassword = useRef();

  //! -------------------------------------------------

  //! Logique pour la connexion d'un utiliateur.

  async function handleRegister(e) {
    e.preventDefault();
    console.log('Email : ', registerEmail.current.value);
    console.log('Password : ', registerPassword.current.value);

    const auth = getAuth();
    signInWithEmailAndPassword(
      auth,
      registerEmail.current.value,
      registerPassword.current.value
    )
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User connected', user);
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log('errorCode', errorCode);

        const errorMessage = error.message;
        console.log('errorMessage', errorMessage);
      });
  }

  //! -------------------------------------------------

  return (
    <div className={styles.box}>
      <form className={styles.formItems} onSubmit={(e) => handleRegister(e)}>
        {/* '' */}
        <div className={styles.formInput}>
          <label className={styles.formInputLabel}>Votre email</label>
          <div className={styles.formInputBox}>
            <input type="email" required ref={registerEmail} />
          </div>
        </div>

        <div className={styles.formInput}>
          <label className={styles.formInputLabel}>Votre mot de passe</label>
          <div className={styles.formInputBox}>
            <input type="password" required ref={registerPassword} />
          </div>
        </div>

        <div className={styles.formInputButtonBox}>
          <input
            className={styles.formInputButton}
            type="submit"
            value="Connexion"
          />
        </div>
      </form>
    </div>
  );
};

export default SignIn;
