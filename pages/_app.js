import { firebaseApp } from '../firebase/firebase';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import '../styles/globals.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import thunk from 'redux-thunk';
import rootReducer from '../src/reducers';
import { Provider } from 'react-redux';
import { applyMiddleware } from 'redux';
import { legacy_createStore as createStore } from 'redux';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';

config.autoAddCss = false;

//! Fonction à jouer au démarrage.

import { readUser } from '../src/actions/userCRUD.actions';
import { readAllPost } from '../src/actions/postCRUD.action';
import { readUsersPost } from '../src/actions/userEvents.actions';

//! --------------------------------------------------

//! Outils de développement.

import { composeWithDevTools } from 'redux-devtools-extension';
import { loadGetInitialProps } from 'next/dist/shared/lib/utils';

//! --------------------------------------------------

function MyApp({ Component, pageProps }) {
  //! Mise en place du useContext.

  const [firebaseUi, setFirebaseUi] = useState(null);

  const auth = getAuth(firebaseApp);

  const fetchToken = async () => {
    //
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setFirebaseUi(user.uid);
      }
    });
  };

  useEffect(() => {
    // console.log(
    //   "%c ✅ SUCCÈS ==> _app.js ==> uid de l'utilisateur connecté : ",
    //   'color: green',
    //   firebaseUi
    // );
  }, [firebaseUi]);

  fetchToken();

  //! --------------------------------------------------

  //! Le store de redux.

  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
  );

  //! --------------------------------------------------

  useEffect(() => {
    store.dispatch(readAllPost());
    store.dispatch(readUser(firebaseUi));
    store.dispatch(readUsersPost(firebaseUi));
  }, [firebaseUi, store]);

  return (
    <>
      <Provider store={store}>
        <Head>
          <title>Docaz.re</title>
          <meta name="description" content="Trouvez vos pièces détachées" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
