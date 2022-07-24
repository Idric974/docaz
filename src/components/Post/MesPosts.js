/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import styles from '../../../styles/MesPosts.module.css';
import { getAuth } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import UpdatePost from '../../components/Post/UpdatePost';
import readUsersPost from '../../../src/actions/postCRUD.action';
import { isEmpty } from '../../../src/utils/Utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';

library.add(faArrowLeftLong);

const MesPosts = () => {
  //

  //! Les constantes.

  let uid;

  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    console.log('MesPosts ==> currentUser : ', user.uid);
    uid = user.uid;
  }

  //! -------------------------------------------------

  //? I) Récupération des données de l'utilisateur connecté.

  const userData = useSelector((state) => state.userCRUDReducer);
  // useEffect(() => {
  //   console.log('MesPosts ==> userData', userData);
  // }, [userData]);

  //? --------------------------------------------------

  //? Récupération de l'image de l'utilisateur connecté.

  const [imageProfil, setImageProfil] = useState();

  useEffect(() => {
    setImageProfil(userData.photoURL);
  }, [userData.photoURL]);

  //? --------------------------------------------------

  //? Chargement des posts.

  const posts = useSelector((state) => state.userEventsReducer);

  useEffect(() => {
    console.log('MesPosts ==> Liste des posts ===> ', posts);
  }, [posts]);

  //? --------------------------------------------------

  return (
    <div className={styles.box}>
      {/* '' */}
      {/* Header */}
      <div className={styles.boxHeadContent}>
        <p className={styles.headContentIcone}>
          <FontAwesomeIcon icon={faArrowLeftLong} />
        </p>

        <div className={styles.boxHeadContentText}>Mes posts</div>
        <div className={styles.boxHeadImage}>
          <img
            className={styles.usersInfoImage}
            src={imageProfil}
            alt="user-pic"
          />
        </div>
      </div>

      {/* '' */}
      {/* Les posts */}
      <div className={styles.boxBody}>
        {' '}
        <ul className={styles.postBoxDiv}>
          {!isEmpty(posts[0]) &&
            posts.map((post) => {
              return <UpdatePost post={post} key={post.postDate} />;
            })}
        </ul>
      </div>
    </div>
  );
};

export default MesPosts;
