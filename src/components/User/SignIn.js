/* eslint-disable @next/next/no-img-element */
import React, { useRef } from 'react';
import styles from '../../../styles/SignIn.module.css';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const SignIn = () => {
  //

  //! Les constantes.

  const registerEmail = useRef();
  const registerPassword = useRef();
  const auth = getAuth();

  //! -------------------------------------------------

  //! Logique pour la connexion d'un utiliateur.

  async function handleRegister(e) {
    e.preventDefault();
    console.log('Email : ', registerEmail.current.value);
    console.log('Password : ', registerPassword.current.value);

    signInWithEmailAndPassword(
      auth,
      registerEmail.current.value,
      registerPassword.current.value
    )
      .then((userCredential) => {
        const user = userCredential.user;

        console.log(
          '%c ✅ SUCCÈS : SignIn ===> User connected :',
          'color: green',
          user
        );

        document.getElementById('signInError').innerHTML =
          "Connexion réussi, vous allez être redirigé ver la page d'accueil";
        document.getElementById('signInError').style.color = 'green';
        document.getElementById('signInError').style.fontSize = '1.5rem';

        setTimeout(() => {
          window.location = '/';
        }, 5000);

        //
      })
      .catch((error) => {
        const errorCode = error.code;

        console.log(
          '%c ❌ ERREUR : SignIn ===> User connected : :',
          'color: red',
          errorCode
        );

        const errorMessage = error.message;

        console.log(
          '%c ❌ ERREUR : SignIn ===> errorMessage : :',
          'color: red',
          errorMessage
        );

        document.getElementById('signInError').innerHTML =
          'Le mot de passe ou l’identifiant saisi est incorrecte';
        document.getElementById('signInError').style.color = 'red';
        document.getElementById('signInError').style.fontSize = '1.5rem';
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

        <div id="signInError" className={styles.errorMessage}></div>
      </form>
    </div>
  );
};

export default SignIn;
