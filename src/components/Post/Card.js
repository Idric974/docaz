/* eslint-disable @next/next/no-img-element */
import styles from '../../../styles/Card.module.css';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { dateParser, isEmpty } from '../../utils/Utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faThumbsUp,
  faSpinner,
  faPhone,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faThumbsUp,

  faSpinner,
  faPhone,
  faHeart
);

const Card = ({ post }) => {
  console.log(' Post Data : ', post);

  const [isLoading, setIsLoading] = useState(false);

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
                  src={post.photoURL}
                  alt={post.userPseudo}
                />
              </div>

              {/** Pseudo de l'utilisateur **/}
              <div className={styles.pseudoDateBox}>
                {/** Pseudo de l'utilisateur **/}
                <div className={styles.userpseudo}>{post.userName}</div>

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
              <div className={styles.postItems}>
                <div className={styles.postItemsTitle}>{'Nom'}</div>
                <div className={styles.postItemsData}>{post.articleName}</div>
              </div>

              {/** Marque de l'article **/}
              <div className={styles.postItems}>
                <div className={styles.postItemsTitle}> {'Marque'}</div>
                <div className={styles.postItemsData}> {post.brand}</div>
              </div>

              {/** Modèle de l'article **/}

              <div className={styles.postItems}>
                <div className={styles.postItemsTitle}> {'Modèle'}</div>
                <div className={styles.postItemsData}> {post.model}</div>
              </div>

              {/** Prix de l'article **/}

              <div className={styles.postItems}>
                <div className={styles.postItemsTitle}> {'Prix'}</div>
                <div className={styles.postItemsData}> {post.prix}</div>
              </div>

              {/** Description de l'article **/}
              <div className={styles.postItems}>
                <div className={styles.postItemsTitle}> {'Description'}</div>
                <div className={styles.postItemsData}>{post.description}</div>
              </div>

              <div className={styles.postItems}>
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
