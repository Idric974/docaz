/* eslint-disable @next/next/no-img-element */
import styles from '../../../styles/Card.module.css';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { dateParser, isEmpty } from '../../utils/Utils';
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
  faSpinner,
  faPhone,
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
  faSpinner,
  faPhone,
  faHeart
);

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(false);

  // console.log('Liste des posts : ', post);

  //! Le profil de l'auteur du post.

  const usersData = useSelector((state) => state.userCRUDReducer);
  // console.log("⭐ CompCard ===>  Le profil de l'auteur du post :", usersData);

  //! --------------------------------------------------

  //! Stopper le isLoading.

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

  //! --------------------------------------------------

  return (
    <div className={styles.box}>
      <li className={styles.cards} key={post._id}>
        {isLoading ? (
          <FontAwesomeIcon icon={faSpinner} />
        ) : (
          <>
            {/********** User image Box **********/}
            <div className={styles.userInfo}>
              <div className={styles.userImageBox}>
                <img
                  className={styles.userImage}
                  src={post.userImage}
                  alt={post.userPseudo}
                />
              </div>

              {/** Pseudo de l'utilisateur **/}
              <div className={styles.pseudoDateBox}>
                {/** Pseudo de l'utilisateur **/}
                <div className={styles.userpseudo}>{post.userPseudo}</div>

                {/** Ville ou est disponible l'article **/}
                <div className={styles.lieuxBox}>
                  {'Disponible à : '}
                  {post.town}
                </div>

                {/** Date de création du post **/}
                <div className={styles.postDate}>
                  {dateParser(post.postDate)}
                </div>
              </div>

              <div className={styles.phoneBox}>
                <div className={styles.phoneIncone}>
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <div className={styles.phoneCta}>{'Appeller'}</div>
              </div>
            </div>

            {/********** FIN User image Box **********/}

            {/********** Corps du post **********/}

            <div className={styles.postBody}>
              {''}
              {/** Nom de l'article **/}
              <div className={styles.postName}>{post.name}</div>

              {/** Marque de l'article **/}
              <div className={styles.postBrand}>
                {'Marque : '}
                {post.brand}
              </div>

              {/** Modèle de l'article **/}
              <div className={styles.postModel}>
                {'Modèle : '}
                {post.model}
              </div>

              {/** Description de l'article **/}
              <div className={styles.postDescription}>
                {'Description : '}
                {post.description}
              </div>

              {/** Image de l'article **/}
              {/* <div className={styles.postPictureBox}>
                {post.picture && (
                  <img
                    className={styles.postPicture}
                    src={post.picture}
                    alt="card-pic"
                  />
                )}
              </div> */}

              <div className={styles.postPictureBox}>
                <img
                  className={styles.postPicture}
                  src={post.imageUrl}
                  alt="card-pic"
                />
              </div>
            </div>

            {/********** FIN Corps du post **********/}

            {/********** Like barre  **********/}

            <div className={styles.likeBarBox}>
              <div className={styles.likeIconeBox}>
                <div className={styles.likeIcone}>
                  <FontAwesomeIcon icon={faThumbsUp} />
                </div>
                <div className={styles.nbLike}>{7}</div>
              </div>

              <div className={styles.like}>
                <FontAwesomeIcon icon={faThumbsUp} />
              </div>
              <div className={styles.favoris}>
                <FontAwesomeIcon icon={faHeart} />
              </div>
            </div>

            {/********** Like barre  **********/}
          </>
        )}
      </li>
    </div>
  );
};

export default Card;
