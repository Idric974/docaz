import React, { useEffect, useState } from 'react';
import styles from '../styles/index.module.css';
import Logo from '../src/components/Logo/Logo';
import Thread from '../src/components/Thread/Thread';
import PostHandler from '../src/components/Post/PostHandler';
import Favorites from '../src/components/Favorites/Favorites';
import SingnIndex from '../src/components/User/SingnIndex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCode,
  faHighlighter,
  faThumbsUp,
  faThumbsDown,
  faHouse,
  faRightToBracket,
  faRightFromBracket,
  faUser,
  faArrowsToCircle,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faCode,
  faHighlighter,
  faThumbsUp,
  faThumbsDown,
  faHouse,
  faRightToBracket,
  faRightFromBracket,
  faUser,
  faArrowsToCircle,
  faHeart
);

export default function Home(props) {
  //
  const [threadModal, setThreadModal] = useState(props.Thread);
  const [postHandlerModal, setPostHandlerModal] = useState(props.signup);
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
      setPostHandlerModal(false);
      setfavoritesModal(false);
      setAccountModal(false);
      console.log('ID ===> ', e.target.id);
    } else if (e.target.id === 'postId') {
      setThreadModal(false);
      setPostHandlerModal(true);
      setfavoritesModal(false);
      setAccountModal(false);
      console.log('ID ===> ', e.target.id);
    } else if (e.target.id === '[favoriteseId') {
      setThreadModal(false);
      setPostHandlerModal(false);
      setfavoritesModal(true);
      setAccountModal(false);
      console.log('ID ===> ', e.target.id);
    } else if (e.target.id === 'accountId') {
      setThreadModal(false);
      setPostHandlerModal(false);
      setfavoritesModal(false);
      setAccountModal(true);
      console.log('ID ===> ', e.target.id);
    }
  };

  return (
    <div className={styles.box}>
      <Logo></Logo>
      <div className={styles.appMenu}>
        {/* ' '  */}
        <div
          className={threadModal ? styles.tab : styles.tabOff}
          onClick={handleModals}
          id="AccueilId"
        >
          {<FontAwesomeIcon icon={faHouse} />}
          {'Accueil'}
        </div>

        <div
          className={postHandlerModal ? styles.tab : styles.tabOff}
          onClick={handleModals}
          id="postId"
        >
          {<FontAwesomeIcon icon={faArrowsToCircle} />}
          {'Publier'}
        </div>

        <div
          className={favoritesModal ? styles.tab : styles.tabOff}
          onClick={handleModals}
          id="favoriteseId"
        >
          {<FontAwesomeIcon icon={faHeart} />}
          {'Favoris'}
        </div>
        <div
          className={accountModal ? styles.tab : styles.tabOff}
          onClick={handleModals}
          id="accountId"
        >
          {<FontAwesomeIcon icon={faUser} />}
          {'Compte'}
        </div>
      </div>
      <div className={styles.appBody}>
        {threadModal && <Thread />}
        {postHandlerModal && <PostHandler />}
        {favoritesModal && <Favorites />}
        {accountModal && <SingnIndex />}
      </div>
    </div>
  );
}
