import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import masterStyles from '../styles/Master.module.css';
import Logo from '../src/components/Logo/Logo';
import ThreadPosts from '../src/components/Post/ThreadPosts';
import CreatePost from '../src/components/Post/CreatePost';
import Favorites from '../src/components/Favorites/Favorites';
import SingnIndex from '../src/components/User/SingnIndex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faHouse,
  faUser,
  faHeart,
  faArrowsToCircle,
} from '@fortawesome/free-solid-svg-icons';

library.add(faHouse, faUser, faHeart, faArrowsToCircle);

export default function Home(props) {
  //
  const [threadModal, setThreadModal] = useState(props.Thread);
  const [createPostModal, setCreatePostModal] = useState(props.signup);
  const [favoritesModal, setfavoritesModal] = useState(props.signup);
  const [accountModal, setAccountModal] = useState(props.signup);

  useEffect(() => {
    setThreadModal(true);
  }, []);

  const handleModals = (e) => {
    e.preventDefault();
    // console.log('Clic');

    if (e.target.id === 'AccueilId') {
      setThreadModal(true);
      setCreatePostModal(false);
      setfavoritesModal(false);
      setAccountModal(false);
    } else if (e.target.id === 'postId') {
      setThreadModal(false);
      setCreatePostModal(true);
      setfavoritesModal(false);
      setAccountModal(false);
    } else if (e.target.id === 'favoriteseId') {
      setThreadModal(false);
      setCreatePostModal(false);
      setfavoritesModal(true);
      setAccountModal(false);
    } else if (e.target.id === 'accountId') {
      setThreadModal(false);
      setCreatePostModal(false);
      setfavoritesModal(false);
      setAccountModal(true);
    }
  };

  return (
    <div className={masterStyles.box}>
      <Logo></Logo>
      <div className={styles.appMenu}>
        {/* ' '  */}
        <div
          className={threadModal ? styles.tab : styles.tabOff}
          onClick={handleModals}
          id="AccueilId"
        >
          <p className={styles.iconFont}>
            {<FontAwesomeIcon icon={faHouse} />}
          </p>
          {'Accueil'}
        </div>

        <div
          className={createPostModal ? styles.tab : styles.tabOff}
          onClick={handleModals}
          id="postId"
        >
          <p className={styles.iconFont}>
            {<FontAwesomeIcon icon={faArrowsToCircle} />}
          </p>
          {'Publier'}
        </div>

        <div
          className={favoritesModal ? styles.tab : styles.tabOff}
          onClick={handleModals}
          id="favoriteseId"
        >
          <p className={styles.iconFont}>
            {<FontAwesomeIcon icon={faHeart} />}
          </p>
          {'Favoris'}
        </div>
        <div
          className={accountModal ? styles.tab : styles.tabOff}
          onClick={handleModals}
          id="accountId"
        >
          <p className={styles.iconFont}>{<FontAwesomeIcon icon={faUser} />}</p>
          {'Compte'}
        </div>
      </div>
      <div className={styles.appBody}>
        {threadModal && <ThreadPosts />}
        {createPostModal && <CreatePost />}
        {favoritesModal && <Favorites />}
        {accountModal && <SingnIndex />}
      </div>
    </div>
  );
}
